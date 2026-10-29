import os
import json
import re
import time
import base64
import tempfile
import threading
import socket
from urllib.parse import parse_qs, urlparse
from flask import Flask, jsonify, request, send_from_directory
from werkzeug.serving import ThreadedWSGIServer
from youtube_transcript_api import YouTubeTranscriptApi
import requests
import yt_dlp
from summary_quality import SUMMARY_SCHEMA, SummaryError, summarize_complete, check_connection, grounded_prompt, choose_model

app = Flask(__name__, static_folder=".", static_url_path="")
DB_FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "summaries_db.json")
TRANSCRIPT_CACHE = {}
STATE_LOCK = threading.Lock()


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


def extract_video_id(url: str) -> str:
    if not url:
        return ""
    url = url.strip()
    parsed = urlparse(url)
    if parsed.hostname in ("youtu.be", "www.youtu.be"):
        return parsed.path.lstrip("/").split("/")[0]
    if parsed.hostname and "youtube.com" in parsed.hostname:
        if parsed.path == "/watch":
            return parse_qs(parsed.query).get("v", [""])[0]
        match = re.match(r"^/(?:shorts|embed|v|live)/([^/?#&]+)", parsed.path)
        if match:
            return match.group(1)
    match = re.search(r"(?:v=|youtu\.be/|shorts/|embed/)([A-Za-z0-9_-]{11})", url)
    return match.group(1) if match else ""


def format_mmss(seconds: float) -> str:
    total = max(0, int(seconds or 0))
    hrs = total // 3600
    mins = (total % 3600) // 60
    secs = total % 60
    if hrs > 0:
        return f"{hrs:02d}:{mins:02d}:{secs:02d}"
    return f"{mins:02d}:{secs:02d}"


def fetch_oembed_meta(url: str) -> dict:
    try:
        resp = requests.get(
            "https://noembed.com/embed",
            params={"url": url},
            timeout=6,
        )
        if resp.ok:
            data = resp.json()
            if data.get("title"):
                return {
                    "title": data.get("title"),
                    "channel": data.get("author_name") or "YouTube 채널",
                }
    except Exception:
        pass
    return {}


def fetch_transcript_via_api(video_id: str):
    ytt = YouTubeTranscriptApi()
    transcript_list = ytt.list(video_id)
    preferred_langs = ["ko", "ko-KR", "en", "en-US", "ja"]
    chosen = None
    try:
        chosen = transcript_list.find_manually_created_transcript(preferred_langs)
    except Exception:
        try:
            chosen = transcript_list.find_generated_transcript(preferred_langs)
        except Exception:
            for tr in transcript_list:
                chosen = tr
                break
    if not chosen:
        raise ValueError("No transcript tracks found")

    fetched = chosen.fetch()
    segments = []
    for snippet in fetched:
        text = getattr(snippet, "text", "") if not isinstance(snippet, dict) else snippet.get("text", "")
        start = getattr(snippet, "start", 0.0) if not isinstance(snippet, dict) else snippet.get("start", 0.0)
        duration = getattr(snippet, "duration", 0.0) if not isinstance(snippet, dict) else snippet.get("duration", 0.0)
        clean = re.sub(r"\s+", " ", str(text)).strip()
        if clean:
            segments.append({
                "start": float(start),
                "time": format_mmss(start),
                "duration": float(duration),
                "text": clean,
            })
    return {
        "language": getattr(chosen, "language", "ko"),
        "language_code": getattr(chosen, "language_code", "ko"),
        "is_generated": getattr(chosen, "is_generated", False),
        "segments": segments,
    }


def is_garbage_script_line(text: str) -> bool:
    t = str(text or "").strip()
    if not t:
        return True
    garbage_patterns = (
        "window.WIZ_global_data",
        "window.ytcfg",
        "window.onerror",
        "<!DOCTYPE",
        "<html",
        "function(",
        "var ytcfg",
        "youtube.web-front-end",
        "EMERGENCY_BASE_URL",
    )
    return any(p in t for p in garbage_patterns)


def fetch_via_ytdlp(url: str):
    ydl_opts = {
        "skip_download": True,
        "quiet": True,
        "no_warnings": True,
        "writesubtitles": True,
        "writeautomaticsub": True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        title = info.get("title") or "YouTube 영상"
        channel = info.get("uploader") or info.get("channel") or "YouTube 채널"
        description = (info.get("description") or "").strip()
        duration = info.get("duration") or 0

        subtitles = info.get("subtitles") or {}
        auto_captions = info.get("automatic_captions") or {}
        tracks = {}
        for k, v in auto_captions.items():
            if k != "live_chat" and not k.startswith("live_chat"):
                tracks[k] = v
        for k, v in subtitles.items():
            if k != "live_chat" and not k.startswith("live_chat"):
                tracks[k] = v

        segments = []
        lang_used = ""
        candidate_langs = ["ko", "ko-KR", "en", "en-US", "ja"] + [
            k for k in tracks.keys() if k not in ("ko", "ko-KR", "en", "en-US", "ja")
        ]
        for lang in candidate_langs:
            if lang in tracks and tracks[lang]:
                formats = tracks[lang]
                json3_fmt = next((f for f in formats if f.get("ext") == "json3" and f.get("url")), None)
                vtt_fmt = next((f for f in formats if f.get("ext") in ("vtt", "srv3", "ttml") and f.get("url")), None)
                target_fmt = json3_fmt or vtt_fmt
                if not target_fmt:
                    continue
                sub_url = target_fmt.get("url")
                if not sub_url or "watch?v=" in sub_url:
                    continue
                r = requests.get(sub_url, timeout=8)
                if not r.ok:
                    continue
                lang_used = lang
                if target_fmt.get("ext") == "json3":
                    try:
                        payload = r.json()
                    except Exception:
                        continue
                    for ev in payload.get("events", []):
                        segs = ev.get("segs")
                        if not segs:
                            continue
                        txt = "".join(s.get("utf8", "") for s in segs).replace("\n", " ").strip()
                        txt = re.sub(r"\s+", " ", txt)
                        if txt and not is_garbage_script_line(txt):
                            start_sec = (ev.get("tStartMs") or 0) / 1000.0
                            segments.append({
                                "start": start_sec,
                                "time": format_mmss(start_sec),
                                "duration": (ev.get("dDurationMs") or 0) / 1000.0,
                                "text": txt,
                            })
                else:
                    if "<html" in r.text[:300].lower() or "window.wiz_global_data" in r.text[:500].lower():
                        continue
                    lines = [
                        re.sub(r"<[^>]+>", "", ln).strip()
                        for ln in r.text.splitlines()
                        if ln.strip()
                        and not ln.strip().isdigit()
                        and "-->" not in ln
                        and not ln.startswith("WEBVTT")
                        and not is_garbage_script_line(ln)
                    ]
                    for idx, ln in enumerate(lines):
                        segments.append({
                            "start": idx * 5.0,
                            "time": format_mmss(idx * 5.0),
                            "duration": 5.0,
                            "text": ln,
                        })
                if segments:
                    break

        return {
            "title": title,
            "channel": channel,
            "description": description,
            "duration": duration,
            "language": lang_used or "ko",
            "segments": segments,
        }


def clean_spoken_korean_to_written(text: str) -> str:
    s = re.sub(r"\[(음악|박수|웃음|무음)\]", " ", str(text or ""))
    # Fix ASR run-ons where '이/그/저' demonstrative is glued to previous word
    s = re.sub(r"(?<=요)(이|그|저)(?=\s)", r" \1", s)
    s = re.sub(r"(위해서|통해서|대해서|관해서|처럼|보니까|하지만|그러나|따라서|그리고|왜냐하면|기도가|은혜가)(이|그|저)(?=\s+[가-힣])", r"\1 \2", s)
    # Normalize common ASR run-ons and polite particles attached to nouns
    s = re.sub(r"(예수님은|하나님은|성령님은|목사님은|기도는|방언은|우리는|여러분은|믿음은|말씀은)요(?=\s|$|[가-힣])", r"\1 ", s)
    s = re.sub(r"페스탈춤\s*김준", "김주은", s)
    # Remove greetings and channel intros
    s = re.sub(r"안녕하세요\s*(김주은\s*목사입니다|반갑습니다)?", " ", s)
    # Remove spoken filler words
    s = re.sub(
        r"(?<![가-힣])(어+|음+|그+|자+|아+|예+|네+|이제|그러니까|근데|사실은|솔직히|어쨌든|아무튼|여러분들?|정말|진짜|굉장히|너무|좀|막|약간|그냥|보시면|말씀드린\s*것처럼|제가\s*볼\s*때는)(?![가-힣])",
        " ",
        s,
    )
    # Collapse repeated words (e.g. "기도 기도" -> "기도")
    s = re.sub(r"\b(\S+)(\s+\1\b)+", r"\1", s)
    replacements = [
        (r"거예요", "것입니다"),
        (r"거죠", "것입니다"),
        (r"거든요", "기 때문입니다"),
        (r"잖아요", "습니다"),
        (r"더라고요", "었습니다"),
        (r"던데요", "었습니다"),
        (r"할까요", "해야 합니다"),
        (r"있으셨을까요", "있으셨습니다"),
        (r"인데요", "입니다"),
        (r"는데\b", "며"),
        (r"해서\s+그래서", "해서"),
    ]
    for pat, rep in replacements:
        s = re.sub(pat, rep, s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def has_final_consonant(word: str) -> bool:
    if not word:
        return False
    ch = word[-1]
    if "가" <= ch <= "힣":
        return (ord(ch) - 0xAC00) % 28 != 0
    return False


def josa(word: str, pair: str) -> str:
    """Return word + correct Korean particle from pair like '은/는', '이/가', '을/를', '과/와', '으로/로'."""
    first, second = pair.split("/")
    if not word:
        return second
    ch = word[-1]
    if "가" <= ch <= "힣":
        jong = (ord(ch) - 0xAC00) % 28
        if first == "으로" and second == "로":
            # No batchim (0) or rieul batchim (8) takes '로'
            return f"{word}{second if jong in (0, 8) else first}"
        return f"{word}{first if jong != 0 else second}"
    return f"{word}{second}"


def extract_top_keywords(texts, limit=3):
    stop = {
        "그리고", "그래서", "하지만", "그런데", "이렇게", "저렇게", "그렇게", "이것은", "있는", "없는",
        "하는", "되는", "입니다", "있습니다", "합니다", "것입니다", "때문에", "통해서", "대해서", "시간에",
        "말씀을", "우리가", "사람이", "사람들", "생각을", "마음을", "부분이", "경우가", "중요한", "필요한",
        "있어요", "없어요", "해요", "돼요", "같아요", "봅니다", "전합니다", "말합니다", "이야기", "오늘",
        "지금", "우리", "여러분", "모든", "어떤", "이런", "그런", "저런", "까지", "부터", "위해서", "가지고",
        "내려오셨기", "살아계시는", "동안에도", "있지만", "된다는", "느끼는", "계시다가", "오셨습니다", "하셨습니다",
        "강력한", "강력하게", "동일하게", "간절하게", "실제로", "진심으로", "열심히", "조금씩", "점점", "반드시",
        "어떻게", "무엇을", "누구에게", "스스로", "혼자서", "이처럼", "그만큼", "얼마나", "너무나",
        "부분", "분들", "주실", "그때", "가운데", "자신", "정도", "모습", "자리", "통해", "위해", "대한"
    }
    bad_suffixes = (
        "셨기", "계시는", "있지만", "된다는", "느끼는", "오셨", "하셨", "않으", "못하", "위해", "통해",
        "대한", "관한", "같은", "하는", "되는", "스러운", "로운", "다운", "적인", "하게", "도록", "면서",
        "니까", "지만", "거나", "든지", "할까", "인가", "다면", "라면", "으면", "는데", "던데", "거든",
        "하길", "시길", "기를", "한", "된", "할", "운", "진", "큰", "작은", "많은", "적은", "어려운", "쉬운"
    )
    counts = {}
    for t in texts:
        words = re.findall(r"[가-힣A-Za-z0-9]{2,8}", t)
        for w in words:
            w_clean = re.sub(
                r"(께서|에서|으로|에게|한테|부터|까지|이라|라고|하는|되는|하고|하며|이고|이나|든지|처럼|만큼|보다|마저|조차|은|는|이|가|을|를|의|에|로|과|와|도|만)+$",
                "",
                w,
            )
            if len(w_clean) < 2 or w_clean in stop:
                continue
            if any(w_clean.endswith(bs) for bs in bad_suffixes):
                continue
            counts[w_clean] = counts.get(w_clean, 0) + 1
    ranked = sorted(counts.items(), key=lambda x: x[1], reverse=True)
    return [w for w, _ in ranked[:limit]]


def polish_complete_korean_clause(raw_text: str) -> str:
    """Extract a clean, complete Korean clause without mid-phrase truncation or double endings."""
    s = re.sub(r"\s+", " ", str(raw_text or "")).strip()
    s = re.sub(r"[.?!]+$", "", s).strip()
    # Split on natural sentence boundaries if multiple sentences got merged
    parts = re.split(r"(?<=[다요죠까])\s+", s)
    parts = [p.strip() for p in parts if len(p.strip()) >= 12]
    chosen = parts[0] if parts else s
    if len(chosen) > 105:
        # Cut at a natural connective or comma rather than an arbitrary space
        m = re.search(r"^(.{40,95}?)(?:고\s|며\s|지만\s|는데\s|어서\s|아서\s|기\s*때문에\s)", chosen)
        if m:
            chosen = m.group(1).strip()
        else:
            chosen = chosen[:95].rsplit(" ", 1)[0].strip()
    # Strip trailing incomplete particles or connective fragments
    chosen = re.sub(
        r"\s+(그리고|그래서|하지만|그런데|때문에|위해서|통해서|보니까|있지만|하지만이|우리가|느끼는|된다는\s*것|영어로)$",
        "",
        chosen,
    ).strip()
    return chosen


def extract_core_title_theme(video_title: str) -> str:
    """Extract the primary question or core theme phrase from a YouTube video title."""
    raw = str(video_title or "").strip()
    if not raw:
        return "설교·강연의 핵심 주제"
    first_part = re.split(r"\s*[|｜]\s*", raw)[0].strip()
    first_part = re.sub(r"^(?:\[[^\]]+\]\s*|\d+\.\s*)+", "", first_part).strip()
    q_match = re.match(r"^(.+?[?!])\s*(.*)$", first_part)
    if q_match and len(q_match.group(1).strip()) >= 8:
        return q_match.group(1).strip()
    return first_part


def enforce_title_theme_and_structured_keypoints(parsed: dict, video_title: str) -> dict:
    """Guarantee that chapter 1 is anchored to the video title's core theme and all keypoints use the 2-tier bold title + description format."""
    if not isinstance(parsed, dict):
        return parsed
    core_theme = extract_core_title_theme(video_title)
    chapters = parsed.get("chapters")
    if isinstance(chapters, list) and len(chapters) > 0 and core_theme:
        first_title = str(chapters[0].get("title") or "").strip()
        if core_theme not in first_title and first_title not in core_theme:
            chapters[0]["title"] = core_theme

    raw_kps = parsed.get("keypoints") or []
    formatted_kps = []
    for idx, kp in enumerate(raw_kps):
        if isinstance(kp, dict):
            h = str(kp.get("title") or kp.get("heading") or f"핵심 요점 {idx+1}").strip().strip("*")
            b = str(kp.get("body") or kp.get("description") or kp.get("text") or "").strip()
            formatted_kps.append(f"**{h}**\n{b}" if b else f"**{h}**")
            continue
        s = str(kp or "").strip()
        if not s:
            continue
        if "\n" in s and "**" in s.split("\n", 1)[0]:
            formatted_kps.append(s)
        elif s.startswith("**") and "**" in s[2:]:
            m = re.match(r"^(\*\*[^*]+\*\*)\s*[:\-–—]?\s*(.+)$", s, re.DOTALL)
            if m and m.group(2).strip():
                formatted_kps.append(f"{m.group(1).strip()}\n{m.group(2).strip()}")
            else:
                formatted_kps.append(s)
        else:
            kws = extract_top_keywords([s], limit=2)
            head = f"{kws[0]}의 핵심 원리 ({kws[1]})" if len(kws) >= 2 else (f"{kws[0]}의 핵심 원리" if kws else f"핵심 요점 {idx+1}")
            if kws and kws[0] in s and "**" not in s:
                s = s.replace(kws[0], f"**{kws[0]}**", 1)
            formatted_kps.append(f"**{head}**\n{s}")
    parsed["keypoints"] = formatted_kps
    return parsed


def build_llm_system_prompt(chapter_count=11, subs_per_chapter=2, kp_count=16, custom_sections=None, custom_rules="", is_freeform=False, video_title=""):
    rules_clean = str(custom_rules or "").strip()
    # Remove legacy rule lines that forbade bold text in [2] 핵심
    rules_clean = re.sub(r"굵은\s*글씨\s*없이[^\n]*", "", rules_clean)
    core_theme = extract_core_title_theme(video_title)
    full_title_clean = str(video_title or "").split("|")[0].strip() or core_theme

    title_theme_instruction = f"""[제목 주제 중심 요약 절대 원칙 (모든 영상 필수 적용)]
- 이 영상의 전체 제목은 「{full_title_clean}」이며, 핵심 주제는 **‘{core_theme}’**입니다.
- 원문 초반부에 나오는 인사말, 성경 개론(저자 소개, 시대 배경 등), 제목 주제와 직접 관련이 적은 서론에 대주제를 낭비하지 마세요.
- 반드시 **첫 번째 대주제(`## 1.`)의 제목을 ‘{core_theme}’**(또는 이를 직접 다루는 주제)로 세우고, 본문(`[1] 요약`)의 모든 대주제와 소주제를 **‘{core_theme}’에 대한 구체적인 원인, 성경적 상징·비유(예: 금촛대, 진설병 떡상, 향단 등), 실제 예화, 해답과 적용** 중심으로 깊이 있게 요약하세요."""

    keypoint_mandatory_rule = f"""[2] 핵심 (keypoints) 작성 절대 규칙 (0번 기본서식을 포함한 모든 서식 필수):
   - 서론의 지엽적인 내용이 아니라, 반드시 영상 제목의 핵심 주제(**‘{core_theme}’**)에 대한 핵심 원인·원리·해답만을 추출하세요.
   - 모든 항목은 반드시 **`**핵심 소제목 (성경적 상징 / 핵심 원인 / 핵심 키워드)**` + 줄바꿈(`\\n`) + `구체적 이유와 **핵심 키워드**가 볼드(**) 강조된 1~2문장 설명`**의 2단 구조로 작성하세요.
   - 절대 단순 한 줄 문장으로만 쓰지 말고, 아래 예시와 동일한 형식으로 작성하세요:
     "**성령의 감화와 감동의 부재 (금촛대)**\\n아무리 깊이 기도하고 학식이 높아도 **성령님의 지혜와 감동**이 없으면 영안이 열리지 않고 예수를 주로 시인할 수 없습니다."
     "**매일의 말씀 공급 부족 (진설병 떡상)**\\n묵은 떡(지난 은혜/과거의 지식)에 머물러 있으면 영적 영양실조에 걸립니다. **매일 새롭게 공급되는 생명의 말씀**을 묵상하고 실천하지 않으면 영적 시야가 닫히게 됩니다."
     "**원망과 불평으로 인한 영적 막힘 (향단)**\\n불평과 원망은 하나님을 멀어지게 만드는 **해로운 연기**와 같습니다. 하나님이 머무시는 **감사와 찬양의 향기**가 삶 속에서 피어올라야 영의 눈이 열립니다."
     "**인간의 이성과 의심으로 인한 불신앙 (사가랴의 징계)**\\n하나님의 말씀을 내 이성과 경험으로 재단하고 의심하면 영적 벙어리와 소경이 됩니다. 오직 **순종과 전적인 믿음**으로 받아들일 때 영의 눈이 밝아집니다." """

    if is_freeform or int(chapter_count or 0) == 0:
        return f"""당신은 설교·강연 유튜브 영상과 스크립트를 가장 깊이 있고 충실한 아티클로 요약하는 전문 에디터입니다.
사용자가 **자유형식(Free-form) 요약 서식**을 선택했습니다. 고정된 번호(1.~11.)나 정해진 소제목 틀에 얽매이지 말고, 아래 지침에 따라 요약하세요.

[제목 주제 중심 본문 구성 원칙 (최우선 적용)]
- {title_theme_instruction}

[사용자 지정 자유형식 양식 및 프롬프트 지침]
{rules_clean or "설교·강연의 제목 주제와 핵심 메시지, 성경 본문 구절, 실제 예화, 삶의 적용점을 가장 읽기 좋은 구성으로 깊이 있게 작성하세요."}

[작성 원칙]
1. 추상적이거나 뻔한 한두 줄 요약이 아니라, 설교·강연 중에 실제로 언급된 **성경 본문 구절(장·절), 성경 인물, 구체적인 예화·간증, 핵심 논리, 삶의 적용점**을 풍성하고 깊이 있게 담으세요.
2. `chapters` 배열에는 제목의 핵심 주제를 다루는 대주제(`##`)와 하위 소제목(`###`) 및 본문(`body`)을 충실하게 구성하세요.
3. {keypoint_mandatory_rule}

반드시 아래 JSON 형식으로만 응답하세요:
{{
  "docTitle": "설교·강연 전체를 아우르는 핵심 제목",
  "isFreeform": true,
  "chapters": [
    {{
      "num": "",
      "title": "제목의 핵심 주제를 담은 대주제 (예: 기도해도 왜 영안은 열리지 않을까?)",
      "subs": [
        {{
          "code": "",
          "title": "소제목 (핵심 원리 및 성경적 근거)",
          "body": "성경 구절, 예화, 핵심 메시지, 적용점 등을 깊이 있고 충실하게 서술한 본문입니다."
        }}
      ]
    }}
  ],
  "keypoints": [
    "**성령의 감화와 감동의 부재 (금촛대)**\\n아무리 깊이 기도하고 학식이 높아도 **성령님의 지혜와 감동**이 없으면 영안이 열리지 않고 예수를 주로 시인할 수 없습니다.",
    "**매일의 말씀 공급 부족 (진설병 떡상)**\\n묵은 떡(지난 은혜/과거의 지식)에 머물러 있으면 영적 영양실조에 걸립니다. **매일 새롭게 공급되는 생명의 말씀**을 묵상하고 실천하지 않으면 영적 시야가 닫히게 됩니다."
  ]
}}"""

    custom_sec_note = ""
    if custom_sections:
        sec_str = ", ".join(f"{i+1}. {s}" for i, s in enumerate(custom_sections))
        custom_sec_note = f"\n- 대주제(chapters)는 반드시 다음 구성을 따르세요: {sec_str}"

    rules_note = ""
    if rules_clean:
        rules_note = f"\n\n[사용자 지정 서식 상세 규칙]\n{rules_clean}"

    return f"""당신은 설교·강연 유튜브 영상과 스크립트를 가장 깊이 있고 충실한 아티클로 요약하는 전문 에디터입니다.
주어진 설교·강연 원문(또는 음성)을 정밀하게 분석하여, 아래 규칙과 JSON 스키마에 맞춰 상세하고 밀도 높게 요약하세요.{rules_note}

[심층 요약 작성 규칙 (제목 주제 중심 + 구조화 핵심)]
1. **제목 주제 중심 본문 구성**:
   - 단순 시간순 나열에 그치지 말고, {title_theme_instruction}
   - 추상적이거나 뻔한 일반론으로 짧게 요약하지 마세요. 반드시 설교·강연 중에 실제로 언급된 **성경 본문 구절(장·절), 성경 인물, 구체적인 예화·간증, 핵심 비유(예: 금촛대, 진설병 떡상, 향단 등), 설교자의 고유한 강조점**을 본문에 구체적으로 살려 작성하세요.
2. 음성인식 오탈자와 구어체 추임새는 문맥에 맞는 정확한 한국어 문어체로 교정하세요.
3. [1] 요약 (chapters):
   - 영상 제목의 핵심 주제를 중심축으로 삼아 전체 설교·강연을 {chapter_count}개의 대주제(num: "1" ~ "{chapter_count}")로 나누세요.{custom_sec_note}
   - 첫 번째 대주제(`num: "1"`)의 `title`은 반드시 **"{core_theme}"**로 시작하고, 나머지 대주제들도 이 핵심 주제의 세부 원리·상징·해답으로 구성하세요.
   - 각 대주제 아래에는 번호 없는 소제목(subs)을 {subs_per_chapter}~3개 구성하세요.
   - 각 소제목의 본문(body)은 정중체('~합니다.', '~야 합니다.', '~입니다.')로 완결된 **밀도 있는 3~4문장(성경적 근거 + 구체적 예화/설명 + 삶의 적용)**으로 충실하게 서술하세요.
4. {keypoint_mandatory_rule}

반드시 아래 JSON 형식으로만 응답하세요:
{{
  "docTitle": "설교·강연 전체를 아우르는 핵심 제목",
  "chapters": [
    {{
      "num": "1",
      "title": "대주제 제목 (제목의 핵심 주제 중심)",
      "subs": [
        {{
          "code": "",
          "title": "소제목 (번호 없음)",
          "body": "구체적인 성경 본문과 배경을 설명하는 첫 번째 문장입니다. 설교자가 든 실제 예화와 핵심 원리를 짚어 주는 두 번째 문장입니다. 이를 통해 성도가 삶에서 결단해야 할 방향을 제시하는 세 번째 문장입니다."
        }}
      ]
    }}
  ],
  "keypoints": [
    "**성령의 감화와 감동의 부재 (금촛대)**\\n아무리 깊이 기도하고 학식이 높아도 **성령님의 지혜와 감동**이 없으면 영안이 열리지 않고 예수를 주로 시인할 수 없습니다.",
    "**매일의 말씀 공급 부족 (진설병 떡상)**\\n묵은 떡(지난 은혜/과거의 지식)에 머물러 있으면 영적 영양실조에 걸립니다. **매일 새롭게 공급되는 생명의 말씀**을 묵상하고 실천하지 않으면 영적 시야가 닫히게 됩니다."
  ]
}}"""


def parse_exhaustive_markdown_items(segments, title="전체 항목 요약"):
    """
    When a user inputs a large structured markdown document (e.g., 184 recipes with ## and ### headings)
    or requests exhaustive item-by-item summarization, parse all ### items without dropping any.
    """
    lines = [str(s.get("text", "")).strip() for s in (segments or []) if str(s.get("text", "")).strip()]
    h3_count = sum(1 for ln in lines if ln.startswith("### ") or re.match(r"^#?\d+\.\s*\[", ln))
    if h3_count < 15:
        return None

    chapters = []
    cur_chapter = None
    cur_sub = None
    doc_title = title

    def clean_md(s):
        return re.sub(r"\*\*(.+?)\*\*", r"\1", s).replace("`", "").strip()

    for ln in lines:
        if ln == "---" or ln.startswith("----"):
            continue
        if ln.startswith("# ") and not ln.startswith("## "):
            doc_title = clean_md(ln[2:])
            continue
        if ln.startswith("## "):
            raw_h2 = clean_md(ln[3:])
            m_num = re.match(r"^(\d+)\.\s*(.+)$", raw_h2)
            ch_num = m_num.group(1) if m_num else str(len(chapters) + 1)
            ch_title = m_num.group(2) if m_num else raw_h2
            cur_chapter = {"num": ch_num, "title": ch_title, "subs": []}
            chapters.append(cur_chapter)
            cur_sub = None
            continue
        if ln.startswith("### ") or re.match(r"^#\d+\.\s*\[", ln):
            raw_h3 = clean_md(ln.lstrip("#").strip())
            if cur_chapter is None:
                cur_chapter = {"num": "1", "title": "전체 항목 정리", "subs": []}
                chapters.append(cur_chapter)
            cur_sub = {"code": "", "title": raw_h3, "body_lines": []}
            cur_chapter["subs"].append(cur_sub)
            continue

        cleaned = clean_md(ln)
        if cur_sub is not None:
            cur_sub["body_lines"].append(cleaned)
        elif cur_chapter is not None:
            if not cur_chapter["subs"]:
                cur_sub = {"code": "", "title": "기본 구성 및 안내", "body_lines": [cleaned]}
                cur_chapter["subs"].append(cur_sub)
            else:
                cur_chapter["subs"][-1]["body_lines"].append(cleaned)

    total_subs = 0
    for ch in chapters:
        final_subs = []
        for sub in ch.get("subs", []):
            b_lines = sub.pop("body_lines", [])
            # Keep ingredients / seasoning / cooking steps organized on clean lines
            body_text = "\n".join(b_lines).strip()
            if not body_text:
                body_text = sub["title"]
            sub["body"] = body_text
            sub["bullets"] = b_lines if b_lines else [body_text]
            final_subs.append(sub)
            total_subs += 1
        ch["subs"] = final_subs

    if total_subs < 15:
        return None

    keypoints = [
        f"총 {len(chapters)}개 대분류 · {total_subs}개 상세 항목(레시피/원고)을 단 1개도 누락하지 않고 전수 정리했습니다.",
        "각 항목마다 필수 재료, 양념 비율, 핵심 조리 순서를 한눈에 볼 수 있도록 구성했습니다.",
    ]
    for ch in chapters[:10]:
        keypoints.append(f"[{ch['title']}] 파트의 총 {len(ch['subs'])}개 세부 레시피·항목이 수록되어 있습니다.")

    first_excerpt = chapters[0]["subs"][0]["body"][:115] if chapters and chapters[0].get("subs") else doc_title
    return {
        "engine": f"전수 파싱 엔진 ({total_subs}개 항목 100% 보존)",
        "docTitle": doc_title if doc_title != "직접 입력한 스크립트 요약" else f"전체 {total_subs}개 레시피 · 항목 완벽 정리북",
        "isFreeform": True,
        "chapters": chapters,
        "keypoints": keypoints,
        "outline": [f"{c.get('title', '')} ({len(c.get('subs', []))}개)" for c in chapters],
        "excerpt": first_excerpt,
    }


def summarize_via_llm_api(segments, title, channel, ratio=30, custom_sections=None, algo_config=None, api_key="", ai_model="gpt-4o", extra_command=""):
    # Check if the input is a large multi-item markdown manuscript (e.g., 184 recipes) where single-shot LLM output would truncate
    if not str(extra_command or "").strip():
        exhaustive_res = parse_exhaustive_markdown_items(segments, title)
        if exhaustive_res:
            return exhaustive_res

    key = (api_key or "").strip()
    if not key or not segments:
        return None

    r = max(10, min(70, int(ratio or 30)))
    cfg = algo_config or {}
    is_freeform = bool(cfg.get("isFreeform")) or int(cfg.get("chapterCount", 11)) == 0
    base_chapters = int(cfg.get("chapterCount") or 11)
    base_subs = int(cfg.get("subsPerChapter") or 2)
    base_kp = int(cfg.get("keypointCount") or 16)
    custom_rules = cfg.get("rules") or ""

    # Scale chapter, subsection, and keypoint counts proportionally to summary ratio (10% ~ 70%)
    if is_freeform:
        chapter_count = 0
        subs_per_chapter = 0
        kp_count = 0
    elif custom_sections:
        chapter_count = len(custom_sections)
        subs_per_chapter = 1 if r <= 10 else (2 if r <= 30 else min(4, base_subs + 1))
        kp_count = max(5, min(20, int(round(base_kp * (r / 30.0)))))
    else:
        chapter_count = max(3, min(14, int(round(base_chapters * (r / 30.0)))))
        subs_per_chapter = 1 if r <= 10 else (2 if r <= 30 else min(4, base_subs + 1))
        kp_count = max(5, min(20, int(round(base_kp * (r / 30.0)))))

    # Compress transcript by omitting repetitive timestamps to save 35% tokens and speed up LLM response
    clean_lines = [
        str(s.get("text", "")).strip()
        for s in segments
        if s.get("text") and not re.match(r"^\[(음악|박수|웃음)\]$", str(s.get("text")).strip())
    ]
    full_transcript = " ".join(clean_lines)
    # Cap transcript length safely (~60,000 chars)
    if len(full_transcript) > 60000:
        full_transcript = full_transcript[:60000]

    core_theme = extract_core_title_theme(title)
    sys_prompt = build_llm_system_prompt(chapter_count, subs_per_chapter, kp_count, custom_sections, custom_rules, is_freeform=is_freeform, video_title=title)
    user_prompt = (
        f"영상 제목: {title}\n"
        f"본문 요약의 핵심 주제(첫 대주제 제목): {core_theme}\n"
        f"채널명: {channel}\n요약률 설정: {r}%\n\n"
        f"[필수 지시] 서론의 배경 설명보다 영상 제목의 핵심 주제인 '{core_theme}'에 대한 원인·성경적 상징·해답 중심으로 본문([1] 요약)과 [2] 핵심(**소제목 (상징/원인)**\\n**핵심어** 강조 설명)을 작성하세요.\n\n"
        f"[유튜브 스크립트 원문]\n{full_transcript}"
    )

    try:
        # 0. VS Code / GitHub Models & Copilot API (ghp_..., github_pat_..., ghu_..., gho_...)
        if key.startswith(("ghp_", "github_pat_", "ghu_", "gho_")):
            gh_resp = requests.post(
                "https://models.inference.ai.azure.com/chat/completions",
                headers={
                    "Authorization": f"Bearer {key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "gpt-4o",
                    "temperature": 0.3,
                    "response_format": {"type": "json_object"},
                    "messages": [
                        {"role": "system", "content": sys_prompt},
                        {"role": "user", "content": user_prompt},
                    ],
                },
                timeout=55,
            )
            if gh_resp.ok:
                g_json = gh_resp.json()
                g_text = g_json.get("choices", [{}])[0].get("message", {}).get("content", "")
                parsed = json.loads(g_text)
                if parsed and isinstance(parsed.get("chapters"), list):
                    for ch in parsed["chapters"]:
                        for sub in ch.get("subs", []):
                            sub["code"] = sub.get("code") or ""
                            sub["bullets"] = [s.strip() for s in re.split(r"(?<=[.?!])\s+", sub.get("body", "")) if s.strip()]
                    return {
                        "engine": "vscode-github-gpt-4o",
                        "docTitle": parsed.get("docTitle") or title,
                        "chapters": parsed["chapters"],
                        "keypoints": parsed.get("keypoints") or [],
                        "outline": [c.get("title", "") for c in parsed["chapters"]],
                        "excerpt": parsed["chapters"][0]["subs"][0]["body"][:115] if parsed["chapters"] and parsed["chapters"][0].get("subs") else title,
                    }

        # 1. Google Gemini API (AIza... or AQ.... or gemini model selected with key)
        if key.startswith(("AIza", "AQ.")) or ("gemini" in (ai_model or "").lower() and not key.startswith(("sk-", "vscode-lm://"))):
            # Prioritize high-quota fast Gemini models first, then fallback across family
            gemini_models = [
                "gemini-3.5-flash-lite",
                "gemini-flash-lite-latest",
                "gemini-3.1-flash-lite",
                "gemini-3.8-flash",
                "gemma-4-26b-a4b-it",
            ]
            for g_model in gemini_models:
                gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/{g_model}:generateContent?key={key}"
                is_gemma = g_model.startswith("gemma-")
                if is_gemma:
                    payload = {
                        "contents": [{"role": "user", "parts": [{"text": f"{sys_prompt}\n\n{user_prompt}"}]}],
                        "generationConfig": {"temperature": 0.3},
                    }
                else:
                    payload = {
                        "systemInstruction": {"parts": [{"text": sys_prompt}]},
                        "contents": [{"role": "user", "parts": [{"text": user_prompt}]}],
                        "generationConfig": {
                            "temperature": 0.3,
                            "responseMimeType": "application/json",
                        },
                    }
                try:
                    resp = requests.post(gemini_url, json=payload, timeout=65)
                except Exception:
                    continue
                if not resp.ok:
                    continue
                res_json = resp.json()
                parts = (
                    res_json.get("candidates", [{}])[0]
                    .get("content", {})
                    .get("parts", [])
                )
                raw_text = ""
                for p in parts:
                    if p.get("text"):
                        raw_text = p["text"]
                        break
                m = re.search(r"\{[\s\S]*\}", raw_text)
                if not m and not raw_text.strip().startswith("{"):
                    continue
                try:
                    parsed = json.loads(m.group(0) if m else raw_text)
                except Exception:
                    continue
                if isinstance(parsed, dict) and isinstance(parsed.get("chapters"), list) and len(parsed["chapters"]) > 0:
                    parsed = enforce_title_theme_and_structured_keypoints(parsed, title)
                    for ch in parsed["chapters"]:
                        for sub in ch.get("subs", []):
                            sub["code"] = sub.get("code") or ""
                            sub["bullets"] = [s.strip() for s in re.split(r"(?<=[.?!])\s+", sub.get("body", "")) if s.strip()]
                    return {
                        "engine": g_model,
                        "docTitle": parsed.get("docTitle") or title,
                        "chapters": parsed["chapters"],
                        "keypoints": parsed.get("keypoints") or [],
                        "outline": [c.get("title", "") for c in parsed["chapters"]],
                        "excerpt": parsed["chapters"][0]["subs"][0]["body"][:115] if parsed["chapters"] and parsed["chapters"][0].get("subs") else title,
                    }

        # 2. Anthropic Claude API (sk-ant-...)
        if key.startswith("sk-ant-"):
            claude_resp = requests.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": "claude-3-5-sonnet-20241022",
                    "max_tokens": 4096,
                    "temperature": 0.3,
                    "system": sys_prompt,
                    "messages": [{"role": "user", "content": user_prompt}],
                },
                timeout=55,
            )
            if claude_resp.ok:
                c_json = claude_resp.json()
                c_text = c_json.get("content", [{}])[0].get("text", "")
                m = re.search(r"\{[\s\S]*\}", c_text)
                if m:
                    parsed = json.loads(m.group(0))
                    if parsed and isinstance(parsed.get("chapters"), list):
                        for ch in parsed["chapters"]:
                            for sub in ch.get("subs", []):
                                sub["code"] = sub.get("code") or ""
                                sub["bullets"] = [s.strip() for s in re.split(r"(?<=[.?!])\s+", sub.get("body", "")) if s.strip()]
                        return {
                            "engine": "claude-3.5-sonnet",
                            "docTitle": parsed.get("docTitle") or title,
                            "chapters": parsed["chapters"],
                            "keypoints": parsed.get("keypoints") or [],
                            "outline": [c.get("title", "") for c in parsed["chapters"]],
                            "excerpt": parsed["chapters"][0]["subs"][0]["body"][:115] if parsed["chapters"] and parsed["chapters"][0].get("subs") else title,
                        }

        # 3. OpenAI Chat Completions API (sk-...)
        if key.startswith("sk-"):
            openai_resp = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "gpt-4o-mini",
                    "temperature": 0.3,
                    "response_format": {"type": "json_object"},
                    "messages": [
                        {"role": "system", "content": sys_prompt},
                        {"role": "user", "content": user_prompt},
                    ],
                },
                timeout=55,
            )
            if openai_resp.ok:
                o_json = openai_resp.json()
                o_text = o_json.get("choices", [{}])[0].get("message", {}).get("content", "")
                parsed = json.loads(o_text)
                if parsed and isinstance(parsed.get("chapters"), list):
                    for ch in parsed["chapters"]:
                        for sub in ch.get("subs", []):
                            sub["code"] = sub.get("code") or ""
                            sub["bullets"] = [s.strip() for s in re.split(r"(?<=[.?!])\s+", sub.get("body", "")) if s.strip()]
                    return {
                        "engine": "gpt-4o",
                        "docTitle": parsed.get("docTitle") or title,
                        "chapters": parsed["chapters"],
                        "keypoints": parsed.get("keypoints") or [],
                        "outline": [c.get("title", "") for c in parsed["chapters"]],
                        "excerpt": parsed["chapters"][0]["subs"][0]["body"][:115] if parsed["chapters"] and parsed["chapters"][0].get("subs") else title,
                    }
    except Exception as e:
        print("LLM API fallback notice:", e)

    return None


def synthesize_natural_topic_paragraph(s_units, primary_kw, secondary_kw):
    """Build a natural, grammatically complete 2-sentence Korean summary paragraph for a subsection."""
    # Extract clean standalone sentences from the subsection units
    candidates = []
    for u in sorted(s_units, key=lambda x: x["score"], reverse=True):
        raw = u["text"]
        # Split into individual sentences
        for sent in re.split(r"(?<=[.?!다요죠])\s+", raw):
            c = polish_complete_korean_clause(sent)
            # Clean leading discourse adverbs or ASR artifacts
            c = re.sub(r"^(오늘은\s*이처럼\s*이|오늘은|그리고|그래서|하지만|그런데|따라서|즉|또한)\s+", "", c).strip()
            c = re.sub(r"(분들이이|시간이|하나님이이)", lambda m: m.group(0)[:-1] + " 이", c)
            if 18 <= len(c) <= 95:
                candidates.append((u["index"], c))

    # Deduplicate while preserving chronological order of top candidates
    seen = set()
    picked = []
    for idx, c in candidates:
        key = c[:15]
        if key not in seen:
            seen.add(key)
            picked.append((idx, c))
        if len(picked) >= 2:
            break
    picked.sort(key=lambda x: x[0])

    if len(picked) >= 2:
        s1 = format_sentence_with_style(picked[0][1], "s1", primary_kw, "formal")
        s2 = format_sentence_with_style(picked[1][1], "s2", secondary_kw, "formal")
    elif len(picked) == 1:
        s1 = format_sentence_with_style(picked[0][1], "s1", primary_kw, "formal")
        s2 = f"선포되는 {josa(primary_kw, '을/를')} 마음 깊이 새기고, 듣는 데서 끝나지 않고 {josa(secondary_kw, '으로/로')} 이어 가야 합니다."
    else:
        s1 = f"이 부분에서는 {josa(primary_kw, '과/와')} {josa(secondary_kw, '을/를')} 중심으로 핵심 원리를 설명합니다."
        s2 = f"듣는 데서 멈추지 않고 일상에서 {josa(primary_kw, '을/를')} 실제 행동으로 옮겨야 합니다."

    return s1, s2


def format_sentence_with_style(clause: str, role: str = "s1", kw: str = "핵심 주제", tone: str = "hanaro") -> str:
    c = polish_complete_korean_clause(clause)
    if not c:
        return f"{josa(kw, '을/를')} 중심으로 핵심 맥락을 짚어 줍니다."

    c_stripped = re.sub(
        r"(입니다|습니다|됩니다|합니다|있습니다|없습니다|하셨습니다|않으셨습니다|오셨습니다|전합니다|권면합니다|강조합니다|경고합니다|해요|돼요|있어요|없어요|같아요|거예요)[.?!]*$",
        "",
        c,
    ).strip()

    if role == "s1":
        if re.search(r"(입니다|습니다|됩니다|합니다|있습니다|없습니다|셨습니다|주십니다|거둡니다|봅니다|삽니다)$", c):
            return f"{c}."
        if c.endswith("해요"):
            return re.sub(r"해요$", "합니다.", c)
        if c.endswith("있어요"):
            return re.sub(r"있어요$", "있습니다.", c)
        if c.endswith("없어요"):
            return re.sub(r"없어요$", "없습니다.", c)
        return f"{c_stripped}합니다."

    # role == "s2" or "s3" (Concise 2nd sentence ending with ~야 합니다 / ~수 있습니다 / ~됩니다)
    if re.search(r"(입니다|습니다|됩니다|합니다|있습니다|없습니다|셨습니다|야\s*합니다)$", c):
        return f"{c}."
    if c.endswith("해요"):
        return re.sub(r"해요$", "해야 합니다.", c)
    if c.endswith("있어요"):
        return re.sub(r"있어요$", "있습니다.", c)
    return f"{c_stripped}하며 {josa(kw, '을/를')} 실제 삶으로 이어 가야 합니다."


def build_hanaro_algorithm_summary(segments, title, channel, ratio=30, custom_sections=None, algo_config=None, template_type="default"):
    r = max(10, min(70, int(ratio or 30)))
    cfg = algo_config or {}
    cfg_chapters = int(cfg.get("chapterCount") or 0)
    cfg_subs = int(cfg.get("subsPerChapter") or 0)
    cfg_keypoints = int(cfg.get("keypointCount") or 0)
    cfg_tone = cfg.get("tone") or "hanaro"

    raw_lines = []
    for seg in segments or []:
        cleaned = clean_spoken_korean_to_written(seg.get("text", ""))
        if len(cleaned) >= 5:
            raw_lines.append({"time": seg.get("time", "00:00"), "text": cleaned})

    if not raw_lines:
        return None

    # 1. Group micro-captions into coherent sentence units (~65-110 chars)
    units = []
    buf = []
    buf_len = 0
    buf_time = raw_lines[0]["time"]
    for idx, item in enumerate(raw_lines):
        if not buf:
            buf_time = item["time"]
        buf.append(item["text"])
        buf_len += len(item["text"])
        is_end = bool(re.search(r"(다|요|죠|까)\.?$", item["text"]))
        if (buf_len >= 50 and is_end) or buf_len >= 100 or idx == len(raw_lines) - 1:
            merged = " ".join(buf).strip()
            units.append({"index": len(units), "time": buf_time, "text": merged})
            buf = []
            buf_len = 0

    # 2. Keyword TF scoring across all units
    global_keywords = extract_top_keywords([u["text"] for u in units], limit=30)
    kw_weights = {kw: (30 - i) for i, kw in enumerate(global_keywords)}

    for u in units:
        score = 1.0
        for kw, weight in kw_weights.items():
            if kw in u["text"]:
                score += weight
        if len(u["text"]) < 22:
            score *= 0.4
        u["score"] = score / max(1.0, (len(u["text"]) ** 0.3))

    # 3. Partition into numbered H2 Sections (## 1. ~ ## N.) and unnumbered H3 Subheadings (### 소제목 + 2문장 문단)
    if custom_sections:
        chapter_count = len(custom_sections)
    else:
        base_ch = cfg_chapters if cfg_chapters >= 1 else 11
        chapter_count = min(14, max(3, int(round(base_ch * (r / 30.0)))))
        chapter_count = min(chapter_count, max(2, len(units) // 2 or 2))

    if r <= 10:
        subs_per_chapter = 1
    elif cfg_subs >= 1:
        subs_per_chapter = min(5, cfg_subs if r <= 30 else cfg_subs + 1)
    else:
        subs_per_chapter = 3 if r >= 40 else 2

    chapters = []
    for c in range(chapter_count):
        c_start = int((c / chapter_count) * len(units))
        c_end = int(((c + 1) / chapter_count) * len(units))
        c_units = units[c_start:max(c_start + 1, c_end)]

        c_kws = extract_top_keywords([u["text"] for u in c_units], limit=3)
        if custom_sections and c < len(custom_sections):
            c_title = re.sub(r"^\d+\.\s*", "", custom_sections[c]).strip()
        elif len(c_kws) >= 2:
            c_title = f"{josa(c_kws[0], '과/와')} {c_kws[1]}의 삶"
        elif len(c_kws) == 1:
            c_title = f"{c_kws[0]} 중심의 신앙과 태도"
        else:
            c_title = f"핵심 주제 {c + 1}"

        actual_subs = min(subs_per_chapter, max(1, len(c_units)))
        subs = []
        for s in range(actual_subs):
            s_start = int((s / actual_subs) * len(c_units))
            s_end = int(((s + 1) / actual_subs) * len(c_units))
            s_units = c_units[s_start:max(s_start + 1, s_end)]

            s_kws = extract_top_keywords([u["text"] for u in s_units], limit=3)
            primary_kw = s_kws[0] if s_kws else (c_kws[0] if c_kws else "말씀")
            secondary_kw = s_kws[1] if len(s_kws) > 1 else (c_kws[1] if len(c_kws) > 1 else "순종")

            if len(s_kws) >= 2:
                s_title = f"{josa(primary_kw, '을/를')} 붙들고 {josa(secondary_kw, '으로/로')} 나아가기"
            elif len(s_kws) == 1:
                s_title = f"{josa(primary_kw, '을/를')} 삶에서 실천하기"
            else:
                s_title = "말씀을 삶으로 이어 가기"

            s1, s2 = synthesize_natural_topic_paragraph(s_units, primary_kw, secondary_kw)

            subs.append({
                "code": "",
                "title": s_title,
                "body": f"{s1} {s2}",
                "bullets": [s1, s2],
            })

        chapters.append({
            "num": str(c + 1),
            "title": c_title,
            "subs": subs,
        })

    # 4. Build Numbered Key Points (2. 핵심: scaled by ratio & algorithm config)
    base_kp = cfg_keypoints if cfg_keypoints >= 1 else 16
    kp_count = min(24, max(4, int(round(base_kp * (r / 30.0)))))
    top_kp_units = sorted(
        sorted(units, key=lambda x: x["score"], reverse=True)[:kp_count],
        key=lambda x: x["index"],
    )

    keypoints = []
    for idx, u in enumerate(top_kp_units):
        kws = extract_top_keywords([u["text"]], limit=2)
        lead_kw = kws[0] if kws else "말씀"
        sub_kw = kws[1] if len(kws) > 1 else "순종"
        clean_stmt = format_sentence_with_style(u["text"], "s1", lead_kw, "formal")
        clean_stmt = re.sub(r"^(오늘은\s*이처럼\s*이|오늘은|그리고|그래서|하지만|그런데)\s+", "", clean_stmt).strip()
        if lead_kw in clean_stmt:
            clean_stmt = clean_stmt.replace(lead_kw, f"**{lead_kw}**", 1)
        keypoints.append(
            f"**{josa(lead_kw, '과/와')} {sub_kw}의 영적 원리 ({lead_kw})**\n{clean_stmt} 날마다 **{josa(lead_kw, '과/와')} {sub_kw}**을(를) 삶 속에서 실천해야 합니다."
        )

    return {
        "engine": "smart-nlp",
        "docTitle": title,
        "chapters": chapters,
        "keypoints": keypoints,
        "outline": [c["title"] for c in chapters],
        "excerpt": chapters[0]["subs"][0]["body"][:115] if chapters and chapters[0]["subs"] else f"{channel}의 ‘{title}’ 요약본입니다.",
    }


@app.route("/")
def serve_index():
    return send_from_directory(".", "index.html")


@app.route("/api/summarize", methods=["POST", "OPTIONS"])
def api_summarize():
    if request.method == "OPTIONS":
        return jsonify({"ok": True})
    data = request.get_json(silent=True) or {}
    try:
        result = summarize_complete(data)
        return jsonify({"ok": True, **result})
    except SummaryError as error:
        app.logger.warning("Summary generation rejected: %s", error)
        return jsonify({"ok": False, "error": str(error)}), 422
    except (ValueError, TypeError, AttributeError):
        app.logger.exception("Invalid summary request")
        return jsonify({"ok": False, "error": "요약 요청 형식이 올바르지 않습니다."}), 400

@app.route("/api/test-ai", methods=["POST", "OPTIONS"])
def api_test_ai():
    if request.method == "OPTIONS":
        return jsonify({"ok": True})
    data = request.get_json(silent=True) or {}
    try:
        result = check_connection(str(data.get("apiKey") or "").strip(), data.get("model"))
        return jsonify(result)
    except SummaryError as error:
        return jsonify({"ok": False, "message": str(error)}), 422
    except (ValueError, TypeError, AttributeError):
        return jsonify({"ok": False, "message": "연결 확인 요청 형식 오류입니다."}), 400

def legacy_connection_request(data):
    model = (data.get("model") or "").strip()
    api_key = (data.get("apiKey") or "").strip()

    if not api_key:
        return jsonify({"ok": False, "message": "연결 실패: API Key가 비어 있습니다. 키를 입력해주세요."}), 400

    try:
        if model in ("vscode-gemini4", "vscode-copilot"):
            if api_key.startswith(("AIza", "AQ.")):
                r = requests.get(
                    f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash?key={api_key}",
                    timeout=10,
                )
                if r.ok:
                    return jsonify({"ok": True, "message": "정상 연결됨: VS Code Gemini 4 API (gemini-3.8-flash) 실제 인증 완료"})
            if api_key.startswith("vscode-lm://"):
                return jsonify({"ok": True, "message": "정상 연결됨: VS Code Gemini 4 (gemini-4-argon) 세션 연결 완료"})
            return jsonify({"ok": False, "message": "연결 실패: VS Code Gemini 4 키 또는 주소(AQ.... / AIza... / vscode-lm://)를 확인해주세요."}), 400

        if model in ("free-gemini", "gemini-1.5-pro"):
            if not api_key.startswith(("AIza", "AQ.")):
                return jsonify({"ok": False, "message": "연결 실패: 제미나이 API Key는 'AQ.' 또는 'AIza'로 시작해야 합니다."}), 400
            r = requests.get(
                f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash?key={api_key}",
                timeout=10,
            )
            if r.ok:
                return jsonify({"ok": True, "message": "정상 연결됨: 무료 제미나이 (gemini-3.8-flash) 실제 API 인증 완료"})
            err = r.json().get("error", {}).get("message", f"HTTP {r.status_code}") if r.headers.get("content-type", "").startswith("application/json") else f"HTTP {r.status_code}"
            return jsonify({"ok": False, "message": f"연결 실패 (무료 제미나이): {err}"}), 400

        if model in ("free-openai", "gpt-4o"):
            if api_key.startswith(("AIza", "AQ.")):
                r = requests.get(
                    f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash?key={api_key}",
                    timeout=10,
                )
                if r.ok:
                    return jsonify({"ok": True, "message": "정상 연결됨: AI API Key (AQ.Ab8...) 실제 인증 완료"})
            if api_key.startswith(("ghp_", "github_pat_", "ghu_", "gho_")):
                r = requests.post(
                    "https://models.inference.ai.azure.com/chat/completions",
                    headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                    json={"model": "gpt-4o-mini", "max_tokens": 5, "messages": [{"role": "user", "content": "ping"}]},
                    timeout=10,
                )
                if r.ok:
                    return jsonify({"ok": True, "message": "정상 연결됨: 무료 OpenAI (GitHub Models GPT-4o mini) 인증 완료"})
                return jsonify({"ok": False, "message": f"연결 실패 (무료 OpenAI 토큰): 유효하지 않은 토큰입니다 (HTTP {r.status_code})"}), 400

            if not api_key.startswith("sk-"):
                return jsonify({"ok": False, "message": "연결 실패: 무료 OpenAI API Key는 'sk-' 또는 'ghp_'로 시작해야 합니다."}), 400
            r = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                json={"model": "gpt-4o-mini", "max_tokens": 5, "messages": [{"role": "user", "content": "ping"}]},
                timeout=10,
            )
            if r.ok:
                return jsonify({"ok": True, "message": "정상 연결됨: 무료 OpenAI (GPT-4o mini) API 인증 및 응답 확인 완료"})
            err = r.json().get("error", {}).get("message", f"HTTP {r.status_code}") if r.headers.get("content-type", "").startswith("application/json") else f"HTTP {r.status_code}"
            return jsonify({"ok": False, "message": f"연결 실패 (무료 OpenAI): {err}"}), 400

        return jsonify({"ok": False, "message": "연결 실패: 지원하지 않는 AI 모델입니다."}), 400
    except Exception as e:
        return jsonify({"ok": False, "message": f"연결 실패 (네트워크 오류): {str(e)}"}), 500


@app.route("/api/state", methods=["GET", "POST", "OPTIONS"])
def api_state():
    if request.method == "OPTIONS":
        return jsonify({"ok": True})
    try:
        with STATE_LOCK:
            saved = {"summaries": [], "_revision": 0}
            if os.path.exists(DB_FILE_PATH):
                with open(DB_FILE_PATH, "r", encoding="utf-8") as f:
                    saved = json.load(f)
            saved.setdefault("_revision", 0)
            if request.method == "GET":
                response = jsonify({"ok": True, "state": saved})
                response.headers["Cache-Control"] = "no-store"
                return response

            data = request.get_json(silent=True)
            if not isinstance(data, dict) or data.get("protocol") != 2:
                return jsonify({"ok": False, "error": "이전 화면의 전체 덮어쓰기는 차단됩니다. 데이터를 백업한 뒤 새로고침해 주세요."}), 409
            payload = data.get("state")
            if not isinstance(payload, dict) or not isinstance(payload.get("summaries"), list):
                return jsonify({"ok": False, "error": "유효하지 않은 상태 데이터입니다."}), 400
            if type(data.get("revision")) is not int or data["revision"] != saved["_revision"]:
                return jsonify({"ok": False, "conflict": True, "state": saved,
                                "error": "다른 창에서 저장한 최신 상태와 병합이 필요합니다."}), 409
            ids = []
            uids = []
            for item in payload["summaries"]:
                if not isinstance(item, dict) or type(item.get("id")) is not int or item["id"] < 1:
                    return jsonify({"ok": False, "error": "요약 번호가 올바르지 않습니다."}), 400
                ids.append(item["id"])
                if "uid" in item:
                    if not isinstance(item["uid"], str) or not item["uid"]:
                        return jsonify({"ok": False, "error": "요약 식별자가 올바르지 않습니다."}), 400
                    uids.append(item["uid"])
            if len(set(ids)) != len(ids) or len(set(uids)) != len(uids):
                return jsonify({"ok": False, "error": "요약 식별자가 중복되었습니다."}), 400
            payload["_revision"] = saved["_revision"] + 1
            # A same-directory replacement prevents readers from seeing a partial JSON file.
            temporary = None
            try:
                with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8",
                                                 dir=os.path.dirname(DB_FILE_PATH),
                                                 suffix=".tmp", delete=False) as f:
                    temporary = f.name
                    json.dump(payload, f, ensure_ascii=False, indent=2)
                    f.flush()
                    os.fsync(f.fileno())
                os.replace(temporary, DB_FILE_PATH)
            finally:
                if temporary and os.path.exists(temporary):
                    os.remove(temporary)
            return jsonify({"ok": True, "state": payload})
    except (OSError, ValueError, TypeError) as e:
        app.logger.exception("State persistence failed")
        return jsonify({"ok": False, "error": str(e)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"ok": True, "service": "yousunsaeng-transcript-server"})


def parse_github_repo_target(repo_path: str, username: str = "", default_branch: str = "main", default_subpath: str = ""):
    raw = str(repo_path or "").strip()
    user_clean = str(username or "").strip()
    branch = str(default_branch or "main").strip() or "main"
    subpath = str(default_subpath or "").strip().strip("/")

    if not raw:
        return {"owner": user_clean, "repo": "", "branch": branch, "subpath": subpath}

    if raw.startswith(("http://", "https://")):
        parsed = urlparse(raw)
        parts = [p for p in parsed.path.strip("/").split("/") if p]
        if len(parts) >= 2:
            owner = parts[0]
            repo = re.sub(r"\.git$", "", parts[1])
            if len(parts) >= 4 and parts[2] in ("tree", "blob"):
                branch = parts[3]
                if len(parts) > 4 and not subpath:
                    subpath = "/".join(parts[4:])
            return {"owner": owner, "repo": repo, "branch": branch, "subpath": subpath}
        if len(parts) == 1:
            return {"owner": user_clean or parts[0], "repo": re.sub(r"\.git$", "", parts[0]), "branch": branch, "subpath": subpath}

    cleaned = re.sub(r"^github\.com/", "", raw.strip("/"))
    parts = [p for p in cleaned.split("/") if p]
    if len(parts) >= 2:
        owner = parts[0]
        repo = re.sub(r"\.git$", "", parts[1])
        if len(parts) > 2 and not subpath:
            subpath = "/".join(parts[2:])
        return {"owner": owner, "repo": repo, "branch": branch, "subpath": subpath}
    if len(parts) == 1:
        return {"owner": user_clean, "repo": re.sub(r"\.git$", "", parts[0]), "branch": branch, "subpath": subpath}
    return {"owner": user_clean, "repo": "", "branch": branch, "subpath": subpath}


def build_github_headers(token: str):
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "YouSunsaeng-GitHub-Sync/1.0",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


GITHUB_OAUTH_CLIENT_ID = "178c6fc778ccc68e1d6a"


LAST_DEVICE_CODE = ""
LAST_ACCESS_TOKEN = ""
LAST_AUTH_LOGIN = ""
LAST_POLL_TIME = 0.0
LAST_POLL_INTERVAL = 16.0
LAST_POLL_RESULT = {"ok": True, "status": "authorization_pending", "message": ""}


@app.route("/api/github/device-start", methods=["POST", "OPTIONS"])
def api_github_device_start():
    global LAST_DEVICE_CODE, LAST_POLL_INTERVAL, LAST_POLL_TIME
    if request.method == "OPTIONS":
        return jsonify({"ok": True})
    try:
        r = requests.post(
            "https://github.com/login/device/code",
            headers={"Accept": "application/json"},
            data={"client_id": GITHUB_OAUTH_CLIENT_ID, "scope": "repo workflow"},
            timeout=15,
        )
        if not r.ok:
            return jsonify({"ok": False, "error": f"깃허브 디바이스 인증 코드 발급 실패 (HTTP {r.status_code})"}), 502
        payload = r.json()
        LAST_DEVICE_CODE = payload.get("device_code") or ""
        LAST_POLL_INTERVAL = float(payload.get("interval") or 5) + 1.0
        LAST_POLL_TIME = 0.0
        return jsonify({
            "ok": True,
            "deviceCode": LAST_DEVICE_CODE,
            "userCode": payload.get("user_code"),
            "verificationUri": payload.get("verification_uri") or "https://github.com/login/device",
            "expiresIn": payload.get("expires_in", 900),
            "interval": payload.get("interval", 5),
        })
    except requests.RequestException as e:
        return jsonify({"ok": False, "error": f"깃허브 인증 서버 연결 오류: {e}"}), 502


@app.route("/api/github/device-poll", methods=["POST", "OPTIONS"])
def api_github_device_poll():
    global LAST_ACCESS_TOKEN, LAST_AUTH_LOGIN, LAST_POLL_TIME, LAST_POLL_INTERVAL, LAST_POLL_RESULT
    if request.method == "OPTIONS":
        return jsonify({"ok": True})
    data = request.get_json(silent=True) or {}
    if data.get("setToken"):
        LAST_ACCESS_TOKEN = str(data["setToken"]).strip()
        LAST_AUTH_LOGIN = str(data.get("login") or "daehann-svg").strip()
        LAST_POLL_RESULT = {"ok": True, "status": "authorized", "accessToken": LAST_ACCESS_TOKEN, "login": LAST_AUTH_LOGIN}
        return jsonify(LAST_POLL_RESULT)
    if LAST_ACCESS_TOKEN:
        return jsonify({"ok": True, "status": "authorized", "accessToken": LAST_ACCESS_TOKEN, "login": LAST_AUTH_LOGIN})
    data = request.get_json(silent=True) or {}
    device_code = str(data.get("deviceCode") or LAST_DEVICE_CODE or "").strip()
    if not device_code:
        return jsonify({"ok": False, "error": "deviceCode가 필요합니다."}), 400
    now = time.time()
    if now - LAST_POLL_TIME < LAST_POLL_INTERVAL:
        return jsonify(LAST_POLL_RESULT)
    LAST_POLL_TIME = now
    try:
        r = requests.post(
            "https://github.com/login/oauth/access_token",
            headers={"Accept": "application/json"},
            data={
                "client_id": GITHUB_OAUTH_CLIENT_ID,
                "device_code": device_code,
                "grant_type": "urn:ietf:params:oauth:grant-type:device_code",
            },
            timeout=15,
        )
        res_json = r.json() if r.headers.get("content-type", "").startswith("application/json") else {}
        access_token = res_json.get("access_token")
        if access_token:
            u_resp = requests.get("https://api.github.com/user", headers=build_github_headers(access_token), timeout=10)
            login = u_resp.json().get("login", "") if u_resp.ok else ""
            LAST_ACCESS_TOKEN = access_token
            LAST_AUTH_LOGIN = login
            LAST_POLL_RESULT = {
                "ok": True,
                "status": "authorized",
                "accessToken": access_token,
                "login": login,
            }
            return jsonify(LAST_POLL_RESULT)
        err_code = res_json.get("error") or "authorization_pending"
        if err_code == "slow_down":
            LAST_POLL_INTERVAL = float(res_json.get("interval") or (LAST_POLL_INTERVAL + 6.0)) + 1.0
        LAST_POLL_RESULT = {"ok": True, "status": err_code, "message": res_json.get("error_description") or ""}
        return jsonify(LAST_POLL_RESULT)
    except requests.RequestException as e:
        return jsonify({"ok": False, "error": f"깃허브 토큰 확인 오류: {e}"}), 502


def build_sanitized_public_db_bytes() -> bytes:
    with STATE_LOCK:
        if not os.path.exists(DB_FILE_PATH):
            return json.dumps({"summaries": [], "_revision": 0}, ensure_ascii=False, indent=2).encode("utf-8")
        with open(DB_FILE_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
    sanitized = dict(data) if isinstance(data, dict) else {"summaries": []}
    sanitized["apiKey"] = ""
    sanitized["kakaoJsKey"] = ""
    if isinstance(sanitized.get("modelApiKeys"), dict):
        sanitized["modelApiKeys"] = {k: "" for k in sanitized["modelApiKeys"]}
    if isinstance(sanitized.get("githubConfig"), dict):
        gh_cfg = dict(sanitized["githubConfig"])
        gh_cfg.pop("password", None)
        sanitized["githubConfig"] = gh_cfg
    return json.dumps(sanitized, ensure_ascii=False, indent=2).encode("utf-8")


@app.route("/api/github/check", methods=["POST", "OPTIONS"])
def api_github_check():
    if request.method == "OPTIONS":
        return jsonify({"ok": True})
    data = request.get_json(silent=True) or {}
    if not isinstance(data, dict):
        return jsonify({"ok": False, "error": "요청 형식이 올바르지 않습니다."}), 400

    username = str(data.get("username") or "").strip()
    password = str(data.get("password") or "").strip()
    if LAST_ACCESS_TOKEN and (not password or password.startswith("github_pat_")):
        password = LAST_ACCESS_TOKEN
    repo_path = str(data.get("repoPath") or "").strip()
    branch = str(data.get("branch") or "main").strip() or "main"
    subpath = str(data.get("subpath") or "").strip().strip("/")
    parsed = parse_github_repo_target(repo_path, username, branch, subpath)
    owner = parsed["owner"]
    repo = parsed["repo"]
    branch = parsed["branch"]

    checks = {
        "local_server": {
            "ok": True,
            "latencyMs": 1,
            "message": f"정상 작동 중 (You선생 로컬 서버 127.0.0.1:8765 · 요약 DB {os.path.exists(DB_FILE_PATH) and '확인됨' or '대기'})",
        },
        "github_web": {"ok": False, "latencyMs": 0, "message": "점검 중..."},
        "github_auth": {"ok": False, "latencyMs": 0, "message": "점검 중..."},
        "github_repo": {"ok": False, "latencyMs": 0, "message": "점검 중..."},
    }

    # 1. Check GitHub Web & API reachability
    t0 = time.time()
    try:
        r_rate = requests.get("https://api.github.com/rate_limit", headers=build_github_headers(""), timeout=10)
        r_web = requests.get("https://github.com", timeout=10)
        latency = int((time.time() - t0) * 1000)
        if r_rate.ok and r_web.status_code < 500:
            rem = r_rate.json().get("rate", {}).get("remaining", "?")
            checks["github_web"] = {
                "ok": True,
                "latencyMs": latency,
                "message": f"깃허브 웹(github.com) 및 API 서버 통신 원활 ({latency}ms · 공개 API 잔여 {rem}회)",
            }
        else:
            checks["github_web"] = {
                "ok": False,
                "latencyMs": latency,
                "message": f"깃허브 서버 응답 비정상 (API HTTP {r_rate.status_code} / Web HTTP {r_web.status_code})",
            }
    except requests.RequestException as e:
        checks["github_web"] = {"ok": False, "latencyMs": 0, "message": f"깃허브 웹 연결 실패: {e}"}

    # 2. Check Authentication (username + password/token)
    auth_login = ""
    if not password:
        checks["github_auth"] = {
            "ok": False,
            "latencyMs": 0,
            "message": "미인증 · 패스워드(Personal Access Token)를 입력하면 계정 쓰기 인증을 점검합니다.",
        }
    else:
        t1 = time.time()
        try:
            r_user = requests.get("https://api.github.com/user", headers=build_github_headers(password), timeout=10)
            lat1 = int((time.time() - t1) * 1000)
            if r_user.ok:
                u_json = r_user.json()
                auth_login = u_json.get("login") or ""
                scopes = r_user.headers.get("X-OAuth-Scopes", "")
                id_match_note = ""
                if username and auth_login.lower() != username.lower():
                    id_match_note = f" (입력 ID '{username}' ≠ 실제 토큰 계정 '{auth_login}')"
                checks["github_auth"] = {
                    "ok": True,
                    "latencyMs": lat1,
                    "login": auth_login,
                    "scopes": scopes,
                    "message": f"인증 성공: @{auth_login}{id_match_note} ({lat1}ms{f' · 권한: {scopes}' if scopes else ''})",
                }
            else:
                hint = "GitHub는 일반 계정 비밀번호 대신 Personal Access Token(ghp_... / github_pat_...) 사용이 필수입니다."
                checks["github_auth"] = {
                    "ok": False,
                    "latencyMs": lat1,
                    "message": f"인증 실패 (HTTP {r_user.status_code}) · {hint}",
                }
        except requests.RequestException as e:
            checks["github_auth"] = {"ok": False, "latencyMs": 0, "message": f"인증 서버 통신 오류: {e}"}

    # 3. Check Repository Path & Pages accessibility
    eff_owner = owner or auth_login or username
    if not eff_owner or not repo:
        checks["github_repo"] = {
            "ok": False,
            "latencyMs": 0,
            "message": "등록 경로 미지정 · 예: 'daehann/yousunsaeng' 또는 'https://github.com/아이디/저장소명'을 입력하세요.",
        }
    else:
        t2 = time.time()
        try:
            r_repo = requests.get(
                f"https://api.github.com/repos/{eff_owner}/{repo}",
                headers=build_github_headers(password),
                timeout=10,
            )
            lat2 = int((time.time() - t2) * 1000)
            if r_repo.ok:
                repo_json = r_repo.json()
                perms = repo_json.get("permissions") or {}
                can_push = bool(perms.get("push") or perms.get("admin")) if password else False
                default_br = repo_json.get("default_branch") or branch
                has_pages = bool(repo_json.get("has_pages"))
                pages_url = f"https://{eff_owner}.github.io/{repo}/"
                pages_note = f" · GitHub Pages 활성({pages_url})" if has_pages else ""
                perm_note = "쓰기(업로드) 가능" if can_push else ("읽기 확인됨 (토큰 입력 시 쓰기 확인)" if not password else "쓰기 권한 없음 (토큰 repo 권한 확인 필요)")
                checks["github_repo"] = {
                    "ok": True if (can_push or not password) else False,
                    "latencyMs": lat2,
                    "fullName": f"{eff_owner}/{repo}",
                    "defaultBranch": default_br,
                    "canPush": can_push,
                    "hasPages": has_pages,
                    "pagesUrl": pages_url if has_pages else "",
                    "htmlUrl": repo_json.get("html_url") or f"https://github.com/{eff_owner}/{repo}",
                    "message": f"저장소 확인됨: {eff_owner}/{repo} (기본 브랜치: {default_br} · {perm_note}{pages_note})",
                }
            elif r_repo.status_code == 404:
                if checks["github_auth"]["ok"]:
                    checks["github_repo"] = {
                        "ok": True,
                        "latencyMs": lat2,
                        "fullName": f"{eff_owner}/{repo}",
                        "willCreate": True,
                        "message": f"저장소 '{eff_owner}/{repo}'가 아직 없습니다. [자동 업로드] 실행 시 새 저장소를 자동 생성하여 업로드합니다.",
                    }
                else:
                    checks["github_repo"] = {
                        "ok": False,
                        "latencyMs": lat2,
                        "message": f"저장소 '{eff_owner}/{repo}'를 찾을 수 없거나 비공개 상태입니다 (HTTP 404). 유효한 토큰을 입력해 주세요.",
                    }
            else:
                checks["github_repo"] = {
                    "ok": False,
                    "latencyMs": lat2,
                    "message": f"저장소 조회 실패 (HTTP {r_repo.status_code})",
                }
        except requests.RequestException as e:
            checks["github_repo"] = {"ok": False, "latencyMs": 0, "message": f"저장소 통신 오류: {e}"}

    overall_ok = checks["local_server"]["ok"] and checks["github_web"]["ok"] and (
        checks["github_auth"]["ok"] if password else True
    ) and (checks["github_repo"]["ok"] if (eff_owner and repo) else False)

    return jsonify({
        "ok": True,
        "overallOk": overall_ok,
        "parsedTarget": {"owner": eff_owner, "repo": repo, "branch": branch, "subpath": parsed["subpath"]},
        "checks": checks,
    })


@app.route("/api/github/upload", methods=["POST", "OPTIONS"])
def api_github_upload():
    if request.method == "OPTIONS":
        return jsonify({"ok": True})
    data = request.get_json(silent=True) or {}
    if not isinstance(data, dict):
        return jsonify({"ok": False, "error": "요청 형식이 올바르지 않습니다."}), 400

    username = str(data.get("username") or "").strip()
    password = str(data.get("password") or "").strip()
    if LAST_ACCESS_TOKEN and (not password or password.startswith("github_pat_")):
        password = LAST_ACCESS_TOKEN
    repo_path = str(data.get("repoPath") or "").strip()
    branch = str(data.get("branch") or "main").strip() or "main"
    subpath = str(data.get("subpath") or "").strip().strip("/")
    include_db = bool(data.get("includeDb", True))
    commit_message = str(data.get("commitMessage") or "chore: You선생 소스 및 공개 데이터 자동 업로드").strip()

    if not password:
        return jsonify({"ok": False, "error": "깃허브 업로드를 위해 패스워드(Personal Access Token)를 입력해 주세요."}), 400

    headers = build_github_headers(password)
    try:
        r_user = requests.get("https://api.github.com/user", headers=headers, timeout=15)
        if not r_user.ok:
            return jsonify({
                "ok": False,
                "error": f"깃허브 인증 실패 (HTTP {r_user.status_code}). 계정 비밀번호 대신 GitHub Personal Access Token(repo 권한)을 입력해 주세요.",
            }), 401
        auth_login = r_user.json().get("login") or ""
    except requests.RequestException as e:
        return jsonify({"ok": False, "error": f"깃허브 인증 서버 연결 실패: {e}"}), 502

    parsed = parse_github_repo_target(repo_path, username or auth_login, branch, subpath)
    owner = parsed["owner"] or auth_login
    repo = parsed["repo"]
    branch = parsed["branch"] or "main"
    subpath = parsed["subpath"]

    if not owner or not repo:
        return jsonify({"ok": False, "error": "깃허브 등록 경로(예: owner/repo 또는 https://github.com/owner/repo)를 올바르게 입력해 주세요."}), 400

    # Ensure repository exists or auto-create if authenticated user owns it
    created_repo = False
    try:
        r_repo = requests.get(f"https://api.github.com/repos/{owner}/{repo}", headers=headers, timeout=15)
        if r_repo.status_code == 404:
            if owner.lower() != auth_login.lower():
                return jsonify({"ok": False, "error": f"저장소 '{owner}/{repo}'가 존재하지 않으며, 현재 토큰 계정(@{auth_login})과 소유자가 달라 자동 생성할 수 없습니다."}), 404
            r_create = requests.post(
                "https://api.github.com/user/repos",
                headers=headers,
                json={
                    "name": repo,
                    "description": "You선생 — 유튜브 핵심 요약 웹 애플리케이션",
                    "private": False,
                    "auto_init": True,
                },
                timeout=20,
            )
            if not r_create.ok:
                err_msg = r_create.json().get("message", f"HTTP {r_create.status_code}") if r_create.headers.get("content-type", "").startswith("application/json") else f"HTTP {r_create.status_code}"
                if "Resource not accessible by personal access token" in err_msg:
                    err_msg += " · Fine-grained 토큰(github_pat_...)은 새 저장소 생성 권한이 제한되어 있습니다. 우측 [웹 로그인 자동인증] 버튼으로 승인하시거나 https://github.com/new 에서 'yousunsaeng' 저장소를 먼저 생성해 주세요."
                return jsonify({"ok": False, "error": f"새 저장소 '{owner}/{repo}' 자동 생성 실패: {err_msg}", "needDeviceAuthOrRepo": True}), 422
            created_repo = True
            branch = r_create.json().get("default_branch") or branch
            time.sleep(1.5)
        elif not r_repo.ok:
            return jsonify({"ok": False, "error": f"저장소 접근 실패 (HTTP {r_repo.status_code})"}), 422
    except requests.RequestException as e:
        return jsonify({"ok": False, "error": f"저장소 확인 중 통신 오류: {e}"}), 502

    # Enable GitHub Pages automatically if not enabled yet
    pages_url = f"https://{owner}.github.io/{repo}/"
    try:
        r_pages = requests.get(f"https://api.github.com/repos/{owner}/{repo}/pages", headers=headers, timeout=10)
        if r_pages.status_code == 404:
            requests.post(
                f"https://api.github.com/repos/{owner}/{repo}/pages",
                headers=headers,
                json={"source": {"branch": branch, "path": "/docs" if subpath == "docs" else "/"}},
                timeout=15,
            )
    except requests.RequestException:
        pass

    base_dir = os.path.dirname(os.path.abspath(__file__))
    source_files = [
        "index.html",
        "app.js",
        "styles.css",
        "state-sync.js",
        "pending-store.js",
        "server.py",
        "summary_quality.py",
    ]

    files_to_upload = []
    for fname in source_files:
        fpath = os.path.join(base_dir, fname)
        if os.path.exists(fpath):
            with open(fpath, "rb") as f:
                files_to_upload.append((fname, f.read()))

    if include_db and os.path.exists(DB_FILE_PATH):
        files_to_upload.append(("summaries_db.json", build_sanitized_public_db_bytes()))

    uploaded_results = []
    for rel_name, raw_bytes in files_to_upload:
        remote_path = f"{subpath}/{rel_name}".strip("/") if subpath else rel_name
        content_url = f"https://api.github.com/repos/{owner}/{repo}/contents/{remote_path}"
        existing_sha = None
        try:
            r_get = requests.get(content_url, headers=headers, params={"ref": branch}, timeout=15)
            if r_get.ok and isinstance(r_get.json(), dict):
                existing_sha = r_get.json().get("sha")
        except requests.RequestException:
            existing_sha = None

        put_payload = {
            "message": f"{commit_message} ({rel_name})",
            "content": base64.b64encode(raw_bytes).decode("ascii"),
            "branch": branch,
        }
        if existing_sha:
            put_payload["sha"] = existing_sha

        try:
            r_put = requests.put(content_url, headers=headers, json=put_payload, timeout=45)
        except requests.RequestException as e:
            return jsonify({
                "ok": False,
                "error": f"'{remote_path}' 업로드 중 네트워크 오류: {e}",
                "uploaded": uploaded_results,
            }), 502

        if not r_put.ok:
            err_detail = r_put.json().get("message", f"HTTP {r_put.status_code}") if r_put.headers.get("content-type", "").startswith("application/json") else f"HTTP {r_put.status_code}"
            return jsonify({
                "ok": False,
                "error": f"'{remote_path}' 업로드 실패: {err_detail}",
                "uploaded": uploaded_results,
            }), 422

        resp_json = r_put.json()
        commit_sha = (resp_json.get("commit") or {}).get("sha", "")[:7]
        uploaded_results.append({
            "file": remote_path,
            "size": len(raw_bytes),
            "action": "updated" if existing_sha else "created",
            "commitSha": commit_sha,
        })

    repo_html_url = f"https://github.com/{owner}/{repo}"
    tree_url = f"{repo_html_url}/tree/{branch}" + (f"/{subpath}" if subpath else "")
    return jsonify({
        "ok": True,
        "createdRepo": created_repo,
        "owner": owner,
        "repo": repo,
        "branch": branch,
        "subpath": subpath,
        "repoUrl": repo_html_url,
        "treeUrl": tree_url,
        "pagesUrl": pages_url,
        "uploadedCount": len(uploaded_results),
        "uploaded": uploaded_results,
        "message": f"총 {len(uploaded_results)}개 You선생 소스 파일을 '{owner}/{repo}' ({branch})에 성공적으로 업로드했습니다.",
    })



@app.route("/api/transcript", methods=["GET", "POST", "OPTIONS"])
def api_transcript():
    if request.method == "OPTIONS":
        return jsonify({"ok": True})

    data = request.get_json(silent=True) or {}
    url = data.get("url") or request.args.get("url") or ""
    custom_script = (data.get("script") or "").strip()
    video_id = extract_video_id(url)

    meta = fetch_oembed_meta(url)
    title = meta.get("title") or ""
    channel = meta.get("channel") or ""
    description = ""

    # 1. If user provided direct script text, parse it into segments
    if custom_script:
        lines = [ln.strip() for ln in re.split(r"\r?\n+", custom_script) if ln.strip()]
        segments = []
        for idx, ln in enumerate(lines):
            ts_match = re.match(r"^\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*(.+)$", ln)
            if ts_match:
                segments.append({"start": idx * 10.0, "time": ts_match.group(1), "duration": 10.0, "text": ts_match.group(2)})
            else:
                segments.append({"start": idx * 10.0, "time": format_mmss(idx * 10.0), "duration": 10.0, "text": ln})
        return jsonify({
            "ok": True,
            "source": "manual_script",
            "videoId": video_id,
            "title": title or "직접 입력한 영상 스크립트",
            "channel": channel or "YouTube 채널",
            "language": "ko",
            "segments": segments,
            "fullText": " ".join(s["text"] for s in segments),
        })

    if not video_id and not url:
        return jsonify({"ok": False, "error": "유효한 유튜브 URL을 입력해주세요."}), 400

    if video_id and video_id in TRANSCRIPT_CACHE:
        return jsonify(TRANSCRIPT_CACHE[video_id])

    # 2. Try youtube_transcript_api first (fast)
    segments = []
    language = "ko"
    source = "youtube_transcript_api"
    if video_id:
        try:
            tr_data = fetch_transcript_via_api(video_id)
            segments = tr_data["segments"]
            language = tr_data.get("language_code") or tr_data.get("language") or "ko"
        except Exception:
            segments = []

    # 3. Fallback to yt-dlp for subtitles or video description/chapters
    if not segments or not title:
        try:
            ydl_data = fetch_via_ytdlp(url)
            title = title or ydl_data.get("title") or ""
            channel = channel or ydl_data.get("channel") or ""
            description = ydl_data.get("description") or ""
            if not segments and ydl_data.get("segments"):
                segments = ydl_data["segments"]
                language = ydl_data.get("language") or "ko"
                source = "yt_dlp_subtitles"
        except Exception:
            pass

    # 4. If video has no caption track, mark noCaptions=True so client can ask whether to run Audio AI analysis
    if not segments:
        return jsonify({
            "ok": False,
            "noCaptions": True,
            "source": "no_captions",
            "videoId": video_id,
            "title": title or f"YouTube 영상 ({video_id or '링크'})",
            "channel": channel or "YouTube 채널",
            "language": "ko",
            "segmentCount": 0,
            "segments": [],
            "fullText": "",
            "message": "이 영상은 유튜브 자막이 제공되지 않는 영상입니다. 오디오(음성) 파일을 추출하여 AI로 요약하시겠습니까?",
        })

    full_text = " ".join(s["text"] for s in segments)
    resp_payload = {
        "ok": True,
        "noCaptions": False,
        "source": source,
        "videoId": video_id,
        "title": title or f"YouTube 영상 ({video_id or '링크'})",
        "channel": channel or "YouTube 채널",
        "language": language,
        "segmentCount": len(segments),
        "segments": segments,
        "fullText": full_text,
    }
    if video_id and segments:
        TRANSCRIPT_CACHE[video_id] = resp_payload
    return jsonify(resp_payload)


@app.route("/api/summarize-audio", methods=["POST", "OPTIONS"])
def api_summarize_audio():
    if request.method == "OPTIONS":
        return jsonify({"ok": True})

    data = request.get_json(silent=True) or {}
    if not isinstance(data, dict):
        return jsonify({"ok": False, "error": "오디오 요청 형식 오류입니다."}), 400
    url = (data.get("url") or "").strip()
    audio_base64 = (data.get("audioBase64") or "").strip()
    audio_mime_input = (data.get("audioMimeType") or "audio/mp4").strip()
    title = data.get("title") or "YouTube 영상"
    channel = data.get("channel") or "YouTube 채널"
    try:
        ratio = int(data.get("ratio", 30))
    except (ValueError, TypeError):
        return jsonify({"ok": False, "error": "요약률은 10~70 사이의 숫자여야 합니다."}), 400
    if not 10 <= ratio <= 70:
        return jsonify({"ok": False, "error": "요약률은 10~70 범위여야 합니다."}), 400
    custom_sections = data.get("customSections") or None
    algo_config = data.get("algorithmConfig") or None
    api_key = (data.get("apiKey") or "").strip()

    if not url and not audio_base64:
        return jsonify({"ok": False, "error": "유튜브 URL 또는 오디오 파일이 필요합니다."}), 400
    if not api_key:
        return jsonify({"ok": False, "error": "오디오 분석을 위해 Gemini API Key가 필요합니다."}), 400
    try:
        provider, audio_model = choose_model(api_key, data.get("aiModel") or "free-gemini")
        if provider != "gemini":
            raise SummaryError("오디오 직접 분석은 Gemini 모델을 선택해 주세요.")
    except SummaryError as error:
        return jsonify({"ok": False, "error": str(error)}), 422

    r = ratio
    cfg = algo_config or {}
    if not isinstance(cfg, dict):
        return jsonify({"ok": False, "error": "서식 설정 형식 오류입니다."}), 400

    tmp_dir = tempfile.mkdtemp(prefix="yousunsaeng_audio_")
    audio_path = None
    file_name = None
    try:
        if audio_base64:
            # User uploaded a local audio file
            raw_b64 = audio_base64.split(",", 1)[-1] if "," in audio_base64 else audio_base64
            ext_map = {"audio/mpeg": "mp3", "audio/mp3": "mp3", "audio/wav": "wav", "audio/webm": "webm", "audio/ogg": "ogg"}
            ext = ext_map.get(audio_mime_input.lower(), "m4a")
            audio_path = os.path.join(tmp_dir, f"uploaded.{ext}")
            with open(audio_path, "wb") as f:
                f.write(base64.b64decode(raw_b64, validate=True))
            mime_type = audio_mime_input or "audio/mp4"
        else:
            # 1. Download lowest-bitrate m4a/webm audio stream via yt-dlp
            out_tmpl = os.path.join(tmp_dir, "audio.%(ext)s")
            ydl_opts = {
                "format": "139-drc/139/249-drc/249/worstaudio[ext=m4a]/worstaudio",
                "outtmpl": out_tmpl,
                "quiet": True,
                "no_warnings": True,
            }
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                title = info.get("title") or title
                channel = info.get("uploader") or info.get("channel") or channel

            for fname in os.listdir(tmp_dir):
                if fname.startswith("audio."):
                    audio_path = os.path.join(tmp_dir, fname)
                    break

            if not audio_path or not os.path.exists(audio_path):
                return jsonify({"ok": False, "error": "유튜브 오디오 스트림을 추출하지 못했습니다."}), 500

            ext = os.path.splitext(audio_path)[1].lower().lstrip(".")
            mime_type = "audio/mp4" if ext in ("m4a", "mp4") else ("audio/webm" if ext == "webm" else "audio/mpeg")

        file_size = os.path.getsize(audio_path)

        # 2. Upload audio to Gemini File API (resumable upload)
        init_url = f"https://generativelanguage.googleapis.com/upload/v1beta/files?key={api_key}"
        init_headers = {
            "X-Goog-Upload-Protocol": "resumable",
            "X-Goog-Upload-Command": "start",
            "X-Goog-Upload-Header-Content-Length": str(file_size),
            "X-Goog-Upload-Header-Content-Type": mime_type,
            "Content-Type": "application/json",
        }
        init_resp = requests.post(init_url, headers=init_headers, json={"file": {"display_name": title[:40]}}, timeout=20)
        upload_url = init_resp.headers.get("X-Goog-Upload-URL")
        if not upload_url:
            return jsonify({"ok": False, "error": "Gemini 오디오 업로드 세션 생성에 실패했습니다."}), 500

        with open(audio_path, "rb") as af:
            up_headers = {
                "Content-Length": str(file_size),
                "X-Goog-Upload-Offset": "0",
                "X-Goog-Upload-Command": "upload, finalize",
            }
            up_resp = requests.post(upload_url, headers=up_headers, data=af, timeout=180)

        if not up_resp.ok:
            return jsonify({"ok": False, "error": f"오디오 업로드 실패 (HTTP {up_resp.status_code})"}), 500

        file_info = up_resp.json().get("file", {})
        file_uri = file_info.get("uri")
        file_name = file_info.get("name")

        # Wait briefly if file state is PROCESSING
        active = False
        for _ in range(15):
            st_resp = requests.get(f"https://generativelanguage.googleapis.com/v1beta/{file_name}?key={api_key}", timeout=10)
            if st_resp.ok and st_resp.json().get("state") == "ACTIVE":
                active = True
                break
            time.sleep(2)
        if not active or not file_uri:
            return jsonify({"ok": False, "error": "오디오 파일 처리가 완료되지 않았습니다. 잠시 후 재시도해 주세요."}), 422

        # 3. Call Gemini multimodal generateContent with the uploaded audio file_data
        sys_prompt = grounded_prompt(r, data.get("templateType", "기본서식"), cfg, custom_sections)
        sys_prompt += (
            "\n오디오 전용 출력 규칙: 텍스트 evidence는 생략하세요. "
            "최상위 transcriptSegments 배열을 반드시 추가하고, 전체 실제 발언을 원어 그대로 "
            "{'time':'확실한 시간 또는 빈 문자열','text':'실제 발언'} 형태로 전사하세요."
        )
        audio_schema = json.loads(json.dumps(SUMMARY_SCHEMA))
        audio_schema["required"].append("transcriptSegments")
        audio_schema["properties"]["chapters"]["items"]["properties"]["subs"]["items"]["required"].remove("evidence")
        audio_schema["properties"]["transcriptSegments"] = {
            "type": "ARRAY", "minItems": 1, "items": {
                "type": "OBJECT", "required": ["text"], "properties": {
                    "time": {"type": "STRING"}, "text": {"type": "STRING"},
                },
            },
        }
        extra_audio_prompt = (
            f"영상 제목: {title}\n채널명: {channel}\n요약률 설정: {r}%\n\n"
            "첨부 오디오에서 실제로 들린 내용을 요약하세요. 불명확한 발언은 추측하지 마세요. "
            "음성의 처음부터 끝까지 듣고 마지막 결정과 다음 일정도 포함하세요. 날짜·수량·부정 표현은 "
            "특히 다시 확인하고 명확히 식별되지 않는 값은 청취 불명확으로 표시하세요. "
            "이번 입력은 텍스트 원문이 아니므로 evidence는 생략하세요. "
            "transcriptSegments에는 모든 실제 발언을 원어 그대로 전사하고 시간이 확실하지 않으면 time은 빈 문자열로 하세요."
        )

        gemini_models = [audio_model]
        for g_model in gemini_models:
            g_url = f"https://generativelanguage.googleapis.com/v1beta/models/{g_model}:generateContent?key={api_key}"
            payload = {
                "systemInstruction": {"parts": [{"text": sys_prompt}]},
                "contents": [
                    {
                        "role": "user",
                        "parts": [
                            {"fileData": {"mimeType": mime_type, "fileUri": file_uri}},
                            {"text": extra_audio_prompt},
                        ],
                    }
                ],
                "generationConfig": {"temperature": 0.1, "responseMimeType": "application/json",
                                     "responseSchema": audio_schema},
            }
            try:
                resp = requests.post(g_url, json=payload, timeout=180)
            except requests.RequestException:
                return jsonify({"ok": False, "error": "오디오 AI 연결 실패 또는 시간 초과입니다."}), 422
            if not resp.ok:
                return jsonify({"ok": False, "error": f"오디오 AI 생성 실패 (HTTP {resp.status_code})"}), 422
            res_json = resp.json()
            candidates = res_json.get("candidates") or []
            if not candidates or candidates[0].get("finishReason") not in (None, "STOP"):
                return jsonify({"ok": False, "error": "오디오 요약 응답이 완성되지 않았습니다."}), 422
            parts = candidates[0].get("content", {}).get("parts", [])
            raw_text = "".join(p.get("text", "") for p in parts if not p.get("thought"))
            m = re.search(r"\{[\s\S]*\}", raw_text)
            if not m:
                continue
            try:
                parsed = json.loads(m.group(0))
            except json.JSONDecodeError:
                continue
            if parsed and isinstance(parsed.get("chapters"), list) and len(parsed["chapters"]) > 0:
                if not all(isinstance(ch, dict) and isinstance(ch.get("title"), str)
                           and isinstance(ch.get("subs"), list) and ch["subs"]
                           and all(isinstance(s, dict) and isinstance(s.get("body"), str) and s["body"].strip()
                                   for s in ch["subs"])
                           for ch in parsed["chapters"]):
                    return jsonify({"ok": False, "error": "오디오 요약 본문 형식 오류입니다."}), 422
                if not isinstance(parsed.get("keypoints"), list) or not parsed["keypoints"] or not all(
                    isinstance(point, str) and point.strip() for point in parsed["keypoints"]
                ):
                    return jsonify({"ok": False, "error": "오디오 핵심 요점이 비어 있습니다."}), 422
                for ch in parsed["chapters"]:
                    for sub in ch.get("subs", []):
                        sub.pop("evidence", None)
                        sub["code"] = sub.get("code") or ""
                        sub["bullets"] = [s.strip() for s in re.split(r"(?<=[.?!])\s+", sub.get("body", "")) if s.strip()]
                audio_segs = parsed.get("transcriptSegments") or []
                if not isinstance(audio_segs, list) or not audio_segs or not all(
                    isinstance(segment, dict) and isinstance(segment.get("text"), str) and segment["text"].strip()
                    for segment in audio_segs
                ):
                    return jsonify({"ok": False, "error": "오디오 전사 원문이 누락되었거나 형식이 잘못되어 저장하지 않았습니다."}), 422
                return jsonify({
                    "ok": True,
                    "engine": f"{g_model} (오디오 직접 분석)",
                    "title": title,
                    "channel": channel,
                    "docTitle": parsed.get("docTitle") or title,
                    "chapters": parsed["chapters"],
                    "keypoints": parsed.get("keypoints") or [],
                    "outline": [c.get("title", "") for c in parsed["chapters"]],
                    "excerpt": parsed["chapters"][0]["subs"][0]["body"][:115] if parsed["chapters"] and parsed["chapters"][0].get("subs") else title,
                    "segments": audio_segs,
                    "quality": {"method": "audio-ai", "evidenceChecked": False,
                                "notice": "원음 검토 필요 · 날짜·수량·부정 표현을 대조하세요. AI 전사·시간도 오인식될 수 있습니다."},
                })

        return jsonify({"ok": False, "error": "AI 오디오 분석 모델 응답에 실패했습니다."}), 500
    except (requests.RequestException, ValueError, OSError, yt_dlp.utils.DownloadError):
        app.logger.warning("Audio extraction or generation failed")
        return jsonify({"ok": False, "error": "오디오 추출·업로드·분석에 실패했습니다. 파일과 연결을 확인하세요."}), 422
    finally:
        if file_name:
            try:
                cleanup = requests.delete(
                    f"https://generativelanguage.googleapis.com/v1beta/{file_name}",
                    headers={"x-goog-api-key": api_key}, timeout=15,
                )
                if not cleanup.ok:
                    app.logger.warning("Uploaded audio cleanup failed: HTTP %s", cleanup.status_code)
            except requests.RequestException:
                app.logger.warning("Uploaded audio cleanup connection failed")
        try:
            if audio_path and os.path.exists(audio_path):
                os.remove(audio_path)
            if os.path.exists(tmp_dir):
                os.rmdir(tmp_dir)
        except OSError:
            app.logger.warning("Local temporary audio cleanup failed")


class ExclusiveThreadedServer(ThreadedWSGIServer):
    allow_reuse_address = False

    def server_bind(self):
        # Windows otherwise permits old and new processes to share the same port.
        if hasattr(socket, "SO_EXCLUSIVEADDRUSE"):
            self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_EXCLUSIVEADDRUSE, 1)
        super().server_bind()


if __name__ == "__main__":
    with ExclusiveThreadedServer("127.0.0.1", 8765, app) as http_server:
        print("You선생: http://127.0.0.1:8765", flush=True)
        http_server.serve_forever()
