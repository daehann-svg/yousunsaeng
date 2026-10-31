const iconPaths = {
  play: '<path d="m7 4 13 8-13 8Z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  "plus-square": '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 12h8m-4-4v8"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  "arrow-up-right": '<path d="M6 18 18 6M6 6h12v12"/>',
  "arrow-right": '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  "arrow-left": '<path d="M20 12H4m6-6-6 6 6 6"/>',
  "arrow-down": '<path d="M12 4v16m-5-5 5 5 5-5"/>',
  "chevron-right": '<path d="m9 5 7 7-7 7"/>',
  "chevron-left": '<path d="m15 5-7 7 7 7"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  settings: '<path d="m9 3-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3h6l1-3 3-1-1-3 2-2-2-2 1-3-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sliders: '<path d="M4 7h6m4 0h6M4 17h10m4 0h2"/><circle cx="12" cy="7" r="2"/><circle cx="16" cy="17" r="2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',
  share: '<path d="M12 15V3m-4 4 4-4 4 4M7 10H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2"/>',
  message: '<path d="M21 11c0 4.4-4 8-9 8a11 11 0 0 1-3-.4L4 21l1.3-5C3.9 14.7 3 12.9 3 11c0-4.4 4-8 9-8s9 3.6 9 8Z"/><path d="M8 11h.1m3.9 0h.1m3.9 0h.1"/>',
  leaf: '<path d="M20 3C9 2 3 7 5 14s15 8 15-11ZM4 21 15 10"/>',
  link: '<path d="m10 13 4-4m-6 6-1 1a3.5 3.5 0 0 1-5-5l5-5a3.5 3.5 0 0 1 5 0m0 12a3.5 3.5 0 0 0 5 0l5-5a3.5 3.5 0 0 0-5-5l-1 1"/>',
  x: '<path d="m6 6 12 12M6 18 18 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  sparkles: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
  "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
  edit: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14Zm0 0h16"/>',
  file: '<path d="M14 2H5v20h14V7Zm0 0v5h5M8 12h8m-8 4h6"/>',
  list: '<path d="M9 6h12M9 12h12M9 18h12M3 6h1m-1 6h1m-1 6h1"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4Z"/>',
  trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
  volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  stop: '<rect x="5" y="5" width="14" height="14" rx="2"/>'
};

function renderIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((element) => {
    const path = iconPaths[element.dataset.icon];
    if (!path) return;
    element.outerHTML = `<svg class="icon${element.className ? ` ${element.className}` : ""}" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
  });
}

function iconSvg(name, extraClass = "") {
  const path = iconPaths[name] || "";
  return `<svg class="icon${extraClass ? ` ${extraClass}` : ""}" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
}

const STORAGE_KEY = "yousunsaeng_state_v11";
const DEFAULT_GEMINI_KEY = "";

const DEFAULT_CATEGORIES = [
  { id: "cat-prayer", name: "기도", color: "sage", privacy: "lock" },
  { id: "cat-faith", name: "믿음", color: "purple", privacy: "lock" },
  { id: "cat-unset", name: "미정", color: "gray", privacy: "lock", fixed: true }
];

const DEFAULT_TEMPLATES = [
  {
    id: "",
    name: "기본서식 (하늘을 찾는 사람 표준)",
    badge: "★ 기본 서식 · 미선택 시 자동 적용",
    badgeColor: "sage",
    desc: "[1] 요약 (영상 제목의 핵심 주제를 중심축으로 ## 대주제 → ### 소제목 + 정중체 문단) + [2] 핵심 (**굵은 핵심 소제목 (상징/원인)** + **핵심어** 볼드 강조 설명) 구조로 정리합니다.",
    chapterCount: 11,
    subsPerChapter: 2,
    keypointCount: 16,
    tone: "formal",
    isDefault: true,
    rules:
      "1. [1] 요약: 영상 제목의 핵심 주제(예: ## 기도해도 왜 영안은 열리지 않을까?)를 중심축으로 삼아 대주제와 소제목(###)을 구성하고 정중체(~합니다 / ~야 합니다) 문단으로 깊이 있게 서술\n" +
      "2. [2] 핵심: 모든 항목을 반드시 '**핵심 소제목 (성경적 상징/핵심 원인)** + 줄바꿈 + **핵심 키워드**가 볼드 강조된 1~2문장 설명'의 2단 구조로 정리",
    sections: [],
    previewSections: [
      "[1] 요약 — 영상 제목의 핵심 주제 중심 ## 대주제 / ### 소제목 + 정중체 문단",
      "[2] 핵심 — **핵심 소제목 (상징/원인)** + **핵심어** 볼드 강조 설명"
    ],
    builtin: true
  },
  {
    id: "bullets",
    name: "핵심 bullet형",
    badge: "빠른 핵심 파악",
    badgeColor: "amber",
    desc: "대주제·소주제별 핵심 문장을 가독성 높은 글머리 기호(• Bullet) 목록과 [2] 핵심 요점으로 정리합니다.",
    chapterCount: 4,
    subsPerChapter: 2,
    keypointCount: 10,
    tone: "formal",
    isDefault: false,
    rules:
      "1. 핵심 메시지 위주로 불필요한 수식어 생략\n" +
      "2. [1] 요약: 대주제 4개와 각 소주제를 글머리 기호(• Bullet) 문장으로 정리\n" +
      "3. [2] 핵심: 꼭 기억할 10가지 핵심 실천 포인트 도출",
    sections: [
      "1. 핵심 메시지 및 도입 맥락",
      "2. 주요 논점 및 핵심 포인트",
      "3. 실전 적용 및 변화",
      "4. 결론 및 실천 가이드"
    ],
    previewSections: [
      "[1] 요약 — 대주제(1.~4.) 및 소주제별 • Bullet 핵심 문장 정리",
      "[2] 핵심 — 1.~10. 번호형 핵심 요약 및 실천 포인트"
    ],
    builtin: true
  },
  {
    id: "report",
    name: "리포트형",
    badge: "깊이 있는 이해",
    badgeColor: "blue",
    desc: "배경 및 문제 정의부터 본론 분석, 결론 및 시사점까지 체계적인 보고서 구조로 정리합니다.",
    chapterCount: 4,
    subsPerChapter: 3,
    keypointCount: 12,
    tone: "formal",
    isDefault: false,
    rules:
      "1. 배경 및 문제 정의 → 주요 논리 분석 → 적용 사례 → 결론 및 시사점 4단계 구성\n" +
      "2. 각 소제목 아래 논거와 사례를 2~3문장 정중체 보고서 문단으로 서술\n" +
      "3. [2] 핵심: 12개 번호형 시사점 및 실행 과제 도출",
    sections: [
      "1. 배경 및 문제 정의",
      "2. 주요 논리와 핵심 분석",
      "3. 적용 사례 및 구체적 방법",
      "4. 결론 및 실천적 시사점"
    ],
    previewSections: [
      "[1] 요약 — 배경·본론·사례·결론 4단계 심층 리포트 문단",
      "[2] 핵심 — 1.~12. 번호형 핵심 시사점 정리"
    ],
    builtin: true
  },
  {
    id: "freeform",
    name: "자유형식 (나만의 맞춤 양식)",
    badge: "✨ 자유형식 · 제한 없음",
    badgeColor: "purple",
    desc: "고정된 대주제·소주제·핵심 개수 틀에 얽매이지 않고, 사용자가 작성한 양식과 프롬프트 지침 그대로 자유롭게 요약합니다.",
    chapterCount: 0,
    subsPerChapter: 0,
    keypointCount: 0,
    tone: "free",
    isFreeform: true,
    isDefault: false,
    rules:
      "1. [본문 말씀 및 핵심 주제]: 설교·강연에 등장한 중심 성경 구절(또는 핵심 화두)과 전체 주제를 한눈에 보이게 제시\n" +
      "2. [자유 구성 본문]: 고정된 번호 틀 없이 말씀의 흐름에 따라 서론·본론(핵심 메시지와 실제 예화)·결론으로 자연스럽고 깊이 있게 서술\n" +
      "3. [묵상 질문 및 삶의 적용]: 성도가 삶에서 돌아볼 질문 3가지와 구체적 실천·기도제목 정리",
    sections: [],
    previewSections: [
      "[자유 구성] 고정된 번호·개수 제한 없이 지정한 양식과 프롬프트 그대로 요약",
      "[맞춤 항목] 본문 구절 / 핵심 흐름과 예화 / 묵상 질문 및 기도제목 등 자유 배치"
    ],
    builtin: true
  }
];

const DEFAULT_ACCOUNTS = [
  { id: "acc-daehann", name: "daehann", handle: "daehann@gmail.com", provider: "GitHub", initial: "D", active: true },
  { id: "acc-1", name: "지식 수집가", handle: "collector@github.com", provider: "GitHub", initial: "J", active: false },
  { id: "acc-2", name: "Workspace Pro", handle: "namta@outlook.kr", provider: "Microsoft", initial: "W", active: false }
];

const API_BASE_URL = ["127.0.0.1", "localhost"].includes(location.hostname)
  ? location.origin : "http://127.0.0.1:8765";
const TRANSCRIPT_API_URL = `${API_BASE_URL}/api/transcript`;
const SUMMARIZE_API_URL = `${API_BASE_URL}/api/summarize`;
const SUMMARIZE_AUDIO_API_URL = `${API_BASE_URL}/api/summarize-audio`;
const TEST_AI_API_URL = `${API_BASE_URL}/api/test-ai`;
const STATE_API_URL = `${API_BASE_URL}/api/state`;
const GITHUB_CHECK_API_URL = `${API_BASE_URL}/api/github/check`;
const GITHUB_UPLOAD_API_URL = `${API_BASE_URL}/api/github/upload`;
const GITHUB_DEVICE_START_API_URL = `${API_BASE_URL}/api/github/device-start`;
const GITHUB_DEVICE_POLL_API_URL = `${API_BASE_URL}/api/github/device-poll`;
const GITHUB_PASSWORD_SESSION_KEY = "yousunsaeng_github_pat";
const GITHUB_PASSWORD_LOCAL_KEY = "yousunsaeng_github_pat_persistent";

function getStoredGithubToken() {
  return (
    sessionStorage.getItem(GITHUB_PASSWORD_SESSION_KEY) ||
    localStorage.getItem(GITHUB_PASSWORD_LOCAL_KEY) ||
    ""
  ).trim();
}

function setStoredGithubToken(token) {
  const clean = String(token || "").trim();
  if (clean) {
    sessionStorage.setItem(GITHUB_PASSWORD_SESSION_KEY, clean);
    localStorage.setItem(GITHUB_PASSWORD_LOCAL_KEY, clean);
  } else {
    sessionStorage.removeItem(GITHUB_PASSWORD_SESSION_KEY);
    localStorage.removeItem(GITHUB_PASSWORD_LOCAL_KEY);
  }
}

function parseGithubRepoTargetInBrowser(repoPath, fallbackUser = "daehann-svg", defaultBranch = "main", defaultSubpath = "") {
  const raw = String(repoPath || "").trim();
  const userClean = String(fallbackUser || "daehann-svg").trim() || "daehann-svg";
  let branch = String(defaultBranch || "main").trim() || "main";
  let subpath = String(defaultSubpath || "").trim().replace(/^\/+|\/+$/g, "");
  if (!raw) return { owner: userClean, repo: "yousunsaeng", branch, subpath };
  const cleaned = raw.replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\.git$/i, "").replace(/^\/+|\/+$/g, "");
  const parts = cleaned.split("/").filter(Boolean);
  if (parts.length >= 2) {
    const owner = parts[0];
    const repo = parts[1];
    if (parts.length >= 4 && (parts[2] === "tree" || parts[2] === "blob")) {
      branch = parts[3] || branch;
      if (parts.length > 4 && !subpath) subpath = parts.slice(4).join("/");
    }
    return { owner, repo, branch, subpath };
  }
  if (parts.length === 1) {
    return { owner: userClean, repo: parts[0], branch, subpath };
  }
  return { owner: userClean, repo: "yousunsaeng", branch, subpath };
}

function encryptAdminVault(plainObj, adminAcc) {
  const acc = adminAcc || getAdminAccount();
  const keyStr = `yousunsaeng-vault-v1:${acc.id}:${acc.passwordHash}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(plainObj));
  const key = encoder.encode(keyStr);
  let hex = "";
  for (let i = 0; i < data.length; i++) {
    const k = key[i % key.length] ^ ((i * 31 + 17) & 0xff);
    hex += (data[i] ^ k).toString(16).padStart(2, "0");
  }
  return hex;
}

function decryptAdminVault(hexStr, adminAcc) {
  if (!hexStr || typeof hexStr !== "string" || hexStr.length % 2 !== 0) return null;
  try {
    const acc = adminAcc || getAdminAccount();
    const keyStr = `yousunsaeng-vault-v1:${acc.id}:${acc.passwordHash}`;
    const encoder = new TextEncoder();
    const key = encoder.encode(keyStr);
    const out = new Uint8Array(hexStr.length / 2);
    for (let i = 0; i < out.length; i++) {
      const b = parseInt(hexStr.slice(i * 2, i * 2 + 2), 16);
      const k = key[i % key.length] ^ ((i * 31 + 17) & 0xff);
      out[i] = b ^ k;
    }
    const jsonStr = new TextDecoder().decode(out);
    return JSON.parse(jsonStr);
  } catch (e) {
    return null;
  }
}

function unlockAdminVaultInBrowser() {
  if (!isAdminLoggedIn() || !state.encryptedAdminVault) return false;
  const vault = decryptAdminVault(state.encryptedAdminVault);
  if (!vault || typeof vault !== "object") return false;
  let unlocked = false;
  if (vault.apiKey && !state.apiKey) {
    state.apiKey = vault.apiKey;
    unlocked = true;
  }
  if (vault.modelApiKeys && typeof vault.modelApiKeys === "object") {
    if (!state.modelApiKeys || typeof state.modelApiKeys !== "object") {
      state.modelApiKeys = {};
    }
    Object.entries(vault.modelApiKeys).forEach(([k, v]) => {
      if (v && !state.modelApiKeys[k]) {
        state.modelApiKeys[k] = v;
        unlocked = true;
      }
    });
  }
  if (vault.githubToken && !getStoredGithubToken()) {
    setStoredGithubToken(vault.githubToken);
    unlocked = true;
  }
  if (unlocked) {
    syncAiModelInputsUI();
    syncGithubConfigUI();
  }
  return unlocked;
}

function buildSanitizedPublicStateObject(rawState) {
  const src = rawState || state;
  const copy = SummarySync.clone(SummarySync.persistent(src));
  const ghToken = getStoredGithubToken();
  const hasSecrets =
    Boolean(src.apiKey) ||
    Boolean(ghToken) ||
    Boolean(src.modelApiKeys && Object.values(src.modelApiKeys).some(Boolean));
  if (hasSecrets) {
    copy.encryptedAdminVault = encryptAdminVault({
      apiKey: src.apiKey || "",
      modelApiKeys: src.modelApiKeys || {},
      githubToken: ghToken || ""
    });
  } else if (src.encryptedAdminVault) {
    copy.encryptedAdminVault = src.encryptedAdminVault;
  }
  copy.apiKey = "";
  copy.kakaoJsKey = "";
  if (copy.modelApiKeys && typeof copy.modelApiKeys === "object") {
    Object.keys(copy.modelApiKeys).forEach((k) => {
      copy.modelApiKeys[k] = "";
    });
  }
  if (copy.githubConfig && typeof copy.githubConfig === "object") {
    delete copy.githubConfig.password;
  }
  if (copy.adminAccount && typeof copy.adminAccount === "object") {
    delete copy.adminAccount.password;
  }
  copy._revision = rawState?._revision || state?._revision || 1;
  return copy;
}

async function pushWebStateToGithubRepo(stateToSave, customCommitMessage = "") {
  const token = getStoredGithubToken();
  if (!token) {
    return { ok: false, skipped: true, reason: "no_token" };
  }
  const cfg = state.githubConfig || {};
  const target = parseGithubRepoTargetInBrowser(
    cfg.repoPath || "https://github.com/daehann-svg/yousunsaeng",
    cfg.username || "daehann-svg",
    cfg.branch || "main",
    cfg.subpath || ""
  );
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json"
  };
  const repoApiBase = `https://api.github.com/repos/${encodeURIComponent(target.owner)}/${encodeURIComponent(target.repo)}`;
  const remoteDbPath = target.subpath ? `${target.subpath}/summaries_db.json` : "summaries_db.json";

  // 1. Get latest commit SHA on branch
  const refRes = await fetch(`${repoApiBase}/git/ref/heads/${encodeURIComponent(target.branch)}`, { headers, cache: "no-store" });
  if (!refRes.ok) {
    throw new Error(`GitHub 브랜치 조회 실패 (HTTP ${refRes.status})`);
  }
  const refData = await refRes.json();
  const latestCommitSha = refData?.object?.sha;
  if (!latestCommitSha) throw new Error("GitHub 최신 커밋 SHA를 확인하지 못했습니다.");

  // 2. Get base tree SHA
  const commitRes = await fetch(`${repoApiBase}/git/commits/${latestCommitSha}`, { headers, cache: "no-store" });
  if (!commitRes.ok) throw new Error(`GitHub 커밋 트리 조회 실패 (HTTP ${commitRes.status})`);
  const commitData = await commitRes.json();
  const baseTreeSha = commitData?.tree?.sha;

  // 3. Create UTF-8 blob for summaries_db.json (supports files >1MB up to 100MB via CORS)
  const sanitizedObj = buildSanitizedPublicStateObject(stateToSave);
  const jsonContent = JSON.stringify(sanitizedObj, null, 2);
  const blobRes = await fetch(`${repoApiBase}/git/blobs`, {
    method: "POST",
    headers,
    body: JSON.stringify({ content: jsonContent, encoding: "utf-8" })
  });
  if (!blobRes.ok) throw new Error(`GitHub DB 데이터 업로드 실패 (HTTP ${blobRes.status})`);
  const blobData = await blobRes.json();

  // 4. Create new tree
  const treeRes = await fetch(`${repoApiBase}/git/trees`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: [{ path: remoteDbPath, mode: "100644", type: "blob", sha: blobData.sha }]
    })
  });
  if (!treeRes.ok) throw new Error(`GitHub 트리 생성 실패 (HTTP ${treeRes.status})`);
  const treeData = await treeRes.json();

  // 5. Create commit & update branch ref
  const commitMsg = customCommitMessage || `chore: 웹에서 You선생 요약 데이터 저장 (총 ${(sanitizedObj.summaries || []).length}개)`;
  const newCommitRes = await fetch(`${repoApiBase}/git/commits`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      message: commitMsg,
      tree: treeData.sha,
      parents: [latestCommitSha]
    })
  });
  if (!newCommitRes.ok) throw new Error(`GitHub 커밋 생성 실패 (HTTP ${newCommitRes.status})`);
  const newCommitData = await newCommitRes.json();

  const updateRefRes = await fetch(`${repoApiBase}/git/refs/heads/${encodeURIComponent(target.branch)}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ sha: newCommitData.sha, force: false })
  });
  if (!updateRefRes.ok) throw new Error(`GitHub 브랜치 반영 실패 (HTTP ${updateRefRes.status})`);

  return {
    ok: true,
    owner: target.owner,
    repo: target.repo,
    branch: target.branch,
    commitSha: String(newCommitData.sha || "").slice(0, 7),
    pagesUrl: `https://${target.owner}.github.io/${target.repo}/`
  };
}

function isGarbageScriptSegmentText(text) {
  const t = String(text || "").trim();
  if (!t) return true;
  if (t.length > 5000 && (t.includes("function(") || t.includes("ytcfg") || t.includes("Polymer"))) return true;
  return (
    t.includes("window.WIZ_global_data") ||
    t.includes("window.ytcfg") ||
    t.includes("ytcfg.set(") ||
    t.includes("window.onerror") ||
    t.includes("window.Polymer") ||
    t.includes("window.ytcsi") ||
    t.includes("window.ytplayer") ||
    t.includes("setMessage({") ||
    t.includes("ytimg.preload") ||
    t.includes("onPolymerReady") ||
    t.includes("_getExtendedNativePrototype") ||
    t.includes("youtube.web-front-end") ||
    t.includes("EMERGENCY_BASE_URL") ||
    t.includes("<!DOCTYPE") ||
    t.includes("SPDX-License-Identifier") ||
    t.includes("Closure Library Authors")
  );
}

function askUserForAudioFallback(videoTitle = "YouTube 영상", videoUrl = "") {
  return new Promise((resolve) => {
    const modal = document.getElementById("audio-fallback-modal");
    if (!modal) {
      const ok = window.confirm(
        `‘${videoTitle}’ 영상은 자막이 제공되지 않습니다.\n오디오(음성) 파일을 추출하여 AI로 요약하시겠습니까?`
      );
      resolve({ useAudio: ok, audioBase64: "", audioMimeType: "" });
      return;
    }
    const descEl = document.getElementById("audio-fallback-desc");
    if (descEl) {
      descEl.textContent = `‘${videoTitle}’ 영상은 유튜브 자막이 제공되지 않습니다. 오디오(음성) 파일을 지원하여 AI가 직접 듣고 요약하도록 진행하시겠습니까?`;
    }
    const fileInput = document.getElementById("audio-fallback-file-input");
    const fileLabel = document.getElementById("audio-fallback-file-label");
    if (fileInput) fileInput.value = "";
    if (fileLabel) {
      fileLabel.textContent = "파일을 선택하지 않으면 방법 1(유튜브 오디오 자동 추출)로 진행됩니다.";
    }

    const onFileChange = () => {
      const f = fileInput?.files?.[0];
      if (fileLabel) {
        fileLabel.textContent = f
          ? `선택된 오디오 파일: ${f.name} (${(f.size / (1024 * 1024)).toFixed(1)}MB)`
          : "파일을 선택하지 않으면 방법 1(유튜브 오디오 자동 추출)로 진행됩니다.";
      }
    };
    fileInput?.addEventListener("change", onFileChange);

    const cleanup = () => {
      fileInput?.removeEventListener("change", onFileChange);
      confirmBtn?.removeEventListener("click", onConfirm);
      skipBtn?.removeEventListener("click", onSkip);
      cancelX?.removeEventListener("click", onSkip);
      if (modal.open) modal.close();
    };

    const confirmBtn = document.getElementById("audio-fallback-confirm-btn");
    const skipBtn = document.getElementById("audio-fallback-skip-btn");
    const cancelX = document.getElementById("audio-fallback-cancel-x");

    const onConfirm = () => {
      const f = fileInput?.files?.[0];
      if (f) {
        const reader = new FileReader();
        reader.onload = () => {
          cleanup();
          resolve({
            useAudio: true,
            audioBase64: String(reader.result || ""),
            audioMimeType: f.type || "audio/mp4"
          });
        };
        reader.onerror = () => {
          cleanup();
          resolve({ useAudio: true, audioBase64: "", audioMimeType: "" });
        };
        reader.readAsDataURL(f);
      } else {
        cleanup();
        resolve({ useAudio: true, audioBase64: "", audioMimeType: "" });
      }
    };

    const onSkip = () => {
      cleanup();
      resolve({ useAudio: false, audioBase64: "", audioMimeType: "" });
    };

    confirmBtn?.addEventListener("click", onConfirm);
    skipBtn?.addEventListener("click", onSkip);
    cancelX?.addEventListener("click", onSkip);
    modal.showModal();
  });
}

async function summarizeYoutubeOrAudioViaBrowserGemini({
  url,
  title,
  channel,
  ratio,
  tplObj,
  customSections,
  audioBase64 = "",
  audioMimeType = ""
}) {
  const key = (getSelectedModelApiKey() || state.modelApiKeys?.["free-gemini"] || state.apiKey || "").trim();
  if (!key || (!key.startsWith("AIza") && !key.startsWith("AQ."))) {
    throw new Error("웹에서 유튜브 영상·오디오 AI 직접 요약을 사용하려면 Gemini API Key가 필요합니다.");
  }
  const r = Math.max(10, Math.min(70, Number(ratio) || 30));
  const isFreeform = Boolean(tplObj.isFreeform) || Number(tplObj.chapterCount) === 0 || String(tplObj.name || "").includes("자유");
  const baseChapters = Number(tplObj.chapterCount || 11);
  const baseSubs = Number(tplObj.subsPerChapter || 2);
  const chapterCount = isFreeform
    ? 0
    : customSections && customSections.length
    ? customSections.length
    : Math.max(3, Math.min(12, Math.round(baseChapters * (r / 30))));
  const subsPerChapter = isFreeform ? 0 : r <= 10 ? 1 : r <= 30 ? 2 : Math.min(4, baseSubs + 1);
  const cleanTitleTheme = String(title || "핵심 주제").split(/\s*[|｜]\s*/)[0].trim();
  const baseRules = String(tplObj.rules || tplObj.body || "");

  const sysPrompt = `당신은 설교·강연 유튜브 영상을 깊이 있고 충실한 아티클로 요약하는 전문 에디터입니다.
반드시 아래 JSON 스키마로만 응답하세요:
{
  "docTitle": "${cleanTitleTheme}",
  "chapters": [
    {
      "num": "1",
      "title": "${cleanTitleTheme}",
      "subs": [
        {
          "code": "",
          "title": "소제목",
          "body": "구체적인 성경 본문과 배경을 설명하는 첫 문장입니다. 설교자가 든 실제 예화와 핵심 원리를 짚어 주는 두 번째 문장입니다. 삶에서 결단해야 할 방향을 제시하는 세 번째 문장입니다."
        }
      ]
    }
  ],
  "keypoints": [
    "**핵심 소제목 (성경적 상징/핵심 원인)**\\n구체적인 이유와 **핵심 키워드**가 볼드(**) 강조된 1~2문장 설명"
  ],
  "transcriptSegments": [
    { "time": "00:00", "text": "영상의 주요 발언 요약 스크립트" }
  ]
}
- [1] 요약(chapters): ${isFreeform ? "자유형식 지침에 따라" : `대주제 ${chapterCount}개, 각 대주제당 소제목 ${subsPerChapter}~3개로`} 정중체(~합니다) 3문장 문단으로 깊이 있게 작성하세요.
- [2] 핵심(keypoints): **핵심 소제목 (상징/원인)** + 줄바꿈 + **핵심 키워드** 볼드 강조 설명 구조로 10~16개 작성하세요.
- transcriptSegments: 영상 흐름에 따른 주요 구간별 발언(10~25개 구간)을 시간과 함께 기록하세요.
${baseRules}`;

  const mediaPart = audioBase64
    ? {
        inlineData: {
          mimeType: audioMimeType || "audio/mp4",
          data: audioBase64.includes(",") ? audioBase64.split(",", 2)[1] : audioBase64
        }
      }
    : {
        fileData: {
          fileUri: url,
          mimeType: "video/mp4"
        }
      };

  const models = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-2.5-flash", "gemini-3.8-flash"];
  let lastErr = "";
  for (const m of models) {
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(240000),
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: sysPrompt }] },
          contents: [
            {
              role: "user",
              parts: [
                mediaPart,
                {
                  text: `영상 제목: ${title}\n채널명: ${channel}\n요약률: ${r}%\n서식: ${tplObj.name || "기본서식"}\n위 영상을 분석하여 JSON 형식으로 요약본(chapters, keypoints, transcriptSegments)을 작성해 주세요.`
                }
              ]
            }
          ],
          generationConfig: { temperature: 0.3, responseMimeType: "application/json" }
        })
      });
      if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({}));
        lastErr = errJson?.error?.message || `HTTP ${resp.status}`;
        continue;
      }
      const rJson = await resp.json();
      const parts = rJson?.candidates?.[0]?.content?.parts || [];
      const rawText = parts.find((p) => p.text)?.text || "";
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) continue;
      const parsed = JSON.parse(match[0]);
      if (parsed && Array.isArray(parsed.chapters) && parsed.chapters.length) {
        const segs = Array.isArray(parsed.transcriptSegments) && parsed.transcriptSegments.length
          ? parsed.transcriptSegments.map((s, idx) => ({
              start: idx * 15,
              time: s.time || `${String(Math.floor((idx * 15) / 60)).padStart(2, "0")}:${String((idx * 15) % 60).padStart(2, "0")}`,
              duration: 15,
              text: s.text || ""
            }))
          : parsed.chapters.flatMap((c, idx) =>
              (c.subs || []).map((sub, sIdx) => ({
                start: (idx * 3 + sIdx) * 20,
                time: `${String(idx * 2 + sIdx).padStart(2, "0")}:00`,
                duration: 20,
                text: `${sub.title ? `[${sub.title}] ` : ""}${sub.body || ""}`
              }))
            );
        return {
          ok: true,
          engine: `${m} (웹 유튜브 직접 AI 요약)`,
          title: parsed.docTitle || title,
          channel,
          segments: segs,
          html: renderHanaroChaptersHtml(parsed.chapters, r, tplObj.name, parsed.docTitle || title),
          takeaways: parsed.keypoints || [],
          outline: parsed.chapters.map((c) => c.title),
          excerpt: parsed.chapters[0]?.subs?.[0]?.body?.slice(0, 115) || `${channel}의 ‘${title}’ 웹 AI 요약본입니다.`,
          quality: {
            method: "web-youtube-direct-ai",
            sourceChars: segs.reduce((n, s) => n + (s.text || "").length, 0),
            notice: "웹 브라우저에서 Gemini AI가 유튜브 영상을 직접 분석하여 생성한 요약본입니다."
          }
        };
      }
    } catch (e) {
      lastErr = e.message;
    }
  }
  throw new Error(lastErr || "웹 브라우저 유튜브 AI 직접 요약에 실패했습니다.");
}

async function runAudioSummarizationViaServer({
  url,
  title,
  channel,
  ratio,
  templateName,
  customSections,
  audioBase64 = "",
  audioMimeType = ""
}) {
  const r = Number(ratio) || 30;
  const tplObj = findTemplateObject(templateName);
  const effectiveSections =
    customSections && customSections.length
      ? customSections
      : Array.isArray(tplObj.sections) && tplObj.sections.length
      ? tplObj.sections
      : null;

  const isStaticWebMode = document.body.classList.contains("static-public-mode") && location.port !== "18765";
  if (isStaticWebMode) {
    return await summarizeYoutubeOrAudioViaBrowserGemini({
      url,
      title,
      channel,
      ratio: r,
      tplObj,
      customSections: effectiveSections,
      audioBase64,
      audioMimeType
    });
  }

  let res;
  try {
    res = await fetch(SUMMARIZE_AUDIO_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(600000),
      body: JSON.stringify({
        url,
        title,
        channel,
        ratio: r,
        customSections: effectiveSections,
        audioBase64,
        audioMimeType,
        aiModel: state.selectedAiModel,
        templateType: tplObj.name,
        apiKey: getSelectedModelApiKey(),
        algorithmConfig: {
          isFreeform: Boolean(tplObj.isFreeform) || Number(tplObj.chapterCount) === 0 || String(tplObj.name || "").includes("자유"),
          chapterCount: tplObj.isFreeform ? 0 : (tplObj.chapterCount ?? 11),
          subsPerChapter: tplObj.isFreeform ? 0 : (tplObj.subsPerChapter ?? 2),
          keypointCount: tplObj.isFreeform ? 0 : (tplObj.keypointCount ?? 16),
          tone: tplObj.tone || "formal",
          rules: tplObj.rules || tplObj.body || ""
        }
      })
    });
  } catch (networkErr) {
    if (location.port === "18765") throw networkErr;
    return await summarizeYoutubeOrAudioViaBrowserGemini({
      url,
      title,
      channel,
      ratio: r,
      tplObj,
      customSections: effectiveSections,
      audioBase64,
      audioMimeType
    });
  }
  const data = await res.json();
  if (res.ok && data && data.ok && Array.isArray(data.chapters)) {
    return {
      ok: true,
      engine: data.engine || "Gemini Audio AI",
      title: data.title || title,
      channel: data.channel || channel,
      segments: data.segments || [],
      html: renderHanaroChaptersHtml(data.chapters, r, tplObj.name, data.docTitle || data.title || title),
      takeaways: data.keypoints || [],
      outline: data.outline || data.chapters.map((c) => c.title),
      excerpt: data.excerpt || `${channel}의 ‘${title}’ 오디오 AI 분석 요약본입니다.`,
      quality: data.quality
    };
  }
  throw new Error(data?.error || "오디오 AI 요약에 실패했습니다.");
}

function extractYoutubeVideoId(url) {
  const s = String(url || "").trim();
  const m = s.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : "";
}

function parseTimeToSeconds(timeStr) {
  const parts = String(timeStr || "00:00")
    .split(":")
    .map((n) => Number(n) || 0);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

function getDefaultTemplate() {
  if (typeof state !== "undefined" && Array.isArray(state.templates)) {
    return state.templates.find((t) => t.isDefault) || state.templates.find((t) => t.id === "") || state.templates[0] || DEFAULT_TEMPLATES[0];
  }
  return DEFAULT_TEMPLATES[0];
}

function findTemplateObject(templateIdOrName = "") {
  if (!Array.isArray(state?.templates) || !state.templates.length) return DEFAULT_TEMPLATES[0];
  if (!templateIdOrName) return getDefaultTemplate();
  if (templateIdOrName === "__builtin__") return state.templates.find(t => t.id === "") || DEFAULT_TEMPLATES[0];
  return (
    state.templates.find((t) => t.id === templateIdOrName || t.name === templateIdOrName) ||
    getDefaultTemplate()
  );
}

function getSelectedModelApiKey() {
  const model = state.selectedAiModel || "free-gemini";
  if (state.modelApiKeys && typeof state.modelApiKeys === "object") {
    return (state.modelApiKeys[model] || "").trim();
  }
  return (state.apiKey || "").trim() || DEFAULT_GEMINI_KEY;
}

async function summarizeDirectlyViaBrowserGemini(segments, title, channel, ratio, tplObj, customSections, apiKey, extraCommand = "") {
  const key = (apiKey || DEFAULT_GEMINI_KEY).trim();
  if (!key || !segments || !segments.length) return null;

  const r = Math.max(10, Math.min(70, Number(ratio) || 30));
  const extraClean = String(extraCommand || "").trim();
  const isFreeform = Boolean(tplObj.isFreeform) || Number(tplObj.chapterCount) === 0 || String(tplObj.name || "").includes("자유") || Boolean(extraClean);
  const baseChapters = Number(tplObj.chapterCount || 11);
  const baseSubs = Number(tplObj.subsPerChapter || 2);
  const baseKp = Number(tplObj.keypointCount || 16);

  const chapterCount = isFreeform
    ? 0
    : customSections && customSections.length
    ? customSections.length
    : Math.max(3, Math.min(14, Math.round(baseChapters * (r / 30))));
  const subsPerChapter = isFreeform ? 0 : r <= 10 ? 1 : r <= 30 ? 2 : Math.min(4, baseSubs + 1);
  const kpCount = isFreeform ? 0 : Math.max(5, Math.min(20, Math.round(baseKp * (r / 30))));

function extractCoreTitleTheme(videoTitle = "") {
  const raw = String(videoTitle || "").trim();
  if (!raw) return "핵심 주제";
  let firstPart = raw.split(/\s*[|｜]\s*/)[0].trim();
  firstPart = firstPart.replace(/^(?:\[[^\]]+\]\s*|\d+\.\s*)+/, "").trim();
  const qMatch = firstPart.match(/^(.+?[?!])\s*(.*)$/);
  if (qMatch && qMatch[1].trim().length >= 8) {
    return qMatch[1].trim();
  }
  return firstPart;
}

  const baseRules = String(tplObj.rules || tplObj.body || "").replace(/굵은\s*글씨\s*없이[^\n]*/g, "");
  const customRules = extraClean
    ? `${baseRules}\n\n[사용자 추가 요약·편집 명령어 (최우선 반영)]\n${extraClean}`.trim()
    : baseRules;
  const rulesNote = customRules ? `\n\n[사용자 지정 서식 상세 규칙]\n${customRules}` : "";
  const cleanTitleTheme = extractCoreTitleTheme(title);
  const kpRuleText = `- [2] 핵심(keypoints): 서식 종류와 관계없이 모든 항목을 반드시 "**핵심 소제목 (성경적 상징/핵심 원인/핵심 개념)**\\n구체적인 이유와 **핵심 키워드**가 볼드(**) 강조된 1~2문장 설명"의 2단 구조로 작성하세요.`;
  const sysPrompt = isFreeform
    ? `당신은 설교·강연 유튜브 영상과 스크립트를 가장 깊이 있고 충실한 아티클로 요약하는 전문 에디터입니다.
사용자가 자유형식(Free-form) 서식을 선택했습니다. 영상 제목의 핵심 주제('${cleanTitleTheme}')를 본문의 첫 대주제(##) 및 중심축으로 삼고 아래 사용자 양식 지침을 최우선으로 따라 구성하세요.${rulesNote}
- 번호가 불필요한 섹션은 num을 ""(빈 문자열)로 두고, 소제목이 불필요한 문단은 subs의 title을 ""로 두어 본문(body)을 깊이 있게 작성하세요.
${kpRuleText}
JSON 응답 스키마:
{"docTitle":"제목","isFreeform":true,"chapters":[{"num":"","title":"${cleanTitleTheme}","subs":[{"code":"","title":"항목명(생략가능)","body":"자유 양식 본문"}]}],"keypoints":["**성령의 감화와 감동의 부재 (금촛대)**\\n아무리 깊이 기도하고 학식이 높아도 **성령님의 지혜와 감동**이 없으면 영안이 열리지 않고 예수를 주로 시인할 수 없습니다."]}`
    : `당신은 설교·강연 유튜브 영상과 스크립트를 가장 깊이 있고 충실한 아티클로 요약하는 전문 에디터입니다.
주어진 설교·강연 스크립트를 정밀하게 분석하여 아래 JSON 형식으로만 응답하세요.${rulesNote}
- 단순 시간순 나열이 아니라, 영상 제목의 핵심 주제('${cleanTitleTheme}')를 첫 번째 대주제(## 1. ${cleanTitleTheme})로 세우고, 본문 전체를 이 주제의 원인·성경적 상징·비유·실제 예화·해답 중심으로 깊이 있게 요약하세요.
- [1] 요약(chapters): 영상 제목의 주제를 중심으로 전체를 ${chapterCount}개 대주제(num: "1"~"${chapterCount}")로 나누고, 각 대주제 아래 번호 없는 소제목(subs) ${subsPerChapter}~3개를 둔 뒤 정중체('~합니다.', '~야 합니다.', '~입니다.')로 완결된 밀도 있는 3~4문장(성경적 근거 + 구체적 예화/설명 + 삶의 적용)으로 본문(body)을 작성하세요.
${kpRuleText}
JSON 응답 스키마:
{"docTitle":"제목","chapters":[{"num":"1","title":"${cleanTitleTheme}","subs":[{"code":"","title":"소제목","body":"구체적인 성경 본문과 배경을 설명하는 첫 문장입니다. 설교자가 든 실제 예화와 핵심 원리를 짚어 주는 두 번째 문장입니다. 이를 통해 성도가 삶에서 결단해야 할 방향을 제시하는 세 번째 문장입니다."}]}],"keypoints":["**성령의 감화와 감동의 부재 (금촛대)**\\n아무리 깊이 기도하고 학식이 높아도 **성령님의 지혜와 감동**이 없으면 영안이 열리지 않고 예수를 주로 시인할 수 없습니다."]}`;

  const cleanText = segments
    .map((s) => (s.text || "").trim())
    .filter((t) => t && !/^\[(음악|박수|웃음)\]$/.test(t))
    .join(" ")
    .slice(0, 50000);

  const userPrompt = `영상 제목: ${title}\n본문 요약의 핵심 주제(첫 대주제 제목): ${cleanTitleTheme}\n채널명: ${channel}\n요약률: ${r}%\n\n[필수 지시] 서론의 배경 설명보다 영상 제목의 핵심 주제인 '${cleanTitleTheme}'에 대한 원인·성경적 상징·해답 중심으로 본문([1] 요약)과 [2] 핵심(**소제목 (상징/원인)**\\n**핵심어** 강조 설명)을 작성하세요.\n\n[스크립트 원문]\n${cleanText}`;
  const models = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-3.1-flash-lite", "gemini-3.8-flash"];

  for (const m of models) {
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: sysPrompt }] },
          contents: [{ role: "user", parts: [{ text: userPrompt }] }],
          generationConfig: { temperature: 0.3, responseMimeType: "application/json" }
        })
      });
      if (!resp.ok) continue;
      const rJson = await resp.json();
      const parts = rJson?.candidates?.[0]?.content?.parts || [];
      const rawText = parts.find((p) => p.text)?.text || "";
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) continue;
      const parsed = JSON.parse(match[0]);
      if (parsed && Array.isArray(parsed.chapters) && parsed.chapters.length) {
        return {
          engine: `${m} (GitHub/Mobile Direct)`,
          html: renderHanaroChaptersHtml(parsed.chapters, r, tplObj.name, parsed.docTitle || title),
          takeaways: parsed.keypoints || [],
          outline: parsed.chapters.map((c) => c.title),
          excerpt: parsed.chapters[0]?.subs?.[0]?.body?.slice(0, 115) || title
        };
      }
    } catch (e) {
      // try next model
    }
  }
  return null;
}

function parseExhaustiveMarkdownInBrowser(segments, title = "전체 항목 요약", templateName = "자유형식") {
  const lines = (segments || []).map((s) => String(s.text || "").trim()).filter(Boolean);
  const h3Count = lines.filter((ln) => ln.startsWith("### ") || /^#?\d+\.\s*\[/.test(ln)).length;
  if (h3Count < 15) return null;

  const cleanMd = (s) => String(s || "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/`/g, "").trim();
  const chapters = [];
  let curChapter = null;
  let curSub = null;
  let docTitle = title;

  for (const ln of lines) {
    if (ln === "---" || ln.startsWith("----")) continue;
    if (ln.startsWith("# ") && !ln.startsWith("## ")) {
      docTitle = cleanMd(ln.slice(2));
      continue;
    }
    if (ln.startsWith("## ")) {
      const rawH2 = cleanMd(ln.slice(3));
      const mNum = rawH2.match(/^(\d+)\.\s*(.+)$/);
      curChapter = {
        num: mNum ? mNum[1] : String(chapters.length + 1),
        title: mNum ? mNum[2] : rawH2,
        subs: []
      };
      chapters.push(curChapter);
      curSub = null;
      continue;
    }
    if (ln.startsWith("### ") || /^#\d+\.\s*\[/.test(ln)) {
      const rawH3 = cleanMd(ln.replace(/^#+\s*/, ""));
      if (!curChapter) {
        curChapter = { num: "1", title: "전체 항목 정리", subs: [] };
        chapters.push(curChapter);
      }
      curSub = { code: "", title: rawH3, bodyLines: [] };
      curChapter.subs.push(curSub);
      continue;
    }
    const cleaned = cleanMd(ln);
    if (curSub) {
      curSub.bodyLines.push(cleaned);
    } else if (curChapter) {
      if (!curChapter.subs.length) {
        curSub = { code: "", title: "기본 구성 및 안내", bodyLines: [cleaned] };
        curChapter.subs.push(curSub);
      } else {
        curChapter.subs[curChapter.subs.length - 1].bodyLines.push(cleaned);
      }
    }
  }

  let totalSubs = 0;
  chapters.forEach((ch) => {
    ch.subs.forEach((sub) => {
      const bLines = sub.bodyLines || [];
      delete sub.bodyLines;
      sub.body = bLines.join("\n").trim() || sub.title;
      sub.bullets = bLines.length ? bLines : [sub.body];
      totalSubs++;
    });
  });

  if (totalSubs < 15) return null;
  const finalDocTitle =
    docTitle && docTitle !== "직접 입력한 스크립트 요약"
      ? docTitle
      : `전체 ${totalSubs}개 항목 정리`;
  const keypoints = [
    `원고에서 인식한 ${chapters.length}개 대분류 · ${totalSubs}개 항목을 정리했습니다.`,
    "AI 재요약이 아닌 구조화 원고의 항목별 재배치 결과입니다.",
    ...chapters.slice(0, 10).map((c) => `[${c.title}] 파트의 세부 항목 ${c.subs.length}개가 수록되어 있습니다.`)
  ];

  return {
    engine: `원고 구조 파싱 (${totalSubs}개 항목)`,
    html: renderHanaroChaptersHtml(chapters, 70, templateName, finalDocTitle),
    takeaways: keypoints,
    outline: chapters.map((c) => `${c.title} (${c.subs.length}개)`),
    excerpt: chapters[0]?.subs?.[0]?.body?.slice(0, 115) || finalDocTitle
  };
}

async function summarizeDirectlyViaBrowserOpenAIOrGithub(segments, title, channel, ratio, tplObj, customSections, apiKey, extraCommand = "") {
  const key = (apiKey || getStoredGithubToken() || "").trim();
  if (!key || !segments || !segments.length) return null;
  const isGhToken = /^(ghp_|github_pat_|ghu_|gho_)/.test(key);
  const isOpenAiKey = key.startsWith("sk-") && !key.startsWith("sk-ant-");
  if (!isGhToken && !isOpenAiKey) return null;

  const r = Math.max(10, Math.min(70, Number(ratio) || 30));
  const extraClean = String(extraCommand || "").trim();
  const isFreeform = Boolean(tplObj.isFreeform) || Number(tplObj.chapterCount) === 0 || String(tplObj.name || "").includes("자유") || Boolean(extraClean);
  const baseChapters = Number(tplObj.chapterCount || 11);
  const baseSubs = Number(tplObj.subsPerChapter || 2);
  const chapterCount = isFreeform
    ? 0
    : customSections && customSections.length
    ? customSections.length
    : Math.max(3, Math.min(14, Math.round(baseChapters * (r / 30))));
  const subsPerChapter = isFreeform ? 0 : r <= 10 ? 1 : r <= 30 ? 2 : Math.min(4, baseSubs + 1);

  const cleanTitleTheme = String(title || "핵심 주제").split(/\s*[|｜]\s*/)[0].trim();
  const baseRules = String(tplObj.rules || tplObj.body || "");
  const customRules = extraClean ? `${baseRules}\n\n[사용자 추가 요약·편집 명령어]\n${extraClean}`.trim() : baseRules;
  const sysPrompt = `당신은 설교·강연 유튜브 영상과 스크립트를 깊이 있게 요약하는 전문 에디터입니다.
반드시 아래 JSON 스키마로만 응답하세요:
{"docTitle":"제목","chapters":[{"num":"1","title":"${cleanTitleTheme}","subs":[{"code":"","title":"소제목","body":"정중체(~합니다) 3문장 요약 본문"}]}],"keypoints":["**핵심 소제목 (상징/원인)**\\n**핵심어**가 볼드 강조된 1~2문장 설명"]}
${isFreeform ? "자유형식 지침을 최우선으로 따르세요." : `대주제 ${chapterCount}개, 대주제당 소제목 ${subsPerChapter}개로 구성하세요.`}\n${customRules}`;

  const cleanText = segments
    .map((s) => (s.text || "").trim())
    .filter((t) => t && !/^\[(음악|박수|웃음)\]$/.test(t))
    .join(" ")
    .slice(0, 45000);

  const endpoint = isGhToken
    ? "https://models.inference.ai.azure.com/chat/completions"
    : "https://api.openai.com/v1/chat/completions";
  const modelName = isGhToken ? "gpt-4o" : "gpt-4o-mini";

  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelName,
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: sysPrompt },
          { role: "user", content: `영상 제목: ${title}\n채널: ${channel}\n요약률: ${r}%\n\n[스크립트 원문]\n${cleanText}` }
        ]
      })
    });
    if (!resp.ok) return null;
    const rJson = await resp.json();
    const content = rJson?.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(content);
    if (parsed && Array.isArray(parsed.chapters) && parsed.chapters.length) {
      return {
        engine: `${modelName} (웹 브라우저 직접 요약)`,
        html: renderHanaroChaptersHtml(parsed.chapters, r, tplObj.name, parsed.docTitle || title),
        takeaways: parsed.keypoints || [],
        outline: parsed.chapters.map((c) => c.title),
        excerpt: parsed.chapters[0]?.subs?.[0]?.body?.slice(0, 115) || title,
        quality: {
          method: "web-browser-ai",
          sourceChars: cleanText.length,
          notice: "웹 브라우저에서 AI API로 직접 생성한 요약본입니다."
        }
      };
    }
  } catch (e) {
    // fallback to next engine
  }
  return null;
}

async function runWebBrowserSummarizationFallback({
  segments,
  title,
  channel,
  ratio,
  tplObj,
  effectiveSections,
  extraClean,
  aiModelLabel,
  videoUrl
}) {
  const apiKey = getSelectedModelApiKey();
  // 1. Try Browser Direct Gemini API
  if (apiKey && (apiKey.startsWith("AIza") || apiKey.startsWith("AQ."))) {
    const geminiRes = await summarizeDirectlyViaBrowserGemini(
      segments,
      title,
      channel,
      ratio,
      tplObj,
      effectiveSections,
      apiKey,
      extraClean
    );
    if (geminiRes && geminiRes.html) {
      geminiRes.quality = geminiRes.quality || {
        method: "web-browser-gemini",
        sourceChars: segments.reduce((n, s) => n + (s.text || "").length, 0),
        notice: "웹 브라우저에서 Gemini AI로 직접 생성한 요약본입니다."
      };
      return geminiRes;
    }
  }

  // 2. Try Browser Direct OpenAI / GitHub Models GPT-4o API
  const openAiOrGhRes = await summarizeDirectlyViaBrowserOpenAIOrGithub(
    segments,
    title,
    channel,
    ratio,
    tplObj,
    effectiveSections,
    apiKey,
    extraClean
  );
  if (openAiOrGhRes && openAiOrGhRes.html) {
    return openAiOrGhRes;
  }

  // 3. Fallback to Browser Built-in Smart NLP Extractive/Hierarchical Algorithm (works 100% without server or API key)
  const nlpRes = summarizeTranscriptSegments(
    segments,
    title,
    channel,
    ratio,
    tplObj.name || "기본서식",
    aiModelLabel,
    effectiveSections,
    videoUrl
  );
  return {
    engine: "웹 스마트 NLP 요약 엔진",
    html: nlpRes.html,
    takeaways: nlpRes.takeaways,
    outline: nlpRes.outline,
    excerpt: nlpRes.excerpt,
    quality: {
      method: "web-smart-nlp",
      sourceChars: segments.reduce((n, s) => n + (s.text || "").length, 0),
      notice: "웹 브라우저 내장 스마트 알고리즘으로 생성한 요약본입니다."
    }
  };
}

async function runSummarizationAlgorithm(segments, title, channel, ratio, templateName, aiModelLabel, customSections, videoUrl = "", extraCommand = "") {
  const r = Number(ratio) || 30;
  const tplObj = findTemplateObject(templateName);
  const extraClean = String(extraCommand || "").trim();
  const effectiveSections =
    customSections && customSections.length
      ? customSections
      : Array.isArray(tplObj.sections) && tplObj.sections.length
      ? tplObj.sections
      : null;

  if (!Array.isArray(segments) || !segments.some((s) => String(s.text || "").trim())) {
    throw new Error("원문이 없습니다. 자막·직접 입력 원고·오디오가 필요합니다.");
  }
  // Structured manuscripts can be preserved without an external AI request.
  if (!extraClean) {
    const exhaustiveLocal = parseExhaustiveMarkdownInBrowser(segments, title, tplObj.name || templateName);
    if (exhaustiveLocal) {
      exhaustiveLocal.quality = {method: "structured-parser", sourceChars: segments.reduce((n, s) => n + s.text.length, 0),
        notice: "AI 생성이 아닌 원문 항목 보존 결과입니다."};
      return exhaustiveLocal;
    }
  }

  const combinedRules = extraClean
    ? `${tplObj.rules || tplObj.body || ""}\n\n[사용자 추가 요약·편집 명령어 (최우선 반영)]\n${extraClean}`.trim()
    : tplObj.rules || tplObj.body || "";

  const isStaticWebMode = document.body.classList.contains("static-public-mode") && location.port !== "18765";
  if (isStaticWebMode) {
    return await runWebBrowserSummarizationFallback({
      segments,
      title,
      channel,
      ratio: r,
      tplObj,
      effectiveSections,
      extraClean,
      aiModelLabel,
      videoUrl
    });
  }

  let res;
  try {
    res = await fetch(SUMMARIZE_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(1800000),
          body: JSON.stringify({
            segments,
            title,
            channel,
            ratio: r,
            customSections: effectiveSections,
            templateType: tplObj.name || "기본서식",
            extraCommand: extraClean,
            apiKey: getSelectedModelApiKey(),
            aiModel: state.selectedAiModel || "free-gemini",
            algorithmConfig: {
              isFreeform: Boolean(tplObj.isFreeform) || Number(tplObj.chapterCount) === 0 || String(tplObj.name || "").includes("자유") || Boolean(extraClean),
              chapterCount: tplObj.isFreeform ? 0 : (tplObj.chapterCount ?? 11),
              subsPerChapter: tplObj.isFreeform ? 0 : (tplObj.subsPerChapter ?? 2),
              keypointCount: tplObj.isFreeform ? 0 : (tplObj.keypointCount ?? 16),
              tone: tplObj.tone || "formal",
              rules: combinedRules
            }
          })
    });
  } catch (networkErr) {
    if (location.port === "18765") throw networkErr;
    // Local server unreachable -> run directly in Web Browser!
    return await runWebBrowserSummarizationFallback({
      segments,
      title,
      channel,
      ratio: r,
      tplObj,
      effectiveSections,
      extraClean,
      aiModelLabel,
      videoUrl
    });
  }
  const data = await res.json();
  if (!res.ok || !data.ok || !Array.isArray(data.chapters) || !data.chapters.length) {
    if (location.port !== "18765" && (!getSelectedModelApiKey() || String(data.error || "").includes("API Key"))) {
      return await runWebBrowserSummarizationFallback({
        segments,
        title,
        channel,
        ratio: r,
        tplObj,
        effectiveSections,
        extraClean,
        aiModelLabel,
        videoUrl
      });
    }
    throw new Error(data.error || `AI 요약 실패 (${res.status})`);
  }
  return {
            engine: data.engine || aiModelLabel,
            html: renderHanaroChaptersHtml(data.chapters, r, tplObj.name, data.docTitle || title),
            takeaways: data.keypoints || [],
            outline: data.outline || data.chapters.map((c) => c.title),
            excerpt: data.excerpt || `${channel}의 ‘${title}’ 스크립트 요약본입니다.`,
            quality: data.quality
  };
}

function parseRawScriptToSegments(rawText) {
  const lines = String(rawText || "")
    .split(/\r?\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return [];

  // If single long paragraph without linebreaks, split by sentences
  if (lines.length === 1 && lines[0].length > 140) {
    const sentences = lines[0]
      .split(/(?<=[.?!다요죠])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    return sentences.map((s, idx) => {
      const sec = idx * 12;
      const mm = String(Math.floor(sec / 60)).padStart(2, "0");
      const ss = String(sec % 60).padStart(2, "0");
      return { start: sec, time: `${mm}:${ss}`, duration: 12, text: s };
    });
  }

  return lines.map((ln, idx) => {
    const m = ln.match(/^\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*[-:·]?\s*(.+)$/);
    const sec = idx * 12;
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    if (m) {
      return { start: sec, time: m[1], duration: 12, text: m[2].trim() };
    }
    return { start: sec, time: `${mm}:${ss}`, duration: 12, text: ln };
  });
}

function formatScriptSegmentsHtml(segments, title, channel) {
  if (!segments || !segments.length) {
    return `<div class="article-intro">추출된 스크립트 원문이 없습니다.</div>`;
  }
  const totalChars = segments.reduce((acc, s) => acc + (s.text || "").length, 0);
  const rows = segments
    .map(
      (seg) => `
      <div class="script-segment-row">
        <span class="script-time-badge">${escapeHtml(seg.time || "00:00")}</span>
        <span>${escapeHtml(seg.text || "")}</span>
      </div>
    `
    )
    .join("");
  return `
    <div class="article-intro">
      <strong>[유튜브 추출 스크립트 원문]</strong> 총 <strong>${segments.length}</strong>개 구간 · ${totalChars.toLocaleString()}자<br>
      ‘${escapeHtml(title)}’ (${escapeHtml(channel)}) 영상에서 추출되어 요약에 사용된 실제 스크립트입니다.
    </div>
    <div class="script-segment-list">${rows}</div>
  `;
}

const YQDAM7KAG5G_PRESET = {
  videoId: "YQDAm7kAg5g",
  title: "[김주은 목사] 기도를 잃어버린 사람을 향한 초청 (기도하는 방법, 회개·방언·치유 기도)",
  channel: "PASTOR JOOEUN",
  url: "https://www.youtube.com/watch?v=YQDAm7kAg5g",
  categories: ["기도"],
  chapters: [
    {
      num: "1",
      title: "기도는 영의 호흡",
      subs: [
        {
          code: "1.1",
          title: "기도를 잃어버린 사람을 향한 초청",
          body: "기도할 마음은 있지만 무엇을 놓고 어떻게 기도해야 할지 몰라 힘든 분들이 있어요. 목사님은 기도에 관해 함께 배우며 하나님께 응답받고 영이 회복되어 승리하라고 축복합니다. 사람은 육체와 생각·마음의 혼, 하나님께서 주신 영을 가진 존재이며, 기도는 그 영이 숨 쉬는 일입니다."
        },
        {
          code: "1.2",
          title: "예수님도 기도를 놓지 않으심",
          body: "예수님도 이 땅에서 인간의 피곤함과 어려움과 연약함을 겪으시며 성령님을 의지하여 기도하셨어요. 혼자 기도하기 어렵다면 교회에서 함께 기도하며 배워야 합니다. 열심히 기도하는 사람의 열정이 전해지고, 진심을 다해 기도할 때 죽어 가는 영혼이 하나님의 권능으로 다시 살아납니다."
        },
        {
          code: "1.3",
          title: "생각과 마음을 지키는 영적 전쟁",
          body: "영이 약하면 칭찬 때문에 교만해지고 비난 때문에 쉽게 낙심해요. 사탄은 생각과 사람과 환경을 통해 기도를 방해하므로 깨어 경계해야 합니다. 하나님께만 마음을 열고 말씀과 예수 그리스도의 이름으로 담대하게 대적하며, 누구에게도 말하지 못한 고민과 눈물을 하나님께 정직하게 아뢰어야 합니다."
        }
      ]
    },
    {
      num: "2",
      title: "회개와 돌파를 위한 기도의 마음과 방법",
      subs: [
        {
          code: "2.1",
          title: "기도의 시작은 하나님의 영을 초청하는 것",
          body: "어떤 종류의 기도를 하든 먼저 하나님께서 내 안에 좌정하고 다스리시도록 사모해야 해요. 두 손을 내밀고 하나님을 모시며 성령님을 환영하고 예수님을 초청하는 고백으로 시작합니다. 목사님은 이러한 기도 중에 하나님께서 장소에 기름을 부으시고 장막을 덮으시는 것을 경험했으며, 믿음과 사모함으로 기도를 준비하라고 권면합니다."
        },
        {
          code: "2.2",
          title: "말씀과 언약을 붙드는 회개기도",
          body: "로마서 5장 8절에서 전하는 십자가의 사랑을 생각하며 가난한 마음과 감사로 나아가요. 나를 위해 죽으신 예수님 앞에서 죄와 교만을 통회하고 진실한 찬양을 올려드리는 것이 회개기도입니다. 목사님은 그 가운데 악한 영이 쫓겨나고 예수님의 보혈과 성령의 불로 자신과 가정이 회복되는 능력이 나타난다고 전합니다."
        },
        {
          code: "2.3",
          title: "믿음의 가족과 함께하는 돌파기도",
          body: "혼자 돌파되지 않을 때는 믿음의 가족과 성도들이 모여 순수한 마음으로 부르짖고 방언으로 기도해야 해요. 전도서 4장의 삼겹줄에 관한 말씀처럼 함께하는 기도와 목회자의 중보가 힘이 됩니다. 목사님은 중풍병자인 아버지를 8년간 간호하며 몸이 저리고 약해진 성도님이 사역 가운데 성령의 불을 받은 뒤 회복된 간증을 전하며, 성령님의 힘과 도움으로 정확히 대적하고 승리하라고 권면합니다."
        },
        {
          code: "2.4",
          title: "시간을 늘리되 진실한 내용을 가진 기도",
          body: "기도 시간을 점점 늘리는 동시에 짧게 기도하더라도 중언부언하지 말아야 해요. 진심으로 하나님의 뜻과 심정을 구하는 구체적이고 체계적인 기도가 중요합니다. 회개와 돌파와 대적, 방언과 부르짖는 기도를 통해 더 깊이 나아가며 하나님께서 주시는 말씀과 음성, 꿈과 환상, 계시와 예언과 치유의 은혜를 사모합니다."
        },
        {
          code: "2.5",
          title: "예수님과 초대교회의 승리를 따르기",
          body: "예수님은 말씀과 기도로 시험과 연약함을 통과하셨고, 초대교회 성도들도 말씀과 기도에 힘쓰며 핍박을 이겼어요. 기도는 흔들리는 사람을 영적 군사로 세우고 자신과 가정과 교회를 지키는 능력입니다. 목사님은 마가복음 9장 29절을 들어 기도의 중요성을 강조하며, 사역을 기도로 시작하고 말씀으로 마치는 삶을 나눕니다."
        },
        {
          code: "2.6",
          title: "함께 드린 돌파와 보혈의 기도",
          body: "실제 기도에서는 마지막 때에 정신을 차리고 깨어 기도하며 서로 사랑하고 말씀과 전신갑주로 무장하게 해 달라고 구했어요. 가로막는 장애물이 돌파되고 거짓과 미움의 영이 떠나며, 보혈이 가정과 기도 제목과 아픈 몸과 마음을 덮도록 선포합니다. 염려가 감사로 바뀌고 재정이 공급되며 치유와 응답, 보호와 믿음과 지혜와 분별력이 임하기를 기도합니다."
        }
      ]
    },
    {
      num: "3",
      title: "방언의 은사와 영의 성장",
      subs: [
        {
          code: "3.1",
          title: "거듭난 영은 훈련으로 강해져야 함",
          body: "방언을 둘러싼 논쟁이 있어도 방언의 은사는 존재하며 영적인 유익을 준다고 전해요. 거듭나 하나님의 자녀가 되었어도 처음에는 영이 어린아이와 같으므로, 훈련을 통해 그리스도의 장성한 분량에 이르는 군사로 자라야 합니다. 방언은 성령님께서 나누어 주시는 선물이며, 자신과 가정을 지키는 영을 강하게 세우는 데 유익합니다."
        },
        {
          code: "3.2",
          title: "말씀과 기도는 두 날개",
          body: "날마다 말씀을 먹고 기도의 전후를 말씀으로 채워야 해요. 말씀과 기도는 영적인 두 날개여서 한쪽이 꺾이면 다른 쪽도 힘을 잃습니다. 사랑과 전도와 봉사를 결단하고도 쉽게 무너지는 연약한 속사람은 성령님의 도움을 입고, 부르짖는 방언기도로 강건해져야 합니다."
        },
        {
          code: "3.3",
          title: "하나님과 나누는 비밀의 대화",
          body: "목사님은 방언을 육과 혼이나 귀신이 알아듣지 못하는 하나님과 영의 비밀한 대화라고 설명해요. 육과 혼에 짓눌린 영이 기도할 때 숨을 쉬고, 이성의 한계를 넘어 하나님의 능력과 영광을 경험하는 통로가 됩니다. 오래 깊이 기도하며 영을 활성화하고 하나님의 임재 아래 있음을 믿어야 합니다."
        },
        {
          code: "3.4",
          title: "신령한 은사와 하나님의 영광",
          body: "방언은 지혜와 지식의 말씀, 믿음, 병 고침, 능력 행함, 예언, 영 분별, 방언과 통변 등 신령한 은사의 통로라고 전해요. 은사는 하나님께서 주시는 선물이며, 실제로 경험할 때에도 안전하게 분별하고 하나님의 영광에 초점을 맞춰야 합니다. 자신의 말과 생각, 아직 죽지 않은 자아가 악한 영의 통로가 되어 영을 눌리지 않도록 경계해야 합니다."
        },
        {
          code: "3.5",
          title: "믿음과 사모함으로 방언을 구하기",
          body: "방언은 하나님의 강권적인 은혜로 임하기도 하고 믿음과 사모함을 보시고 역사하실 때 받기도 해요. 성령님을 환영하고 초청하며 성령의 불과 방언의 은사를 간절하게 구해야 합니다. 목사님은 입술에 불을 임파테이션하는 사역과 성도들의 갈급한 기도 가운데 방언을 받는 경험을 전하며, 이후에도 말씀 위에서 강하게 기도하라고 권면합니다."
        },
        {
          code: "3.6",
          title: "내적 치유와 기도 돌파의 간증",
          body: "방언기도 가운데 회개의 눈물과 쓴뿌리의 해결, 내적 치유와 몸의 치유가 일어난다고 전해요. 목사님은 가난하고 힘이 없던 때 강대상을 붙들고 하루 여섯 시간씩 눈물로 부르짖다가 영이 강해지고 기도가 돌파되며 천국과 지옥을 경험한 간증을 나눕니다. 성령을 소멸하거나 예언을 멸시하지 말고, 목회자의 분별과 기도 훈련을 통해 영적 유익을 얻어야 합니다."
        },
        {
          code: "3.7",
          title: "방언과 중보의 사명을 위한 실제 기도",
          body: "함께 드린 기도에서는 하나님을 갈망하고 보혈로 정결하게 되어 하나님의 보좌 앞에 나아가기를 구했어요. 방언을 받아 성령님께서 이끄시는 기도를 하고, 중보의 훈련과 사명을 받은 기도의 군사로 일어나도록 기도합니다. 자신과 가정과 교회, 나라와 민족에 기도의 불을 붙이는 충성된 용사로 세워지기를 선포합니다."
        },
        {
          code: "3.8",
          title: "매일 정한 자리에서 기도를 이어가기",
          body: "교회든 가정이든 시간과 자리를 정해 매일 한 시간 이상 방언으로 기도하라고 권면해요. 성령의 불을 구하며 기도할 때 위로와 희락, 기쁨과 평강으로 감싸 주시는 은혜를 사모합니다. 은사를 받는 순간에 머물지 말고 말씀과 기도로 영이 자라는 삶을 이어가야 합니다."
        }
      ]
    },
    {
      num: "4",
      title: "치유와 축사 이후에도 말씀으로 채우는 삶",
      subs: [
        {
          code: "4.1",
          title: "성령님의 역사와 스스로 대적하는 기도",
          body: "악한 영을 대적하는 두 길로 성령님의 강력한 역사와 스스로 선포하며 기도하는 자가축사를 전해요. 사역을 받을 때 믿음으로 사모하며 아멘으로 받고, 이끌어 줄 목회자나 중보자가 없는 상황에서도 하나님께서 자신의 뒷배가 되심을 믿고 기도해야 합니다. 두 손을 내밀어 성령의 불과 임재를 구하며 자신과 가정이 하나님의 영으로 충만해지기를 요청합니다."
        },
        {
          code: "4.2",
          title: "악한 영이 나갔다고 끝난 것이 아님",
          body: "한 번 축사되었다고 모든 싸움이 끝났다고 생각하면 안 돼요. 목사님은 악한 영이 다시 틈을 찾으며 상처와 미움, 절망과 두려움, 교만과 돈과 명예를 좇는 마음을 통해 공격한다고 경고합니다. 하나님 없이도 잘 살 수 있다는 생각을 경계하고, 악한 것이 견고하게 자리 잡기 전에 예수님의 이름으로 대적해야 합니다."
        },
        {
          code: "4.3",
          title: "치유 뒤에 하나님을 떠난 사람의 간증과 경고",
          body: "암에 걸린 여자분이 하나님 앞에 고집을 꺾고 기도를 요청하여 집회의 찬양과 예배 가운데 치유받은 이야기를 전해요. 그러나 이후 신앙생활을 하다가 세상의 재미를 따라 하나님을 모르는 삶으로 돌아갔고, 몇 년 뒤 암이 재발하여 생을 마감했습니다. 목사님은 그분의 구원 여부는 하나님만 아신다고 분명히 하면서, 고침을 받은 뒤에도 믿음의 성장과 하나님의 인도하심을 따르는 삶이 필요하다고 경고합니다."
        },
        {
          code: "4.4",
          title: "비워진 자리를 말씀과 성령으로 채우기",
          body: "악한 영을 쫓아내도 믿음이 자라지 않으면 제자리 신앙이라는 사실 앞에서, 목사님은 그 안을 거룩한 말씀과 하나님의 영으로 채우는 능력을 구했어요. 그 기도를 통해 현장 사역과 함께 유튜브 사역의 문도 열렸습니다. 악한 영의 도구가 될지 하나님의 도구로 훈련받을지 분별하고, 하나님의 말씀에 순종하는 영적 군사로 살아야 합니다."
        },
        {
          code: "4.5",
          title: "상처와 두려움 가운데 포기하지 않는 기도",
          body: "마지막 실제 기도에서는 어린 시절과 부모·친구에게 받은 상처, 미움과 올무에서 자유롭게 되기를 구했어요. 성령의 불과 보혈, 사랑과 치유와 평강이 임하고, 두려움과 자포자기와 죽고 싶은 마음이 몰려올 때에도 기도를 포기하지 않을 담대함을 달라고 기도합니다. 영원한 하나님의 나라와 상 주시는 하나님을 바라보며 샬롬을 누리기를 선포합니다."
        },
        {
          code: "4.6",
          title: "할 수 있는 만큼 날마다 계속하기",
          body: "마지막 권면은 매일 시간을 정해 한 시간 또는 삼십 분씩 할 수 있는 만큼 기도하라는 것이에요. 방언과 한국말을 섞어 기도하며 믿음으로 승리하고, 부르짖고 선포하는 기도를 이어가라고 당부합니다. 예수 그리스도의 이름으로 승리할 날을 바라보며 끝까지 기도를 놓지 말아야 합니다."
        }
      ]
    }
  ],
  keypoints: [
    "<strong>기도는 영의 호흡이에요.</strong> 기도를 잃어버린 채 살지 말고 하나님 앞에서 영이 다시 숨 쉬고 회복되는 자리에 나아가십시오.",
    "<strong>예수님도 이 땅에서 성령님을 의지하며 기도를 놓지 않으셨어요.</strong> 혼자 기도하기 어렵다면 믿음의 가족과 함께 배우고 부르짖으며 기도하십시오.",
    "<strong>생각과 마음을 지켜야 해요.</strong> 칭찬에 교만해지고 비난에 낙심하지 않도록 영을 강하게 세우고, 기도를 방해하는 공격을 말씀과 예수님의 이름으로 대적하십시오.",
    "<strong>기도를 시작할 때 먼저 하나님을 모셔야 해요.</strong> 성령님을 환영하고 예수님을 초청하며 내 안을 다스려 주시도록 믿음과 사모함으로 구하십시오.",
    "<strong>회개기도는 십자가의 사랑을 붙드는 기도예요.</strong> 주님을 생각하며 죄와 교만을 통회하고 감사와 진실한 찬양으로 나아가십시오.",
    "<strong>혼자 막힌 자리에서만 버티지 마세요.</strong> 함께하는 기도와 중보를 통해 돌파를 구하고, 성령님께 힘과 능력과 도움을 받아 승리하십시오.",
    "<strong>기도 시간을 늘리되 중언부언하지 말아야 해요.</strong> 짧게 하더라도 진심으로 하나님의 뜻을 구하는 구체적이고 내용 있는 기도를 드리십시오.",
    "<strong>말씀과 기도는 영적인 두 날개예요.</strong> 기도만 하고 말씀을 놓지 말며, 기도의 전후를 날마다 말씀으로 채우십시오.",
    "<strong>거듭난 영도 훈련을 받아 자라야 해요.</strong> 연약한 속사람이 성령님의 도움으로 강해져 그리스도의 군사로 세워지도록 기도하십시오.",
    "<strong>방언은 하나님께 영으로 아뢰는 비밀한 대화이며 성령님의 선물이라고 전해요.</strong> 믿음과 갈급함으로 은사를 구하고, 받은 뒤에도 말씀 위에서 기도하기를 힘쓰십시오.",
    "<strong>은사를 경험할 때 목적은 하나님의 영광이에요.</strong> 안전하게 분별하며 기도 훈련을 받고, 자신의 말과 생각과 자아가 악한 것의 통로가 되지 않도록 경계하십시오.",
    "<strong>방언의 은사를 받는 데서 멈추지 마세요.</strong> 중보의 훈련과 사명을 받아 자신과 가정과 교회와 나라에 기도의 불을 붙이는 충성된 용사로 일어나십시오.",
    "<strong>사역을 받을 때는 믿음으로 사모하고 아멘으로 받으세요.</strong> 중보자나 목회자가 없는 상황에서도 하나님께서 자신의 뒷배가 되심을 믿고 스스로 선포하며 기도하십시오.",
    "<strong>한 번 치유되고 악한 영이 나갔다고 싸움이 끝난 것은 아니에요.</strong> 상처와 미움, 절망과 교만의 틈을 경계하며 기쁨과 감사를 빼앗기지 마십시오.",
    "<strong>치유 이후에도 믿음이 자라야 해요.</strong> 목사님은 고침을 받은 뒤 하나님을 떠난 사람의 안타까운 간증을 전하며, 구원 여부는 하나님만 아신다는 구분과 함께 계속 주님을 따를 것을 경고합니다.",
    "<strong>비워진 자리를 말씀과 하나님의 영으로 채워야 해요.</strong> 악한 영의 도구가 될지 하나님의 도구로 훈련받을지 분별하고 말씀에 순종하십시오.",
    "<strong>두려움과 자포자기가 몰려와도 기도를 포기하지 마세요.</strong> 보혈과 성령님의 도움을 구하며 하나님을 찬양하고 감사하고, 영원한 하나님의 나라를 바라보십시오.",
    "<strong>날마다 시간과 자리를 정해 기도하세요.</strong> 한 시간 또는 삼십 분씩 할 수 있는 만큼 방언과 한국말을 섞어 기도하며, 예수 그리스도의 이름으로 끝까지 승리하십시오."
  ]
};

function hasBatchim(word) {
  if (!word) return false;
  const code = word.charCodeAt(word.length - 1);
  if (code >= 0xac00 && code <= 0xd7a3) {
    return (code - 0xac00) % 28 !== 0;
  }
  return false;
}

function josa(word, pair) {
  const [first, second] = pair.split("/");
  return `${word}${hasBatchim(word) ? first : second}`;
}

const C7FCAC813ACE1D68_PRESET = {
  docTitle: "하늘을 찾는 사람, 땅을 찾는 사람",
  title: "하늘을 찾는 사람, 땅을 찾는 사람",
  channel: "하나로교회 말씀요약",
  url: "https://hanaro-people.slogs.dev/word/c7fcac813ace1d68",
  categories: ["믿음"],
  chapters: [
    {
      num: "1",
      title: "눈을 들어 주를 바라보는 예배",
      subs: [
        {
          title: "세상에서 시달린 마음을 주님께 돌리기",
          body: "예배는 세상의 무게에 눌린 눈을 들어 주님을 바라보는 데서 시작합니다. 우리의 위로와 구원과 소망이 하나님께 있음을 고백하며, 굳은 마음이 새 생명과 소망으로 거듭나기를 구합니다."
        },
        {
          title: "말씀을 생명으로 듣기",
          body: "설교를 흘려듣거나 졸음과 잡생각에 빼앗기지 말아야 합니다. 선포되는 말씀을 생명으로 받고, 듣는 데서 끝나지 않고 순종으로 이어 가야 합니다."
        }
      ]
    },
    {
      num: "2",
      title: "땅의 사람과 하늘의 시민",
      subs: [
        {
          title: "위의 것을 찾으라는 명령",
          body: "골로새서 3장은 그리스도와 함께 다시 살리심을 받은 사람에게 위의 것을 찾으라고 말합니다. 동시에 음란과 부정과 사욕과 악한 정욕과 탐심 같은 땅의 지체를 죽이라고 명령합니다."
        },
        {
          title: "하늘 시민권의 실제",
          body: "하늘의 시민권을 가진 사람은 생명책에 이름이 기록된 사람이며, 예수님이 지금 나와 함께하심을 실제로 믿고 느끼며 삽니다. 땅에서 일어나는 문제보다 왕이신 하나님의 뜻을 먼저 묻습니다."
        },
        {
          title: "땅의 사람의 기준",
          body: "땅에 속한 사람은 배와 욕망을 하나님처럼 섬기고 무엇을 먹고 누리고 채울지만 생각합니다. 육신의 욕망이 주인이 되면 사람은 점점 악해지고, 결국 타인과 생명까지 도구로 대할 수 있습니다."
        }
      ]
    },
    {
      num: "3",
      title: "파송받은 사람의 생각법",
      subs: [
        {
          title: "왕이 나를 왜 이 땅에 보내셨는가",
          body: "하늘의 시민은 이 땅을 영원한 고향이 아니라 파송지로 봅니다. 옷과 선물과 돈, 만남과 시간을 사용할 때도 주님이 기뻐하실지, 더 어려운 이웃을 섬길 수 있을지를 생각합니다."
        },
        {
          title: "영원과 현재의 크기 비교",
          body: "영원 앞에서 이 땅의 시간은 점 하나처럼 짧습니다. 그러므로 잠깐의 손해와 불편을 과장하지 않고, 영원한 하나님 나라의 관점에서 선택해야 합니다."
        }
      ]
    },
    {
      num: "4",
      title: "무엇을 바라보느냐가 삶을 만든다",
      subs: [
        {
          title: "영의 일은 생명과 평안을 낳는다",
          body: "교회와 말씀과 기도, 회개와 섬김에 마음을 두면 하나님이 생명과 평안을 부어 주십니다. 기도할 때 체면을 내려놓고 마음을 찢으며 회개하는 사람이 영의 사람입니다."
        },
        {
          title: "땅의 콘텐츠에 마음을 빼앗기지 않기",
          body: "유튜브와 쇼츠, 연예인과 세상 문화에 시간을 계속 내주면 그것이 마음의 주인이 됩니다. 무엇을 반복해 보고 듣는지가 결국 우리의 갈망과 행동을 결정합니다."
        },
        {
          title: "예수님의 자녀라는 정체성",
          body: "마음이 다른 것에 붙잡힐 때 “나는 예수님의 자녀다”라고 고백하고 사탄을 대적하며 예수님을 찾아야 합니다. 교회와 말씀과 기도가 떠오르는 것은 성령께서 우리를 이끄시는 표지입니다."
        }
      ]
    },
    {
      num: "5",
      title: "일상에서 성령과 동행하기",
      subs: [
        {
          title: "하루의 첫 시선을 성령님께",
          body: "아침에 눈뜨자마자 휴대폰부터 찾기보다 성령님께 인사하고 하루를 맡겨야 합니다. 사람을 만날 때, 음식을 먹을 때, 작은 결정을 할 때도 주님과 대화하며 동행할 수 있습니다."
        },
        {
          title: "세상이 전부라는 쓴뿌리 끊기",
          body: "사탄은 이 세상이 전부인 것처럼 살게 합니다. 그러나 세상의 욕망과 소유는 모두 썩어 없어집니다. 성령을 따라 행하는 사람은 순간의 충동보다 하나님의 뜻을 선택합니다."
        }
      ]
    },
    {
      num: "6",
      title: "죄의 자리를 실제로 피하기",
      subs: [
        {
          title: "참아야 할 때 참기",
          body: "육신은 화가 나면 화를 내고, 만나지 말아야 할 사람을 만나며, 가지 말아야 할 곳에 갑니다. 성령을 따르는 삶은 죄의 유혹을 분석만 하는 것이 아니라 그 자리에서 즉시 떠나는 것입니다."
        },
        {
          title: "거룩을 위한 구체적인 경계",
          body: "유혹받을 환경을 일부러 만들지 말아야 합니다. 연애와 술자리, 인간관계에서도 밝고 안전한 경계를 세우고, 예수 이름으로 죄악의 자리에서 도망쳐야 합니다."
        },
        {
          title: "삶의 주체를 하나님께 드리기",
          body: "문제를 혼자 끌어안는 것이 아니라 교회로 가지고 와서 기도해야 합니다. 내 삶의 주체가 내가 아니라 하나님이 되실 때 하늘에 속한 삶이 시작됩니다."
        }
      ]
    },
    {
      num: "7",
      title: "심는 대로 거두는 신앙",
      subs: [
        {
          title: "갈라디아서 6장의 원리",
          body: "사람은 무엇으로 심든지 그대로 거둡니다. 육체를 위해 시간과 힘을 쓰면 썩어질 것을 거두고, 성령을 위해 심으면 영원한 생명의 열매를 거둡니다."
        },
        {
          title: "교회 섬김은 성령을 위한 씨앗",
          body: "교회를 내 집이라고 고백한다면 누군가 해 주겠지 하며 바라보기만 해서는 안 됩니다. 청소와 설거지, 페인트칠과 보이지 않는 수고에 직접 참여하는 것이 믿음의 씨앗입니다."
        },
        {
          title: "열매 맺지 않는 가지가 되지 않기",
          body: "섬기지 않는 사람이 많아질수록 이미 섬기는 사람에게 부담이 집중됩니다. 신앙은 말씀을 많이 들었다는 사실이 아니라, 몸을 움직여 공동체를 세우는 열매로 드러나야 합니다."
        }
      ]
    },
    {
      num: "8",
      title: "오늘 순종해야 하는 이유",
      subs: [
        {
          title: "죽음은 생각보다 가깝다",
          body: "목적지 직전의 방심이 큰 사고로 이어질 수 있듯이, 인생도 끝까지 깨어 있어야 합니다. 죽음을 기억하는 것은 공포에 사는 것이 아니라 오늘의 선택을 바르게 하는 지혜입니다."
        },
        {
          title: "듣기만 하는 신앙을 끝내기",
          body: "설교를 천 번 들어도 순종하지 않으면 삶은 달라지지 않습니다. 작은 일 하나라도 오늘 행하여 말씀을 실제 삶으로 옮겨야 합니다."
        }
      ]
    },
    {
      num: "9",
      title: "오래 심고 기다리는 믿음",
      subs: [
        {
          title: "사과나무처럼 시간을 견디기",
          body: "사과나무가 상품이 될 열매를 맺기까지 여러 해를 기다리듯 영적인 나무도 하루아침에 자라지 않습니다. 기도와 말씀, 섬김과 전도를 매일 심으며 열매가 보이지 않는 시간을 견뎌야 합니다."
        },
        {
          title: "삶의 자리에서 믿음을 드러내기",
          body: "직장 식사 자리에서도 기도를 부끄러워하지 말고 예수님을 믿는 사람답게 행동해야 합니다. 사람들에게 “너는 정말 예수님을 믿는구나”라는 말을 들을 만큼 삶이 달라져야 합니다."
        }
      ]
    },
    {
      num: "10",
      title: "영원하지 않은 것을 놓기",
      subs: [
        {
          title: "세상과 정욕은 지나간다",
          body: "요한일서 2장은 세상도 정욕도 지나가지만 하나님의 뜻을 행하는 사람은 영원히 거한다고 말합니다. 내가 원하는 인생 계획을 절대화하지 말고 하나님의 생각으로 다시 채워야 합니다."
        },
        {
          title: "돈과 성공과 자녀를 우상으로 만들지 않기",
          body: "사업과 브랜드, 집과 재산, 자녀까지도 하나님보다 앞세우면 우상이 됩니다. 영원하지 않은 것을 영원한 것처럼 붙드는 것이 죄임을 깨닫고 예수 그리스도를 붙잡아야 합니다."
        }
      ]
    },
    {
      num: "11",
      title: "결단과 적용",
      subs: [
        {
          title: "행동으로 씨앗을 심기",
          body: "하늘의 사람은 생각만 바꾸지 않고 행동을 바꿉니다. 달라진 행동 하나하나가 성령을 위한 씨앗이 되어 마지막 날 주님의 칭찬으로 돌아옵니다."
        },
        {
          title: "예수님보다 귀한 것은 없다",
          body: "주 예수보다 귀한 것은 없다는 찬양처럼, 지나가는 땅의 것을 내려놓고 영원한 주님을 선택해야 합니다. 주님을 찾고, 죄에서 떠나고, 공동체를 섬기며 하늘 시민답게 살아가야 합니다."
        }
      ]
    }
  ],
  keypoints: [
    "그리스도와 함께 다시 살리심을 받았으면 땅의 욕망이 아니라 위의 것을 찾으세요.",
    "하늘의 시민권은 명칭이 아니라 예수님이 지금 나와 함께하심을 믿고 따르는 삶입니다.",
    "말씀을 많이 들은 것으로 만족하지 말고 오늘 한 가지라도 순종하세요.",
    "무엇을 반복해 보고 듣느냐가 마음의 주인과 삶의 방향을 결정합니다.",
    "아침의 첫 시선부터 사람을 만나고 밥을 먹는 순간까지 성령님과 대화하세요.",
    "세상이 전부라는 생각은 사탄이 심은 쓴뿌리입니다. 세상과 그 정욕은 모두 지나갑니다.",
    "죄의 유혹 앞에서는 버티며 구경하지 말고 예수 이름으로 대적하며 그 자리에서 떠나세요.",
    "삶의 문제를 혼자 끌어안지 말고 교회로 가져와 기도하며 하나님께 주도권을 드리세요.",
    "사람은 심은 대로 거둡니다. 육체가 아니라 성령을 위해 시간과 힘을 심으세요.",
    "교회를 내 집이라고 고백한다면 청소와 설거지와 보이지 않는 수고에 직접 참여하세요.",
    "열매 맺지 않는 가지가 되어 다른 사람의 수고만 소비하지 말고 공동체를 세우세요.",
    "죽음은 멀리 있지 않습니다. 방심하지 말고 오늘 해야 할 순종을 오늘 하세요.",
    "영적인 열매는 늦게 자랍니다. 기도와 말씀과 섬김의 씨앗을 매일 심고 오래 기다리세요.",
    "직장과 가정과 관계 속에서 예수님을 부끄러워하지 말고 믿음이 행동으로 보이게 하세요.",
    "돈과 성공과 자녀처럼 영원하지 않은 것을 영원한 것처럼 붙들어 우상으로 만들지 마세요.",
    "땅의 것을 놓고 예수 그리스도를 붙드세요. 주 예수보다 더 귀한 것은 없습니다."
  ]
};

function renderHanaroChaptersHtml(chapters, ratio = 30, templateName = "기본서식", docTitle = "") {
  const r = Number(ratio) || 30;
  const tplStr = String(templateName || "");
  const isBullet = tplStr.includes("bullet");
  const isReport = tplStr.includes("리포트");
  const isFree = tplStr.includes("자유");
  const headerTitle = isFree
    ? "요약 (자유형식)"
    : isBullet
    ? "요약 (핵심 Bullet)"
    : isReport
    ? "요약 (심층 리포트)"
    : "요약";
  const headerHtml = `<div class="hanaro-section-head"><span class="hanaro-num-badge">1</span><h2>${escapeHtml(headerTitle)}</h2></div>`;
  const docTitleHtml = docTitle ? `<h1 class="hanaro-doc-title">${escapeHtml(docTitle)}</h1>` : "";
  const bodyHtml = chapters
    .map((ch) => {
      const totalSubsInCh = Array.isArray(ch.subs) ? ch.subs.length : 0;
      const limit = totalSubsInCh;
      const subsHtml = (ch.subs || [])
        .slice(0, limit)
        .map((sub) => {
          const subHeadingText = sub.code ? `${sub.code} ${sub.title}` : (sub.title || "");
          const evidenceHtml = Array.isArray(sub.evidence) && sub.evidence.length
            ? `<details class="summary-evidence"><summary>원문 근거 보기</summary>${sub.evidence.map(q => `<blockquote>${escapeHtml(q)}</blockquote>`).join("")}</details>` : "";
          if (isBullet) {
            const bullets =
              Array.isArray(sub.bullets) && sub.bullets.length
                ? sub.bullets
                : String(sub.body || "")
                    .split(/(?<=[.?!])\s+/)
                    .filter(Boolean);
            const liHtml = bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("");
            return `${subHeadingText ? `<h3 class="hanaro-h3">${escapeHtml(subHeadingText)}</h3>` : ""}<ul class="hanaro-sub-bullets">${liHtml}</ul>${evidenceHtml}`;
          }
          const bodyParagraphs = String(sub.body || "")
            .split(/\r?\n+/)
            .map((p) => p.trim())
            .filter(Boolean)
            .map((p) => `<p class="hanaro-p">${escapeHtml(p)}</p>`)
            .join("");
          return `${subHeadingText ? `<h3 class="hanaro-h3">${escapeHtml(subHeadingText)}</h3>` : ""}${bodyParagraphs}${evidenceHtml}`;
        })
        .join("");
      const chHeading = ch.num ? `${ch.num}. ${ch.title}` : ch.title;
      return `${chHeading ? `<h2 class="hanaro-h2-major">${escapeHtml(chHeading)}</h2>` : ""}${subsHtml}`;
    })
    .join("");
  return headerHtml + docTitleHtml + bodyHtml;
}

function cleanSpeechToSummaryStyle(rawText) {
  let s = String(rawText || "")
    .replace(/\[음악\]|\[박수\]|\[웃음\]|\[무음\]/g, " ")
    .replace(/(예수님은|하나님은|성령님은|목사님은|기도는|방언은|우리는|여러분은|믿음은|말씀은)요(?=\s|$|[가-힣])/g, "$1 ")
    .replace(/안녕하세요\s*(김주은\s*목사입니다|반갑습니다)?/g, " ")
    .replace(/(?<![가-힣])(어+|음+|그+|자+|아+|예+|네+|이제|그러니까|근데|사실은|솔직히|어쨌든|아무튼|여러분들?|정말|진짜|굉장히|너무|좀|막|약간|그냥)(?![가-힣])/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!s) return "";
  s = s
    .replace(/거예요/g, "것입니다")
    .replace(/거죠/g, "것입니다")
    .replace(/거든요/g, "기 때문입니다")
    .replace(/잖아요/g, "습니다")
    .replace(/할까요/g, "해야 합니다");
  if (!/[.?!다요죠]$/.test(s)) {
    s += "합니다.";
  }
  return s;
}

function extractTopicHeading(sentences, fallbackIdx) {
  const stopWords = new Set([
    "그리고", "그래서", "하지만", "그런데", "이렇게", "저렇게", "그렇게", "이것은", "있는", "없는",
    "하는", "되는", "입니다", "있습니다", "합니다", "것입니다", "때문에", "통해서", "대해서", "시간에",
    "말씀을", "우리가", "우리", "사람이", "사람들", "생각을", "마음을", "부분이", "경우가", "중요한",
    "필요한", "내려오셨기", "살아계시는", "동안에도", "있지만", "된다는", "느끼는"
  ]);
  const badEndings = /(셨기|계시는|있지만|된다는|느끼는|오셨|하셨|않으|못하|위해|통해|대한|관한|같은|하는|되는)$/;
  const counts = {};
  sentences.forEach((u) => {
    const words = (u.text || "")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .map((w) => w.replace(/(은|는|이|가|을|를|의|에|에서|으로|로|과|와|도|만|까지|부터|께서|이라|라고|하는|된|할|하며|하고)$/, ""))
      .filter((w) => w.length >= 2 && w.length <= 7 && !stopWords.has(w) && !badEndings.test(w));
    words.forEach((w) => {
      counts[w] = (counts[w] || 0) + 1;
    });
  });
  const topWords = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((e) => e[0]);
  if (topWords.length >= 2) {
    return `${josa(topWords[0], "과/와")} ${topWords[1]}의 본질과 실천`;
  }
  if (topWords.length === 1) {
    return `${topWords[0]} 중심의 핵심 메시지`;
  }
  return `핵심 주제 파트 ${fallbackIdx}`;
}

function summarizeTranscriptSegments(segments, title, channel, ratio, templateName, aiModelLabel, customSections, videoUrl = "") {
  if (!Array.isArray(segments) || !segments.some((s) => String(s.text || "").trim())) {
    throw new Error("원문 없이 요약을 생성할 수 없습니다.");
  }
  const r = Number(ratio) || 30;

  const cleanedSegments = (segments || []).filter(
    (s) => s.text && !/^\[(음악|박수|웃음)\]$/.test(s.text.trim())
  );

  if (!cleanedSegments.length) {
    throw new Error("음악·박수 표시를 제외한 실제 원문이 없습니다.");
  }

  // Merge micro-captions into coherent sentences
  const units = [];
  let buf = "";
  let bufTime = cleanedSegments[0].time || "00:00";
  cleanedSegments.forEach((seg, idx) => {
    const t = cleanSpeechToSummaryStyle(seg.text);
    if (!t) return;
    if (!buf) bufTime = seg.time || "00:00";
    buf += (buf ? " " : "") + t;
    if (buf.length >= 90 || idx === cleanedSegments.length - 1) {
      units.push({ time: bufTime, text: buf.trim(), index: units.length });
      buf = "";
    }
  });

  // Score units by keyword density
  const freq = {};
  units.forEach((u) => {
    u.text
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 2)
      .forEach((w) => {
        freq[w] = (freq[w] || 0) + 1;
      });
  });

  const scored = units.map((u, idx) => {
    const words = u.text
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 2);
    const score = words.reduce((acc, w) => acc + (freq[w] || 0), 0) / Math.max(1, Math.sqrt(words.length));
    return { ...u, score: score * (idx === 0 || idx === units.length - 1 ? 1.2 : 1.0) };
  });

  // Build 4 Major Chapters (# 1. ~ # 4.) and 2~4 Subsections (## 1.1 ~ ## 4.x)
  const chapterCount = customSections && customSections.length ? customSections.length : Math.min(4, Math.max(2, Math.ceil(units.length / 6)));
  const subPerChapter = r >= 50 ? 4 : r >= 30 ? 3 : 2;

  const chapters = [];
  for (let c = 0; c < chapterCount; c++) {
    const startIdx = Math.floor((c / chapterCount) * units.length);
    const endIdx = Math.floor(((c + 1) / chapterCount) * units.length);
    const chSlice = units.slice(startIdx, Math.max(startIdx + 1, endIdx));

    const chTitle =
      customSections && customSections[c]
        ? customSections[c].replace(/^\d+\.\s*/, "")
        : extractTopicHeading(chSlice, c + 1);

    const subs = [];
    const actualSubs = Math.min(subPerChapter, Math.max(1, chSlice.length));
    for (let s = 0; s < actualSubs; s++) {
      const subStart = Math.floor((s / actualSubs) * chSlice.length);
      const subEnd = Math.floor(((s + 1) / actualSubs) * chSlice.length);
      const subSlice = chSlice.slice(subStart, Math.max(subStart + 1, subEnd));
      const subTitle = extractTopicHeading(subSlice, `${c + 1}.${s + 1}`);

      const chosenSentences = subSlice.slice(0, 2).map((u) => u.text);
      const paragraphText = chosenSentences.join(" ");
      subs.push({
        code: "",
        title: subTitle,
        body: paragraphText
      });
    }

    chapters.push({
      num: String(c + 1),
      title: chTitle,
      subs
    });
  }

  // Build numbered Key Points (2. 핵심) in c7fcac813ace1d68 style (16 concise 1-2 sentence items)
  const desiredKeypoints = Math.min(18, Math.max(8, Math.round((r / 30) * 16)));
  const topUnits = [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, desiredKeypoints)
    .sort((a, b) => a.index - b.index);

  const takeaways = topUnits.map((u, idx) => {
    const clean = u.text.replace(/[.?!]+$/, "").trim();
    const heading = extractTopicHeading([u], idx + 1);
    return `**${heading}**\n${clean}. 듣는 데서 머물지 말고 **핵심 원리**를 오늘 삶과 현장에서 바로 실천해야 합니다.`;
  });

  return {
    html: renderHanaroChaptersHtml(chapters, r, templateName, title),
    takeaways,
    outline: chapters.map((c) => c.title),
    excerpt: chapters[0]?.subs[0]?.body.slice(0, 115) || `${channel}의 ‘${title}’ 계층형 스크립트 요약본입니다.`
  };
}

function buildStructuredContent(title, channel, ratio, templateName, aiModelLabel, customSections) {
  const r = Number(ratio) || 30;
  const baseSections =
    customSections && customSections.length
      ? customSections
      : [
          "핵심 주제의 본질과 출발점",
          "성장을 위한 구체적 원리와 방법",
          "일상과 현장에서의 적용과 훈련",
          "흔들리지 않는 지속과 결론"
        ];

  const chapters = baseSections.map((secTitle, cIdx) => {
    const cleanTitle = secTitle.replace(/^\d+\.\s*/, "");
    return {
      num: String(cIdx + 1),
      title: cleanTitle,
      subs: [
        {
          code: `${cIdx + 1}.1`,
          title: `${cleanTitle}의 배경과 초청`,
          body: `‘${title}’에서 ${channel} 채널은 ${cleanTitle}의 중요성을 먼저 짚어 주어요. 지엽적인 기술이나 방법론에 머물기보다 본질적인 방향과 중심을 바로잡는 것이 우선입니다. 기본 원리를 이해하고 삶과 현장에 적용하라고 권면합니다.`
        },
        {
          code: `${cIdx + 1}.2`,
          title: `${cleanTitle}을(를) 세우는 구체적 실천`,
          body: `혼자 고민하기보다 검증된 원리와 훈련을 통해 한 걸음씩 나아가야 해요. 작은 실행과 피드백이 쌓일 때 흔들리지 않는 내면과 실력이 만들어집니다. 오늘 할 수 있는 분량부터 성실하게 시작하라고 강조합니다.`
        }
      ]
    };
  });

  return renderHanaroChaptersHtml(chapters, r);
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const INITIAL_SUMMARIES = [
  {
    id: 26,
    title: C7FCAC813ACE1D68_PRESET.title,
    channel: C7FCAC813ACE1D68_PRESET.channel,
    url: C7FCAC813ACE1D68_PRESET.url,
    categories: C7FCAC813ACE1D68_PRESET.categories,
    date: "2026.10.17",
    ratio: 30,
    template: "기본서식",
    aiModel: "OpenAI GPT-4o",
    isNew: true,
    published: true,
    bookmarked: true,
    excerpt: "예배는 세상의 무게에 눌린 눈을 들어 주님을 바라보는 데서 시작합니다. 땅의 지체를 죽이고 위의 것을 찾으며 하늘 시민답게 살아가는 11가지 원리와 16가지 핵심을 정리했습니다.",
    originalHtml: renderHanaroChaptersHtml(C7FCAC813ACE1D68_PRESET.chapters, 30, "기본서식", C7FCAC813ACE1D68_PRESET.docTitle),
    editedHtml: renderHanaroChaptersHtml(C7FCAC813ACE1D68_PRESET.chapters, 30, "기본서식", C7FCAC813ACE1D68_PRESET.docTitle),
    takeaways: C7FCAC813ACE1D68_PRESET.keypoints,
    outline: C7FCAC813ACE1D68_PRESET.chapters.map((c) => c.title)
  },
  {
    id: 25,
    title: YQDAM7KAG5G_PRESET.title,
    channel: YQDAM7KAG5G_PRESET.channel,
    url: YQDAM7KAG5G_PRESET.url,
    categories: YQDAM7KAG5G_PRESET.categories,
    date: "2026.10.17",
    ratio: 30,
    template: "기본서식",
    aiModel: "OpenAI GPT-4o",
    isNew: true,
    published: true,
    bookmarked: true,
    excerpt: "기도는 영의 호흡입니다. 회개와 돌파를 위한 기도의 마음과 방법, 방언의 은사와 영의 성장, 치유 이후 말씀으로 채우는 삶을 체계적으로 정리했습니다.",
    originalHtml: renderHanaroChaptersHtml(YQDAM7KAG5G_PRESET.chapters, 30, "기본서식", YQDAM7KAG5G_PRESET.title),
    editedHtml: renderHanaroChaptersHtml(YQDAM7KAG5G_PRESET.chapters, 30, "기본서식", YQDAM7KAG5G_PRESET.title),
    takeaways: YQDAM7KAG5G_PRESET.keypoints,
    outline: YQDAM7KAG5G_PRESET.chapters.map((c) => c.title)
  },
  {
    id: 24,
    title: "AI 시대, 대체되지 않는 사람이 되는 법",
    channel: "EO 이오",
    url: "https://www.youtube.com/watch?v=YQDAm7kAg5g",
    categories: ["믿음"],
    date: "2026.10.17",
    ratio: 30,
    template: "기본서식",
    aiModel: "OpenAI GPT-4o",
    isNew: true,
    published: true,
    bookmarked: false,
    excerpt: "모두가 같은 도구를 갖게 될 때, 차이를 만드는 것은 그 도구에 던지는 질문입니다.",
    originalHtml: "",
    editedHtml: "",
    takeaways: [
      "도구를 다루는 기술보다 <strong>문제를 정의하는 능력</strong>이 중요해집니다.",
      "좋은 질문과 나만의 경험이 AI 시대의 차별점이 됩니다.",
      "작은 실험을 반복하며 나만의 AI 활용 방식을 만들어보세요."
    ],
    outline: ["방향을 정하는 건 사람", "좋은 질문을 만드는 힘", "나만의 경험과 맥락", "작은 시도의 중요성"]
  },
  {
    id: 23,
    title: "일 잘하는 사람은 어떻게 생각하고 행동할까?",
    channel: "김지윤의 지식Play",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    categories: ["기도"],
    date: "2026.10.17",
    ratio: 30,
    template: "기본서식",
    aiModel: "OpenAI GPT-4o",
    isNew: true,
    published: true,
    bookmarked: true,
    excerpt: "바쁘게 일하는 것과 잘하는 것의 차이. 성과를 만드는 사람들의 사고방식을 들여다봅니다.",
    originalHtml: "",
    editedHtml: "",
    takeaways: [
      "업무의 양보다 <strong>핵심 우선순위 설정</strong>이 성과를 결정합니다.",
      "피드백 루프를 짧게 가져가며 실행 속도를 높이세요.",
      "협업에서는 명확한 맥락 공유가 가장 큰 비용을 줄여줍니다."
    ],
    outline: ["성과를 만드는 우선순위", "짧은 피드백 루프", "맥락 중심의 커뮤니케이션"]
  },
  {
    id: 22,
    title: "2026 트렌드, 우리는 무엇을 준비해야 할까",
    channel: "티타임즈TV",
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    categories: ["믿음"],
    date: "2026.10.16",
    ratio: 40,
    template: "리포트형",
    aiModel: "Gemini 1.5 Pro",
    isNew: false,
    published: true,
    bookmarked: false,
    excerpt: "빠르게 달라지는 세상 속에서 흔들리지 않고 나만의 방향을 찾아가는 방법.",
    originalHtml: "",
    editedHtml: "",
    takeaways: [
      "기술 변화 속도가 빨라질수록 <strong>고객의 본질적 니즈</strong>에 집중해야 합니다.",
      "초개인화 서비스와 AI 에이전트 결합이 핵심 트렌드입니다."
    ],
    outline: ["2026 핵심 기술 흐름", "소비자 행동의 변화", "비즈니스 대응 전략"]
  },
  {
    id: 21,
    title: "돈의 흐름을 읽는 사람들의 공통적인 습관",
    channel: "삼프로TV",
    url: "https://www.youtube.com/watch?v=YQDAm7kAg5g",
    categories: ["기도"],
    date: "2026.10.15",
    ratio: 30,
    template: "기본서식",
    aiModel: "Claude 3.5 Sonnet",
    isNew: false,
    published: true,
    bookmarked: false,
    excerpt: "숫자 너머의 맥락을 읽는 힘. 경제를 바라보는 시선을 조금 다르게 만들어봅니다.",
    originalHtml: "",
    editedHtml: "",
    takeaways: [
      "단기 지표보다 <strong>장기 금리와 산업 구조의 변화</strong>를 함께 봐야 합니다.",
      "매일 경제 뉴스를 자신의 언어로 한 줄 요약하는 습관이 중요합니다."
    ],
    outline: ["거시경제 지표 읽기", "산업 패러다임 변화", "리스크 관리 습관"]
  },
  {
    id: 20,
    title: "작은 브랜드가 큰 팬덤을 만드는 방법",
    channel: "EO 이오",
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    categories: ["믿음"],
    date: "2026.10.14",
    ratio: 30,
    template: "핵심 bullet형",
    aiModel: "OpenAI GPT-4o",
    isNew: false,
    published: true,
    bookmarked: false,
    excerpt: "광고비 대신 진정성 있는 스토리와 고객 경험으로 팬덤을 구축한 브랜드의 비결.",
    originalHtml: "",
    editedHtml: "",
    takeaways: [
      "모두를 만족시키기보다 <strong>단 100명의 열광적인 팬</strong>에서 시작하세요.",
      "브랜드의 철학이 제품 경험의 디테일과 일치해야 합니다."
    ],
    outline: ["초기 팬덤 확보 전략", "브랜드 스토리텔링", "커뮤니티 운영 노하우"]
  },
  {
    id: 19,
    title: "하루 30분, 인생을 바꾸는 독서의 기술",
    channel: "스터디언",
    url: "https://www.youtube.com/watch?v=YQDAm7kAg5g",
    categories: ["기도"],
    date: "2026.10.13",
    ratio: 20,
    template: "핵심 bullet형",
    aiModel: "OpenAI GPT-4o",
    isNew: false,
    published: true,
    bookmarked: true,
    excerpt: "읽고 잊어버리는 독서에서 벗어나 실제 행동의 변화를 이끌어내는 메모 독서법.",
    originalHtml: "",
    editedHtml: "",
    takeaways: [
      "완독보다 중요한 것은 <strong>실천할 문장 하나</strong>를 건지는 것입니다.",
      "읽은 직후 3줄 요약을 남기면 기억 유지율이 3배 이상 높아집니다."
    ],
    outline: ["목적 중심 독서법", "3줄 출력 메모", "일상 루틴 설계"]
  },
  {
    id: 18,
    title: "우리가 몰랐던 공간의 힘, 생각을 바꾸는 환경",
    channel: "셜록현준",
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    categories: ["믿음"],
    date: "2026.10.12",
    ratio: 30,
    template: "기본서식",
    aiModel: "Gemini 1.5 Pro",
    isNew: false,
    published: true,
    bookmarked: false,
    excerpt: "건축과 공간의 배치가 우리의 창의성과 집중력에 미치는 놀라운 영향.",
    originalHtml: "",
    editedHtml: "",
    takeaways: [
      "천장고와 채광, 시선의 개방감이 사고의 유연성을 결정합니다.",
      "일하는 공간과 쉬는 공간의 물리적 분리가 집중력을 높입니다."
    ],
    outline: ["공간과 인간의 심리", "창의성을 높이는 환경", "나만의 작업 공간 만들기"]
  },
  {
    id: 17,
    title: "새로운 관점은 어디에서 시작되는가",
    channel: "세바시 강연",
    url: "https://www.youtube.com/watch?v=YQDAm7kAg5g",
    categories: ["미정"],
    date: "2026.10.11",
    ratio: 30,
    template: "기본서식",
    aiModel: "OpenAI GPT-4o",
    isNew: false,
    published: true,
    bookmarked: false,
    excerpt: "익숙한 일상에서 한 걸음 벗어나 새로운 연결고리를 발견하는 사람들의 특징.",
    originalHtml: "",
    editedHtml: "",
    takeaways: [
      "서로 무관해 보이는 두 영역을 연결할 때 창의적 관점이 탄생합니다.",
      "질문하는 습관이 당연한 일상을 새로운 배움의 장으로 바꿉니다."
    ],
    outline: ["관점 전환의 출발점", "이종 분야의 결합", "일상 속 관찰 기록"]
  }
];

INITIAL_SUMMARIES.forEach((item) => {
  if (!item.originalHtml) {
    item.originalHtml = buildStructuredContent(item.title, item.channel, item.ratio, item.template, item.aiModel);
  }
  if (!item.editedHtml) {
    item.editedHtml = item.originalHtml;
  }
});

function renumberSummariesFromOne(summariesList, currentId = null) {
  if (!Array.isArray(summariesList) || !summariesList.length) return null;
  // Sort oldest first so oldest gets 1 and newest gets N
  const oldestFirst = [...summariesList].sort((a, b) => Number(a.id || 0) - Number(b.id || 0));
  const idMap = new Map();
  oldestFirst.forEach((item, idx) => {
    const newId = idx + 1;
    idMap.set(Number(item.id), newId);
    item.id = newId;
  });
  // Keep newest first in the array
  summariesList.splice(0, summariesList.length, ...oldestFirst.reverse());
  if (currentId !== null && idMap.has(Number(currentId))) {
    return idMap.get(Number(currentId));
  }
  return summariesList[0]?.id || 1;
}

renumberSummariesFromOne(INITIAL_SUMMARIES);

function loadAppState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.summaries) && Array.isArray(parsed.categories)) {
        // Keep existing item IDs intact, clean any garbage JS script segments, and force newest-first sort order
        parsed.sortAsc = false;
        parsed.summaries.forEach((s) => {
          if (Array.isArray(s.scriptSegments)) {
            s.scriptSegments = s.scriptSegments.filter((seg) => !isGarbageScriptSegmentText(seg.text));
          }
        });
        parsed.summaries.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
        if (!parsed.modelApiKeys || typeof parsed.modelApiKeys !== "object") {
          parsed.modelApiKeys = {
            "vscode-gemini4": DEFAULT_GEMINI_KEY,
            "free-gemini": DEFAULT_GEMINI_KEY,
            "free-openai": DEFAULT_GEMINI_KEY
          };
        }
        if (!parsed.defaultRatio || ![10, 20, 30, 40, 50, 60, 70].includes(Number(parsed.defaultRatio))) {
          parsed.defaultRatio = 30;
        } else {
          parsed.defaultRatio = Number(parsed.defaultRatio);
        }
        if (!parsed.githubConfig || typeof parsed.githubConfig !== "object") {
          parsed.githubConfig = {
            username: "daehann",
            repoPath: "https://github.com/daehann/yousunsaeng",
            branch: "main",
            subpath: "",
            includeDb: true
          };
        }
        if (Array.isArray(parsed.templates) && !parsed.templates.some((t) => t.id === "freeform" || t.isFreeform)) {
          const freeTpl = DEFAULT_TEMPLATES.find((t) => t.id === "freeform");
          if (freeTpl) parsed.templates.push({ ...freeTpl });
        }
        return parsed;
      }
    }
  } catch (e) {
    console.warn("State load fallback:", e);
  }
  return {
    categories: DEFAULT_CATEGORIES,
    templates: DEFAULT_TEMPLATES,
    accounts: DEFAULT_ACCOUNTS,
    summaries: INITIAL_SUMMARIES,
    currentSummaryId: INITIAL_SUMMARIES[0]?.id || 1,
    activeCategoryFilter: "전체",
    activePublicCategoryFilter: "전체",
    publicBookmarkOnly: false,
    searchQuery: "",
    publicSearchQuery: "",
    sortAsc: false,
    defaultRatio: 30,
    githubConfig: {
      username: "daehann",
      repoPath: "https://github.com/daehann/yousunsaeng",
      branch: "main",
      subpath: "",
      includeDb: true
    },
    selectedAiModel: "free-gemini",
    apiKey: DEFAULT_GEMINI_KEY,
    modelApiKeys: {
      "vscode-gemini4": DEFAULT_GEMINI_KEY,
      "free-gemini": DEFAULT_GEMINI_KEY,
      "free-openai": DEFAULT_GEMINI_KEY
    },
    kakaoJsKey: ""
  };
}

const state = loadAppState();

function persistTemplatesImmediately() {
  saveLocalState();
  return flushAppState().catch(reportSaveError);
}

let saveServerTimer = null;
let serverBaseline = null;
let saveQueue = Promise.resolve();
let syncInFlight = false;
let batchRunning = false;
let cacheWarningShown = false;
const recoveryTabId = sessionStorage.getItem("recovery-tab-id") || crypto.randomUUID();
sessionStorage.setItem("recovery-tab-id", recoveryTabId);
const journalId = `pending:${recoveryTabId}`;
let recoveryBlocked = false;
let pendingRecoveryRecords = [];
let journalQueue = Promise.resolve();

function journalPending() {
  if (!serverBaseline || recoveryBlocked) return journalQueue;
  const record = {id: journalId, kind: "pending", time: Date.now(),
    base: SummarySync.clone(serverBaseline), local: SummarySync.clone(state)};
  journalQueue = journalQueue.catch(reportSaveError).then(() =>
    SummarySync.equal(SummarySync.persistent(record.base), SummarySync.persistent(record.local))
      ? PendingStore.remove(journalId) : PendingStore.put(record));
  return journalQueue;
}

document.getElementById("recovery-export-btn")?.addEventListener("click", () => {
  triggerFileDownload("You선생_미저장본_복구.json", JSON.stringify(pendingRecoveryRecords, null, 2), "application/json");
});
document.getElementById("recovery-discard-btn")?.addEventListener("click", async () => {
  if (!confirm("미저장본 백업을 먼저 받으세요. 복구 대기 변경 대신 서버 최신본을 사용하시겠습니까?")) return;
  try {
    for (const record of pendingRecoveryRecords) await PendingStore.remove(record.id);
    pendingRecoveryRecords = [];
    recoveryBlocked = false;
    serverBaseline = null;
    await syncLatestState(true);
    document.getElementById("recovery-export-btn").hidden = true;
    document.getElementById("recovery-discard-btn").hidden = true;
  } catch (error) { reportSaveError(error); }
});

function saveLocalState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    try {
      // If localStorage hits 5MB quota, store compact copy in localStorage while full state is kept in IndexedDB
      const compactState = {
        ...state,
        summaries: (state.summaries || []).map((s, idx) =>
          idx < 10 ? s : { ...s, scriptSegments: [] }
        )
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compactState));
    } catch (innerErr) {
      console.error("Browser cache save failed", innerErr);
    }
  }
}

function setPersistenceStatus(message, failed = false) {
  const el = document.getElementById("persistence-status");
  if (el) {
    el.textContent = message;
    el.style.color = failed ? "#b42318" : "";
  }
}

function reportSaveError(error) {
  console.error("State save failed", error);
  setPersistenceStatus(`저장 미완료: ${error.message}`, true);
  showToast(`저장 미완료: ${error.message}`);
}

function applyServerState(remote, base, submitted) {
  const currentKey = state.summaries.find((s) => s.id === state.currentSummaryId);
  const latestKey = state.summaries.find((s) => s.id === latestCreatedSummaryId);
  const localView = Object.fromEntries([...SummarySync.localKeys].map((k) => [k, state[k]]));
  const merged = submitted ? SummarySync.rebase(submitted, state, remote) : remote;
  Object.assign(state, merged, localView);
  state.summaries.sort((a, b) => b.id - a.id);
  if (currentKey) {
    state.currentSummaryId = state.summaries.find((s) => SummarySync.key(s) === SummarySync.key(currentKey))?.id
      ?? state.summaries[0]?.id ?? null;
  }
  if (latestKey) {
    latestCreatedSummaryId = state.summaries.find((s) => SummarySync.key(s) === SummarySync.key(latestKey))?.id ?? null;
  }
  serverBaseline = SummarySync.clone(base);
  saveLocalState();
  reconcileBatchResults();
}

function refreshSummaryLists() {
  renderCategoriesUI();
  renderResultsLibrary();
  renderPublicView();
}

async function persistWebStandaloneState(submitted) {
  const nextState = SummarySync.clone(submitted);
  nextState._revision = (serverBaseline?._revision || nextState._revision || 0) + 1;
  await PendingStore.put({
    id: "web_state_backup",
    kind: "web_state",
    time: Date.now(),
    state: SummarySync.persistent(nextState)
  });
  applyServerState(nextState, nextState, null);
  await PendingStore.remove(journalId);
  refreshSummaryLists();

  const ghToken = getStoredGithubToken();
  if (ghToken) {
    setPersistenceStatus("웹 브라우저 저장 완료 · GitHub 클라우드 DB 동기화 중…");
    try {
      const ghRes = await pushWebStateToGithubRepo(nextState);
      if (ghRes.ok) {
        setPersistenceStatus(`웹 + GitHub 클라우드 저장 완료 · ${nextState.summaries.length}개 (${ghRes.commitSha})`);
        return;
      }
    } catch (ghErr) {
      console.warn("GitHub cloud sync warning:", ghErr);
      setPersistenceStatus(`웹 브라우저 저장 완료 · ${nextState.summaries.length}개 (GitHub 동기화 대기)`);
      return;
    }
  }
  setPersistenceStatus(`웹 브라우저 저장 완료 · ${nextState.summaries.length}개`);
}

function flushAppState() {
  window.clearTimeout(saveServerTimer);
  const operation = saveQueue.then(async () => {
    if (recoveryBlocked) throw new Error("미저장본 복구 충돌을 먼저 해결해 주세요.");
    if (!serverBaseline) {
      serverBaseline = SummarySync.clone(state);
    }
    const knownKeys = new Set(serverBaseline.summaries.map(SummarySync.key));
    for (const item of state.summaries) {
      if (!item.uid && !knownKeys.has(SummarySync.key(item))) item.uid = crypto.randomUUID();
    }
    await journalPending();

    const isStaticWebMode = document.body.classList.contains("static-public-mode") && location.port !== "18765";
    if (isStaticWebMode) {
      const submitted = SummarySync.clone(state);
      if (SummarySync.equal(SummarySync.persistent(submitted), SummarySync.persistent(serverBaseline))) return;
      await persistWebStandaloneState(submitted);
      return;
    }

    for (let attempt = 0; attempt < 4; attempt++) {
      const submitted = SummarySync.clone(state);
      if (SummarySync.equal(SummarySync.persistent(submitted), SummarySync.persistent(serverBaseline))) return;
      setPersistenceStatus("서버에 저장 중…");
      let res;
      try {
        res = await fetch(STATE_API_URL, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            protocol: 2, revision: serverBaseline._revision || 0,
            state: SummarySync.persistent(submitted)
          }),
          signal: AbortSignal.timeout(30000)
        });
      } catch (networkErr) {
        if (location.port === "18765") throw networkErr;
        document.body.classList.add("static-public-mode");
        await persistWebStandaloneState(submitted);
        return;
      }
      const data = await res.json();
      if (res.status === 409 && data.conflict && data.state) {
        const merged = SummarySync.rebase(serverBaseline, submitted, data.state);
        applyServerState(merged, data.state, submitted);
        continue;
      }
      if (!res.ok || !data.ok || !Array.isArray(data.state?.summaries)) {
        throw new Error(data.error || `서버 저장 오류 (${res.status})`);
      }
      applyServerState(data.state, data.state, submitted);
      await journalPending();
      refreshSummaryLists();
      setPersistenceStatus(`서버 저장 확인 · ${data.state.summaries.length}개`);
      return;
    }
    throw new Error("다른 창의 변경이 계속되어 저장하지 못했습니다. 다시 저장해 주세요.");
  });
  // Keep the queue usable after a failed request; the caller still receives the rejection.
  saveQueue = operation.catch(reportSaveError);
  return operation;
}

function saveAppState() {
  saveLocalState();
  journalPending().catch(reportSaveError);
  window.clearTimeout(saveServerTimer);
  saveServerTimer = window.setTimeout(() => {
    flushAppState().catch(reportSaveError);
  }, 150);
}

let lastServerSyncTime = 0;

async function syncStateFromServerOnBoot() {
  await syncLatestState(true);
  await restoreBatch();
}

async function syncLatestState(initial = false) {
  if (syncInFlight || (!initial && batchRunning)) return;
  if (!initial && document.body.classList.contains("static-public-mode") && location.port !== "18765") {
    return;
  }
  if (
    !initial &&
    serverBaseline &&
    Date.now() - lastServerSyncTime < 10000 &&
    SummarySync.equal(SummarySync.persistent(state), SummarySync.persistent(serverBaseline))
  ) {
    return;
  }
  initial = initial || !serverBaseline;
  syncInFlight = true;
  const startBtn = document.getElementById("start-summary-btn");
  if (initial) startBtn.disabled = true;
  try {
    if (!initial && serverBaseline) await flushAppState();
    const submitted = SummarySync.clone(state);
    const baselineAtRead = serverBaseline;
    const res = await fetch(STATE_API_URL, {cache: "no-store", signal: AbortSignal.timeout(15000)});
    const data = await res.json();
    if (!res.ok || !data.ok || !Array.isArray(data.state?.summaries)) {
      throw new Error(data.error || "서버 데이터를 읽지 못했습니다.");
    }
    lastServerSyncTime = Date.now();
    document.body.classList.remove("static-public-mode");
    if (serverBaseline && (data.state._revision || 0) < (serverBaseline._revision || 0)) return;
    let merged = initial ? data.state : SummarySync.rebase(baselineAtRead, submitted, data.state);
    if (initial) {
      pendingRecoveryRecords = (await PendingStore.all()).filter(r => r.kind === "pending");
      try {
        for (const record of pendingRecoveryRecords) merged = SummarySync.rebase(record.base, record.local, merged);
      } catch (error) {
        recoveryBlocked = true;
        document.getElementById("recovery-export-btn").hidden = false;
        document.getElementById("recovery-discard-btn").hidden = false;
        throw error;
      }
    }
    applyServerState(merged, data.state, submitted);
    if (initial && pendingRecoveryRecords.length) {
      await journalPending();
      await flushAppState();
      for (const record of pendingRecoveryRecords) await PendingStore.remove(record.id);
      pendingRecoveryRecords = [];
      showToast("미저장 결과를 복구하여 서버 저장을 확인했습니다.");
    }
    syncAiModelInputsUI();
    syncDefaultRatioUI(false);
    syncGithubConfigUI();
    syncAdminAuthUI();
    renderAccountsUI();
    renderTemplatesUI();
    refreshSummaryLists();
    if (initial) {
      renderSummaryDetail(state.currentSummaryId);
      showPage();
    }
    setPersistenceStatus(`최신 데이터 확인 · ${state.summaries.length}개`);
  } catch (error) {
    if (location.port !== "18765") {
      try {
        let data = null;
        try {
          const res = await fetch("./summaries_db.json", {cache: "no-store"});
          if (res.ok) data = await res.json();
        } catch (fetchErr) {
          // ignore and use local state
        }
        if (!data || !Array.isArray(data.summaries)) {
          data = SummarySync.clone(state);
        }
        // Merge any summaries saved in browser IndexedDB web_state_backup on top of summaries_db.json
        const allRecords = await PendingStore.all().catch(() => []);
        const webBackup = allRecords.find((r) => r.id === "web_state_backup" && r.state && Array.isArray(r.state.summaries));
        let mergedWebState = data;
        if (webBackup) {
          try {
            if ((webBackup.state._revision || 0) >= (data._revision || 0)) {
              mergedWebState = SummarySync.rebase(data, webBackup.state, data);
              mergedWebState._revision = Math.max(webBackup.state._revision || 0, data._revision || 0);
            }
          } catch (mergeErr) {
            mergedWebState = webBackup.state;
          }
        }
        applyServerState(mergedWebState, mergedWebState, null);
        document.body.classList.add("static-public-mode");
        syncAiModelInputsUI();
        syncDefaultRatioUI(false);
        syncGithubConfigUI();
        syncAdminAuthUI();
        renderAccountsUI();
        renderTemplatesUI();
        refreshSummaryLists();
        if (initial) {
          renderSummaryDetail(state.currentSummaryId);
        }
        const hasGhToken = Boolean(getStoredGithubToken());
        setPersistenceStatus(
          hasGhToken
            ? `웹 단독 모드 (GitHub 클라우드 자동저장 활성) · ${state.summaries.length}개`
            : `웹 단독 모드 (브라우저 즉시 저장 활성) · ${state.summaries.length}개`
        );
        if (!isAdminLoggedIn() && (!window.location.hash || (!window.location.hash.startsWith("#view") && !window.location.hash.startsWith("#admin")))) {
          window.location.hash = "view";
        } else {
          showPage();
        }
      } catch (fallbackError) {
        reportSaveError(fallbackError);
      }
    } else {
      reportSaveError(error);
    }
  } finally {
    syncInFlight = false;
    if (initial) startBtn.disabled = !serverBaseline || recoveryBlocked;
  }
}

window.addEventListener("focus", () => syncLatestState());
window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY || !event.newValue) return;
  try {
    const changed = JSON.parse(event.newValue);
    if ((changed._revision || 0) > (serverBaseline?._revision || 0)) syncLatestState();
  } catch (error) {
    console.error("Invalid state notification", error);
  }
});
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) syncLatestState();
});
window.addEventListener("beforeunload", (event) => {
  if (recoveryBlocked || batchRunning || (serverBaseline && !SummarySync.equal(
    SummarySync.persistent(state), SummarySync.persistent(serverBaseline)
  ))) {
    event.preventDefault();
    event.returnValue = "";
  }
});

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("demo-toast");
  const msgEl = document.getElementById("toast-message");
  if (msgEl) msgEl.textContent = message;
  toast.hidden = false;
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.hidden = true;
  }, 3200);
}

function getCategoryColor(catName) {
  const found = state.categories.find((c) => c.name === catName);
  return found ? found.color : "gray";
}

function getActiveAccount() {
  return state.accounts.find((a) => a.active) || state.accounts[0];
}

// 1. VS Code Account UI
function renderAccountsUI() {
  const active = getActiveAccount();
  document.getElementById("sidebar-avatar").textContent = active.initial;
  document.getElementById("sidebar-account-name").textContent = active.name;
  document.getElementById("sidebar-account-provider").textContent = `VS Code · ${active.provider} 연동됨`;
  document.getElementById("topbar-account-label").textContent = `VS Code: ${active.name} (${active.provider})`;
  document.getElementById("topbar-avatar").textContent = active.initial;
  const aiCardAcc = document.getElementById("ai-card-account-name");
  if (aiCardAcc) aiCardAcc.textContent = active.name;
  const listEl = document.getElementById("vscode-account-list");
  if (!listEl) return;
  listEl.innerHTML = state.accounts
    .map(
      (acc) => `
      <button type="button" class="account-item ${acc.active ? "active" : ""}" data-select-account="${escapeHtml(acc.id)}">
        <span class="avatar">${escapeHtml(acc.initial)}</span>
        <div class="account-item-info">
          <strong>${escapeHtml(acc.name)}</strong>
          <small>${escapeHtml(acc.provider)} · ${escapeHtml(acc.handle)}</small>
        </div>
        ${acc.active ? '<span class="account-badge">연결됨</span>' : '<span class="text-button">전환</span>'}
      </button>
    `
    )
    .join("");

  listEl.querySelectorAll("[data-select-account]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.selectAccount;
      state.accounts.forEach((a) => {
        a.active = a.id === id;
      });
      saveAppState();
      renderAccountsUI();
      showToast(`VS Code 계정이 ‘${getActiveAccount().name}’(${getActiveAccount().provider})으로 전환되었습니다.`);
    });
  });
}

document.getElementById("add-account-btn")?.addEventListener("click", () => {
  const nameInput = document.getElementById("new-account-name");
  const providerSelect = document.getElementById("new-account-provider");
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.focus();
    showToast("추가할 계정 이름을 입력해주세요.");
    return;
  }
  const provider = providerSelect.value;
  const initial = name.charAt(0).toUpperCase();
  state.accounts.forEach((a) => (a.active = false));
  state.accounts.push({
    id: `acc-${Date.now()}`,
    name,
    handle: `${name.toLowerCase().replace(/\s+/g, "")}@${provider.toLowerCase()}.com`,
    provider,
    initial,
    active: true
  });
  nameInput.value = "";
  saveAppState();
  renderAccountsUI();
  showToast(`새 VS Code 계정 ‘${name}’이 추가 및 연결되었습니다.`);
});

// 2. Categories Rendering & Management
function getCategoryCount(catName) {
  if (catName === "전체") return state.summaries.length;
  if (catName === "즐겨찾기") return state.summaries.filter((s) => s.bookmarked).length;
  return state.summaries.filter((s) => (s.categories || ["미정"]).includes(catName)).length;
}

function getCategoryNumberedLabel(catName, fallbackIdx = null) {
  const idx = state.categories.findIndex((c) => c.name === catName);
  const num = idx >= 0 ? idx + 1 : fallbackIdx;
  const cleanName = String(catName || "").replace(/^\d+\.\s*/, "");
  return num ? `${num}. ${cleanName}` : cleanName;
}

let draggedCategoryIdx = null;

function reorderCategoryByIndices(fromIdx, toIdx) {
  if (
    fromIdx === null ||
    toIdx === null ||
    fromIdx === toIdx ||
    fromIdx < 0 ||
    toIdx < 0 ||
    fromIdx >= state.categories.length ||
    toIdx >= state.categories.length
  ) {
    return false;
  }
  const [moved] = state.categories.splice(fromIdx, 1);
  state.categories.splice(toIdx, 0, moved);
  saveAppState();
  renderCategoriesUI();
  renderResultsLibrary();
  renderPublicView();
  renderSummaryDetail(state.currentSummaryId);
  reconcileBatchResults();
  showToast(`‘${getCategoryNumberedLabel(moved.name)}’ 분류 순서가 변경되었습니다.`);
  return true;
}

function bindCategoryDragEvents(container, itemSelector) {
  if (!container) return;
  const items = [...container.querySelectorAll(itemSelector)];
  items.forEach((el) => {
    el.addEventListener("dragstart", (e) => {
      draggedCategoryIdx = Number(el.dataset.catIdx);
      el.classList.add("cat-dragging");
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", String(draggedCategoryIdx));
      }
    });
    el.addEventListener("dragend", () => {
      draggedCategoryIdx = null;
      items.forEach((row) => row.classList.remove("cat-dragging", "cat-drag-over"));
    });
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
      items.forEach((row) => row.classList.toggle("cat-drag-over", row === el));
    });
    el.addEventListener("dragleave", () => {
      el.classList.remove("cat-drag-over");
    });
    el.addEventListener("drop", (e) => {
      e.preventDefault();
      el.classList.remove("cat-drag-over");
      const targetIdx = Number(el.dataset.catIdx);
      const fromIdx =
        draggedCategoryIdx !== null
          ? draggedCategoryIdx
          : Number(e.dataTransfer?.getData("text/plain"));
      reorderCategoryByIndices(fromIdx, targetIdx);
    });
  });
}

function renderCategoriesUI() {
  // Sidebar nav (show categories with numbering prefix, active highlight, and drag-to-reorder)
  const sidebarNav = document.querySelector(".category-nav");
  if (sidebarNav) {
    sidebarNav.innerHTML = state.categories
      .map(
        (cat, idx) => `
        <a href="#results" draggable="true" data-cat-idx="${idx}" title="드래그하여 분류 순서 변경" class="${state.activeCategoryFilter === cat.name ? "active" : ""}" data-sidebar-cat="${escapeHtml(cat.name)}">
          <span class="cat-drag-grip" aria-hidden="true">⋮⋮</span><span class="dot ${escapeHtml(cat.color || "sage")}"></span><strong class="cat-num">${idx + 1}.</strong> ${escapeHtml(cat.name)}<span>${getCategoryCount(cat.name)}</span>
        </a>
      `
      )
      .join("");
    sidebarNav.querySelectorAll("[data-sidebar-cat]").forEach((a) => {
      a.addEventListener("click", () => {
        state.activeCategoryFilter = a.dataset.sidebarCat;
        currentLibraryPage = 1;
        saveAppState();
        renderCategoriesUI();
        renderResultsLibrary();
      });
    });
    bindCategoryDragEvents(sidebarNav, "[data-cat-idx]");
  }

  // Results page filter tabs: 전체 | 즐겨찾기 | 1. 기도 | 2. 믿음 | 3. 미정 (draggable)
  const resultsTabs = document.querySelector("#results .filter-tabs");
  if (resultsTabs) {
    const allBtn = `<button type="button" class="filter ${state.activeCategoryFilter === "전체" ? "active" : ""}" data-filter-cat="전체">전체 <span>${state.summaries.length}</span></button>`;
    const bmBtn = `<button type="button" class="filter ${state.activeCategoryFilter === "즐겨찾기" ? "active" : ""}" data-filter-cat="즐겨찾기">${iconSvg("bookmark")}즐겨찾기 <span>${getCategoryCount("즐겨찾기")}</span></button>`;
    const catBtns = state.categories
      .map(
        (cat, idx) => `
        <button type="button" draggable="true" data-cat-idx="${idx}" title="드래그하여 분류 순서 변경" class="filter ${state.activeCategoryFilter === cat.name ? "active" : ""}" data-filter-cat="${escapeHtml(cat.name)}">
          ${cat.name !== "미정" ? `<span class="dot ${escapeHtml(cat.color || "sage")}"></span>` : ""}${idx + 1}. ${escapeHtml(cat.name)} <span>${getCategoryCount(cat.name)}</span>
        </button>
      `
      )
      .join("");
    resultsTabs.innerHTML = allBtn + bmBtn + catBtns;
    resultsTabs.querySelectorAll("[data-filter-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeCategoryFilter = btn.dataset.filterCat;
        currentLibraryPage = 1;
        saveAppState();
        renderCategoriesUI();
        renderResultsLibrary();
      });
    });
    bindCategoryDragEvents(resultsTabs, "[data-cat-idx]");
  }

  // Public view page filter tabs: 전체 | 즐겨찾기 | 1. 기도 | 2. 믿음 | 3. 미정
  const publicTabs = document.querySelector("#view .public-filters");
  if (publicTabs) {
    const isAllActive = !state.publicBookmarkOnly && state.activePublicCategoryFilter === "전체";
    const isBmActive = state.publicBookmarkOnly || state.activePublicCategoryFilter === "즐겨찾기";
    const allPub = `<button type="button" class="filter ${isAllActive ? "active" : ""}" data-pub-cat="전체">전체</button>`;
    const bmPub = `<button type="button" class="filter ${isBmActive ? "active" : ""}" data-pub-cat="즐겨찾기">${iconSvg("bookmark")}즐겨찾기 <span>${getCategoryCount("즐겨찾기")}</span></button>`;
    const catPub = state.categories
      .map(
        (cat, idx) => `
        <button type="button" class="filter ${!state.publicBookmarkOnly && state.activePublicCategoryFilter === cat.name ? "active" : ""}" data-pub-cat="${escapeHtml(cat.name)}">${idx + 1}. ${escapeHtml(cat.name)}</button>
      `
      )
      .join("");
    publicTabs.innerHTML = allPub + bmPub + catPub;
    publicTabs.querySelectorAll("[data-pub-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = btn.dataset.pubCat;
        currentPublicPage = 1;
        if (chosen === "즐겨찾기") {
          state.publicBookmarkOnly = true;
          state.activePublicCategoryFilter = "즐겨찾기";
        } else {
          state.publicBookmarkOnly = false;
          state.activePublicCategoryFilter = chosen;
        }
        saveAppState();
        renderCategoriesUI();
        renderPublicView();
      });
    });
  }

  const bulkCatSelect = document.getElementById("bulk-category-select");
  if (bulkCatSelect) {
    bulkCatSelect.innerHTML = state.categories
      .map(
        (c, i) => `<option value="${escapeHtml(c.name)}">${i + 1}. ${escapeHtml(c.name)}</option>`
      )
      .join("");
  }

  // Category Editor Modal (Drag-and-drop + Up/Down buttons)
  const editorList = document.getElementById("category-editor-list");
  if (editorList) {
    editorList.innerHTML = state.categories
      .map((cat, idx) => {
        const moveBtns = `
          <button type="button" class="icon-button" data-move-cat-up="${idx}" title="위로 이동" ${idx === 0 ? "disabled" : ""} style="width:24px;height:24px;font-size:11px">▲</button>
          <button type="button" class="icon-button" data-move-cat-down="${idx}" title="아래로 이동" ${idx === state.categories.length - 1 ? "disabled" : ""} style="width:24px;height:24px;font-size:11px">▼</button>
        `;
        if (cat.fixed || cat.name === "미정") {
          return `<div draggable="true" data-cat-idx="${idx}" data-cat-id="${escapeHtml(cat.id)}" title="드래그하여 분류 순서 변경"><span class="cat-drag-grip" aria-hidden="true">⋮⋮</span><span class="dot gray"></span><strong class="cat-num">${idx + 1}.</strong><span class="fixed-category">미정</span><small>기본 분류 · 삭제 불가</small>${moveBtns}</div>`;
        }
        return `
          <div draggable="true" data-cat-idx="${idx}" data-cat-id="${escapeHtml(cat.id)}" title="드래그하여 분류 순서 변경">
            <span class="cat-drag-grip" aria-hidden="true">⋮⋮</span>
            <span class="dot ${escapeHtml(cat.color || "sage")}"></span>
            <strong class="cat-num">${idx + 1}.</strong>
            <input value="${escapeHtml(cat.name)}" aria-label="${escapeHtml(cat.name)} 분류명 수정">
            ${moveBtns}
            <button type="button" class="icon-button" data-save-cat="${escapeHtml(cat.id)}" title="이름 수정 저장">${iconSvg("edit")}</button>
            <button type="button" class="icon-button" data-del-cat="${escapeHtml(cat.id)}" title="분류 삭제">${iconSvg("trash")}</button>
          </div>
        `;
      })
      .join("");

    bindCategoryDragEvents(editorList, "[data-cat-idx]");

    editorList.querySelectorAll("[data-move-cat-up]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.moveCatUp);
        reorderCategoryByIndices(idx, idx - 1);
      });
    });
    editorList.querySelectorAll("[data-move-cat-down]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.moveCatDown);
        reorderCategoryByIndices(idx, idx + 1);
      });
    });

    editorList.querySelectorAll("[data-save-cat]").forEach((btn) => {
      const saveCatRow = () => {
        const id = btn.dataset.saveCat;
        const row = btn.closest("[data-cat-id]");
        const newName = row.querySelector("input").value.trim().replace(/^\d+\.\s*/, "");
        const target = state.categories.find((c) => c.id === id);
        if (!target || !newName) return;
        const oldName = target.name;
        if (oldName === newName) {
          showToast(`‘${getCategoryNumberedLabel(newName)}’ 분류명이 유지되었습니다.`);
          return;
        }
        target.name = newName;
        state.summaries.forEach((s) => {
          s.categories = (s.categories || ["미정"]).map((c) => (c === oldName ? newName : c));
        });
        saveAppState();
        renderCategoriesUI();
        renderResultsLibrary();
        renderPublicView();
        renderSummaryDetail(state.currentSummaryId);
        reconcileBatchResults();
        showToast(`분류명이 ‘${getCategoryNumberedLabel(newName)}’(으)로 수정되었습니다.`);
      };
      btn.addEventListener("click", saveCatRow);
      const input = btn.closest("[data-cat-id]")?.querySelector("input");
      input?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          saveCatRow();
        }
      });
    });

    editorList.querySelectorAll("[data-del-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.delCat;
        const target = state.categories.find((c) => c.id === id);
        if (!target) return;
        const delName = target.name;
        state.categories = state.categories.filter((c) => c.id !== id);
        state.summaries.forEach((s) => {
          const filtered = (s.categories || []).filter((c) => c !== delName);
          s.categories = filtered.length ? filtered : ["미정"];
        });
        if (state.activeCategoryFilter === delName) state.activeCategoryFilter = "전체";
        saveAppState();
        renderCategoriesUI();
        renderResultsLibrary();
        renderPublicView();
        renderSummaryDetail(state.currentSummaryId);
        showToast(`‘${delName}’ 분류가 삭제되고 번호가 재정렬되었습니다.`);
      });
    });
  }

  // Category Checklist in dark picker modal
  const checklistBox = document.getElementById("category-checklist-box");
  if (checklistBox) {
    let selected = [];
    if (categoryPickerMode === "detail") {
      const curItem = state.summaries.find((s) => s.id === state.currentSummaryId);
      selected = curItem && Array.isArray(curItem.categories) ? curItem.categories : [];
    } else if (activeCategoryButton) {
      selected = JSON.parse(activeCategoryButton.dataset.selectedCategories || "[]");
    }
    checklistBox.innerHTML = state.categories
      .filter((c) => c.name !== "미정")
      .map(
        (cat, idx) => `
        <label>
          <input type="checkbox" value="${escapeHtml(cat.name)}" ${selected.includes(cat.name) ? "checked" : ""}>
          <span><strong>${idx + 1}.</strong> ${escapeHtml(cat.name)}</span>
          ${iconSvg(cat.privacy || "lock")}
        </label>
      `
      )
      .join("");
  }
}

function addNewCategoryByName(rawName) {
  const name = rawName.trim();
  if (!name) {
    showToast("분류 이름을 입력해주세요.");
    return false;
  }
  if (state.categories.some((c) => c.name === name)) {
    showToast("이미 존재하는 분류 이름입니다.");
    return false;
  }
  const palette = ["sage", "purple", "amber", "blue"];
  const color = palette[state.categories.length % palette.length];
  const unsetIdx = state.categories.findIndex((c) => c.name === "미정");
  const newCat = { id: `cat-${Date.now()}`, name, color, privacy: "lock" };
  if (unsetIdx >= 0) {
    state.categories.splice(unsetIdx, 0, newCat);
  } else {
    state.categories.push(newCat);
  }
  saveAppState();
  renderCategoriesUI();
  showToast(`새 분류 ‘${name}’이(가) 추가되었습니다.`);
  return true;
}

document.getElementById("add-category-btn")?.addEventListener("click", () => {
  const input = document.getElementById("new-category-input");
  if (addNewCategoryByName(input.value)) {
    input.value = "";
  }
});
document.getElementById("new-category-input")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("add-category-btn")?.click();
  }
});

document.getElementById("picker-add-category-btn")?.addEventListener("click", () => {
  const input = document.getElementById("picker-new-category-input");
  const name = input.value.trim();
  if (addNewCategoryByName(name)) {
    input.value = "";
    if (categoryPickerMode === "detail") {
      const cb = [...categoryPicker.querySelectorAll('input[type="checkbox"]')].find((el) => el.value === name);
      if (cb) cb.checked = true;
    } else if (activeCategoryButton) {
      const current = JSON.parse(activeCategoryButton.dataset.selectedCategories || "[]");
      current.push(name);
      activeCategoryButton.dataset.selectedCategories = JSON.stringify(current);
      renderCategoriesUI();
    }
  }
});
document.getElementById("picker-new-category-input")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("picker-add-category-btn")?.click();
  }
});

// 3. Video URL Entries (1 by default, dynamic add/remove)
const categoryPicker = document.getElementById("category-picker");
let activeCategoryButton = null;
let categoryPickerMode = "entry"; // "entry" or "detail"

function getDefaultRatio() {
  const val = Number(state.defaultRatio);
  return [10, 20, 30, 40, 50, 60, 70].includes(val) ? val : 30;
}

function getRatioOptionsHtml(selectedVal = null) {
  const def = getDefaultRatio();
  const target = Number(selectedVal) || def;
  return [10, 20, 30, 40, 50, 60, 70]
    .map((r) => `<option value="${r}" ${r === target ? "selected" : ""}>${r}%${r === def ? " ★기본" : ""}</option>`)
    .join("");
}

function syncDefaultRatioUI(applyToUnmodifiedEntries = false) {
  const def = getDefaultRatio();
  const defSelect = document.getElementById("default-ratio-select");
  if (defSelect) defSelect.value = String(def);
  document.querySelectorAll("#video-entries-list .entry-block").forEach((block) => {
    const sel = block.querySelector(".entry-ratio-select");
    if (!sel) return;
    const currentVal = applyToUnmodifiedEntries || !sel.dataset.userModified ? def : Number(sel.value) || def;
    sel.innerHTML = getRatioOptionsHtml(currentVal);
    sel.value = String(currentVal);
    if (applyToUnmodifiedEntries) delete sel.dataset.userModified;
  });
}

document.getElementById("default-ratio-select")?.addEventListener("change", (e) => {
  const nextRatio = Number(e.target.value) || 30;
  state.defaultRatio = nextRatio;
  syncDefaultRatioUI(false);
  saveAppState();
  showToast(`기본 요약률(디폴트)이 ${nextRatio}%로 설정되었습니다.`);
});

document.getElementById("apply-default-ratio-all-btn")?.addEventListener("click", () => {
  const def = getDefaultRatio();
  syncDefaultRatioUI(true);
  showToast(`현재 입력칸 전체의 요약률을 기본값(${def}%)으로 변경했습니다.`);
});

function getTemplateOptionsHtml(selectedVal = "") {
  const defTpl = getDefaultTemplate();
  return `<option value="" ${selectedVal === "" ? "selected" : ""}>자동: ${escapeHtml(defTpl.name)} (현재 기본서식)</option>` + state.templates
    .map((tpl) => {
      const isDef = Boolean(tpl.isDefault) || (tpl.id === defTpl.id);
      const label = `${tpl.name}${isDef ? " ★기본" : ""}`;
      const value = tpl.id || "__builtin__";
      return `<option value="${escapeHtml(value)}" ${value === selectedVal ? "selected" : ""}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

async function fetchYoutubeTranscriptInBrowser(url) {
  const vid = extractYoutubeVideoId(url);
  if (!vid) return null;

  // 1. Reuse cached transcript from existing summaries in state if same videoId exists
  const existing = (state.summaries || []).find(
    (s) => extractYoutubeVideoId(s.url) === vid && Array.isArray(s.scriptSegments) && s.scriptSegments.length > 0
  );
  if (existing) {
    const validSegs = existing.scriptSegments.filter((s) => !isGarbageScriptSegmentText(s.text));
    if (validSegs.length > 0) {
      return {
        ok: true,
        noCaptions: false,
        source: "cached_summary_segments",
        title: existing.title || "YouTube 영상",
        channel: existing.channel || "YouTube 채널",
        language: "ko",
        segments: validSegs,
        fullText: validSegs.map((s) => s.text).join(" ")
      };
    }
  }

  // 2. Try CORS-enabled Piped stream APIs to fetch subtitles directly in browser
  const pipedHosts = [
    "https://pipedapi.kavin.rocks",
    "https://pipedapi.tokhmi.xyz",
    "https://pipedapi.moomoo.me"
  ];
  for (const host of pipedHosts) {
    try {
      const pRes = await fetch(`${host}/streams/${encodeURIComponent(vid)}`, {
        signal: AbortSignal.timeout(5000)
      });
      if (!pRes.ok) continue;
      const pData = await pRes.json();
      const subs = Array.isArray(pData.subtitles) ? pData.subtitles : [];
      const chosen =
        subs.find((s) => /^ko/i.test(s.code || "")) ||
        subs.find((s) => /^en/i.test(s.code || "")) ||
        subs[0];
      if (chosen && chosen.url) {
        const subRes = await fetch(chosen.url, { signal: AbortSignal.timeout(5000) });
        if (subRes.ok) {
          const subText = await subRes.text();
          const lines = subText
            .split(/\r?\n/)
            .map((l) => l.replace(/<[^>]+>/g, "").trim())
            .filter((l) => l && !/^\d+$/.test(l) && !l.includes("-->") && !l.startsWith("WEBVTT") && !isGarbageScriptSegmentText(l));
          if (lines.length > 0) {
            const segs = lines.map((text, idx) => {
              const sec = idx * 5;
              const mm = String(Math.floor(sec / 60)).padStart(2, "0");
              const ss = String(sec % 60).padStart(2, "0");
              return { start: sec, time: `${mm}:${ss}`, duration: 5, text };
            });
            return {
              ok: true,
              noCaptions: false,
              source: "browser_piped_captions",
              title: pData.title || "YouTube 영상",
              channel: pData.uploader || "YouTube 채널",
              language: chosen.code || "ko",
              segments: segs,
              fullText: segs.map((s) => s.text).join(" ")
            };
          }
        }
      }
    } catch (e) {
      // continue to next host
    }
  }
  return null;
}

async function fetchYoutubeTranscriptData(url, manualScript = "") {
  const cleanUrl = (url || "").trim();
  const cleanScript = (manualScript || "").trim();

  // 1. Try local Python transcript server (youtube-transcript-api + yt-dlp) if not in static web mode
  const isStaticWebMode = document.body.classList.contains("static-public-mode") && location.port !== "18765";
  if (!isStaticWebMode) {
    try {
      const res = await fetch(TRANSCRIPT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(12000),
        body: JSON.stringify({ url: cleanUrl, script: cleanScript })
      });
      const data = await res.json().catch(() => null);
      if (data) {
        const validSegments = Array.isArray(data.segments)
          ? data.segments.filter((s) => !isGarbageScriptSegmentText(s.text))
          : [];
        if (validSegments.length > 0) {
          return {
            ok: true,
            noCaptions: false,
            source: data.source || "youtube_transcript_api",
            title: data.title || "YouTube 영상",
            channel: data.channel || "YouTube 채널",
            language: data.language || "ko",
            segments: validSegments,
            fullText: validSegments.map((s) => s.text).join(" ")
          };
        }
        if (data.noCaptions && !cleanScript) {
          return {
            ok: false,
            noCaptions: true,
            source: "no_captions",
            title: data.title || "YouTube 영상",
            channel: data.channel || "YouTube 채널",
            language: "ko",
            segments: [],
            fullText: ""
          };
        }
      }
    } catch (e) {
      // Server unreachable or blocked -> fallback to browser extraction
    }
  }

  // 2. If user typed or pasted script directly in browser
  const meta = await fetchYoutubeMetadata(cleanUrl);
  if (cleanScript) {
    const segs = parseRawScriptToSegments(cleanScript).filter((s) => !isGarbageScriptSegmentText(s.text));
    return {
      ok: true,
      noCaptions: false,
      source: "manual_script",
      title: meta.title,
      channel: meta.channel,
      language: "ko",
      segments: segs,
      fullText: segs.map((s) => s.text).join(" ")
    };
  }

  // 3. Try browser-side YouTube caption extraction (cached segments / Piped CORS API)
  const browserTr = await fetchYoutubeTranscriptInBrowser(cleanUrl);
  if (browserTr && browserTr.segments && browserTr.segments.length > 0) {
    return browserTr;
  }

  // 4. No captions detected
  return {
    ok: false,
    noCaptions: true,
    source: "no_captions",
    title: meta.title,
    channel: meta.channel,
    language: "ko",
    segments: [],
    fullText: ""
  };
}

function bindVideoEntryEvents(blockEl) {
  const entryEl = blockEl.classList.contains("entry-block")
    ? blockEl
    : blockEl.closest(".entry-block") || blockEl;
  const pickerBtn = entryEl.querySelector("[data-category-picker]");
  const ratioSelectEl = entryEl.querySelector(".entry-ratio-select");
  ratioSelectEl?.addEventListener("change", () => {
    ratioSelectEl.dataset.userModified = "1";
  });
  pickerBtn?.addEventListener("click", () => {
    categoryPickerMode = "entry";
    activeCategoryButton = pickerBtn;
    document.getElementById("picker-entry-number").textContent = entryEl.dataset.entry;
    renderCategoriesUI();
    categoryPicker.showModal();
  });

  const toggleScriptBtn = entryEl.querySelector("[data-toggle-script]");
  const scriptDrawer = entryEl.querySelector("[data-script-drawer]");
  toggleScriptBtn?.addEventListener("click", () => {
    if (!scriptDrawer) return;
    scriptDrawer.hidden = !scriptDrawer.hidden;
    if (!scriptDrawer.hidden) {
      scriptDrawer.querySelector("textarea")?.focus();
    }
  });

  const fetchScriptBtn = entryEl.querySelector("[data-fetch-script]");
  fetchScriptBtn?.addEventListener("click", async () => {
    const urlInput = entryEl.querySelector('input[type="url"]');
    const url = urlInput?.value.trim() || "";
    if (!url) {
      urlInput?.focus();
      showToast("먼저 유튜브 영상 URL을 입력해주세요.");
      return;
    }
    const statusBadge = entryEl.querySelector("[data-script-status]");
    const textarea = entryEl.querySelector(".entry-script-textarea");
    fetchScriptBtn.disabled = true;
    if (statusBadge) statusBadge.textContent = "유튜브 자막·스크립트 추출 중...";

    const tr = await fetchYoutubeTranscriptData(url, "");
    fetchScriptBtn.disabled = false;
    if (urlInput.value.trim() !== url) return;
    entryEl.dataset.fetchedTitle = tr.title || "";
    entryEl.dataset.fetchedChannel = tr.channel || "";

    if (tr.noCaptions || !tr.segments || tr.segments.length === 0) {
      delete entryEl.dataset.fetchedSegments;
      delete entryEl.dataset.fetchedRawText;
      if (statusBadge) {
        statusBadge.textContent = `⚠️ 자막 없음 (${tr.title}) · [요약 시작하기] 클릭 시 오디오 파일 지원 여부를 묻고 AI로 요약합니다`;
        statusBadge.classList.add("loaded");
      }
      showToast(`‘${tr.title}’ 영상은 자막이 없습니다. 요약 시작 시 오디오 파일 AI 요약을 선택할 수 있습니다.`);
      return;
    }

    entryEl.dataset.fetchedSegments = JSON.stringify(tr.segments || []);
    entryEl.dataset.fetchedUrl = url;
    const formattedLines = (tr.segments || []).map((s) => `[${s.time}] ${s.text}`).join("\n");
    entryEl.dataset.fetchedRawText = formattedLines;
    if (textarea) textarea.value = formattedLines;
    if (scriptDrawer) scriptDrawer.hidden = false;
    if (statusBadge) {
      statusBadge.textContent = `스크립트 추출 완료 (${tr.segments.length}개 구간 · ${tr.title})`;
      statusBadge.classList.add("loaded");
    }
    showToast(`‘${tr.title}’ 영상의 스크립트 ${tr.segments.length}개 구간을 불러왔습니다.`);
  });

  const urlInputEl = entryEl.querySelector('input[type="url"]');
  let urlPreviewTimer = null;
  urlInputEl?.addEventListener("paste", (event) => {
    const text = event.clipboardData?.getData("text") || "";
    if (text.trim().split(/[\s,]+/).length < 2) return;
    event.preventDefault();
    try {
      const urls = SummarySync.parseUrls(text);
      let previous = entryEl;
      urls.forEach((url, index) => {
        const row = index === 0 ? entryEl : createVideoEntryRow(
          document.querySelectorAll("#video-entries-list .entry-block").length + 1
        );
        if (index > 0) {
          row.querySelector(".entry-ratio-select").value = entryEl.querySelector(".entry-ratio-select").value;
          row.querySelector("[data-template-select]").value = entryEl.querySelector("[data-template-select]").value;
          const targetPicker = row.querySelector("[data-category-picker]");
          targetPicker.dataset.selectedCategories = pickerBtn.dataset.selectedCategories || "[]";
          targetPicker.querySelector("[data-category-value]").textContent = pickerBtn.querySelector("[data-category-value]").textContent;
          previous.after(row);
        }
        const input = row.querySelector('input[type="url"]');
        input.value = url;
        input.dispatchEvent(new Event("input", {bubbles: true}));
        previous = row;
      });
      renumberVideoEntries();
      showToast(`${urls.length}개의 URL을 영상별 입력칸으로 나누었습니다.`);
    } catch (error) {
      showToast(error.message);
    }
  });
  urlInputEl?.addEventListener("input", () => {
    const val = urlInputEl.value.trim();
    const statusBadge = entryEl.querySelector("[data-script-status]");
    if (val && ratioSelectEl && !ratioSelectEl.dataset.userModified) {
      ratioSelectEl.innerHTML = getRatioOptionsHtml(getDefaultRatio());
      ratioSelectEl.value = String(getDefaultRatio());
    }
    if (entryEl.dataset.fetchedUrl !== val) {
      const textarea = entryEl.querySelector(".entry-script-textarea");
      if (textarea && textarea.value === entryEl.dataset.fetchedRawText) textarea.value = "";
      ["fetchedSegments", "fetchedRawText", "fetchedUrl", "fetchedTitle", "fetchedChannel"].forEach((key) => delete entryEl.dataset[key]);
    }
    window.clearTimeout(urlPreviewTimer);
    if (!val) {
      if (statusBadge) {
        statusBadge.textContent = "URL을 붙여넣으면 영상 제목·채널명을 자동으로 확인합니다";
        statusBadge.classList.remove("loaded");
      }
      return;
    }
    urlPreviewTimer = window.setTimeout(async () => {
      if (statusBadge) statusBadge.textContent = "영상 정보를 확인하고 있습니다...";
      const vid = extractYoutubeVideoId(val);
      const dupItem = state.summaries.find(
        (s) => (vid && extractYoutubeVideoId(s.url) === vid) || s.url === val
      );
      const meta = await fetchYoutubeMetadata(val);
      if (urlInputEl.value.trim() !== val) return;
      if (statusBadge) {
        if (dupItem) {
          statusBadge.innerHTML = `⚠️ 이미 요약된 영상입니다 (<a href="#summary" data-open-dup="${dupItem.id}" style="text-decoration:underline;font-weight:700">#${dupItem.id} ${escapeHtml(dupItem.title.slice(0, 26))}… 바로 보기</a>)`;
          statusBadge.querySelector("[data-open-dup]")?.addEventListener("click", () => {
            state.currentSummaryId = dupItem.id;
            saveAppState();
            renderSummaryDetail(dupItem.id);
          });
        } else {
          statusBadge.textContent = `📺 확인됨: ${meta.title} (${meta.channel})`;
        }
        statusBadge.classList.add("loaded");
      }
    }, 350);
  });

  const removeBtn = entryEl.querySelector(".entry-remove");
  removeBtn?.addEventListener("click", () => {
    const list = document.getElementById("video-entries-list");
    const allEntries = list.querySelectorAll(".entry-block");
    if (allEntries.length <= 1) {
      const input = entryEl.querySelector('input[type="url"]');
      if (input) input.value = "";
      const textarea = entryEl.querySelector(".entry-script-textarea");
      if (textarea) textarea.value = "";
      delete entryEl.dataset.fetchedSegments;
      pickerBtn.dataset.selectedCategories = "[]";
      pickerBtn.querySelector("[data-category-value]").textContent = "미정";
      if (ratioSelectEl) {
        delete ratioSelectEl.dataset.userModified;
        ratioSelectEl.innerHTML = getRatioOptionsHtml(getDefaultRatio());
        ratioSelectEl.value = String(getDefaultRatio());
      }
      showToast("최소 1개의 URL 입력칸은 유지됩니다. 입력 내용을 초기화했어요.");
      return;
    }
    entryEl.remove();
    renumberVideoEntries();
  });
}

function renumberVideoEntries() {
  const list = document.getElementById("video-entries-list");
  list.querySelectorAll(".entry-block").forEach((block, idx) => {
    const num = idx + 1;
    block.dataset.entry = String(num);
    const row = block.querySelector(".video-entry");
    if (row) row.dataset.entry = String(num);
    const idxSpan = block.querySelector(".url-index");
    if (idxSpan) idxSpan.textContent = String(num);
    for (const [prefix, selector] of [
      ["video-url", 'input[type="url"]'], ["ratio", ".entry-ratio-select"],
      ["template", "[data-template-select]"]
    ]) {
      const control = block.querySelector(selector);
      const label = block.querySelector(`label[for="${control.id}"]`);
      control.id = `${prefix}-${num}`;
      if (label) label.htmlFor = control.id;
    }
    block.querySelector(".entry-category > .field-label").id = `category-label-${num}`;
    block.querySelector("[data-category-value]").id = `category-value-${num}`;
    block.querySelector("[data-category-picker]").setAttribute("aria-labelledby", `category-label-${num} category-value-${num}`);
    const removeBtn = block.querySelector(".entry-remove");
    if (removeBtn) removeBtn.setAttribute("aria-label", `URL ${num} 삭제`);
  });
}

function createVideoEntryRow(index) {
  const block = document.createElement("div");
  block.className = "entry-block";
  block.dataset.entry = String(index);
  block.innerHTML = `
    <div class="video-entry" data-entry="${index}">
      <div class="entry-url">
        <label class="field-label" for="video-url-${index}">영상 URL <span>*</span></label>
        <div class="url-field"><span class="url-index">${index}</span>${iconSvg("youtube")}<input id="video-url-${index}" type="url" placeholder="https://www.youtube.com/watch?v=…"></div>
      </div>
      <div class="entry-category">
        <span class="field-label" id="category-label-${index}">분류</span>
        <button type="button" class="entry-category-button" data-category-picker aria-labelledby="category-label-${index} category-value-${index}" aria-haspopup="dialog" aria-controls="category-picker">${iconSvg("bookmark")}<span id="category-value-${index}" data-category-value>미정</span>${iconSvg("chevron-down")}</button>
      </div>
      <div class="entry-ratio">
        <label class="field-label" for="ratio-${index}">요약률</label>
        <select id="ratio-${index}" class="entry-ratio-select">${getRatioOptionsHtml(getDefaultRatio())}</select>
      </div>
      <div class="entry-template">
        <label class="field-label" for="template-${index}">요약 서식</label>
        <select id="template-${index}" data-template-select>${getTemplateOptionsHtml()}</select>
      </div>
      <button type="button" class="icon-button entry-remove" aria-label="URL ${index} 삭제">${iconSvg("x")}</button>
    </div>
    <div class="entry-script-box">
      <div class="entry-script-toolbar">
        <button type="button" class="script-action-btn" data-fetch-script>${iconSvg("file")}유튜브 자막 · 스크립트 자동 불러오기</button>
        <button type="button" class="script-action-btn secondary" data-toggle-script>${iconSvg("edit")}스크립트 확인 / 직접 붙여넣기</button>
        <span class="script-status-badge" data-script-status>URL을 붙여넣으면 영상 제목·채널명을 자동으로 확인합니다</span>
      </div>
      <div class="entry-script-drawer" data-script-drawer hidden>
        <textarea class="template-input entry-script-textarea" rows="5" placeholder="유튜브 URL에서 자막/스크립트를 자동으로 추출합니다.&#10;자막이 없는 영상이거나 직접 스크립트를 붙여넣어 요약하고 싶다면 여기에 텍스트를 입력하세요."></textarea>
      </div>
    </div>
  `;
  bindVideoEntryEvents(block);
  return block;
}

document.getElementById("add-url-btn")?.addEventListener("click", () => {
  const list = document.getElementById("video-entries-list");
  const nextIndex = list.querySelectorAll(".entry-block").length + 1;
  const newRow = createVideoEntryRow(nextIndex);
  list.appendChild(newRow);
  newRow.querySelector('input[type="url"]')?.focus();
});

document.getElementById("apply-category")?.addEventListener("click", () => {
  const selected = [...categoryPicker.querySelectorAll('input[type="checkbox"]:checked')].map((cb) => cb.value);
  if (categoryPickerMode === "detail") {
    const item = state.summaries.find((s) => s.id === state.currentSummaryId);
    if (item) {
      item.categories = selected.length ? selected : ["미정"];
      saveAppState();
      renderCategoriesUI();
      renderResultsLibrary();
      renderPublicView();
      renderSummaryDetail(item.id);
      reconcileBatchResults();
      const readerBadge = document.getElementById("reader-category-badge");
      if (readerBadge) {
        const primaryCat = (item.categories && item.categories[0]) || "미정";
        readerBadge.className = `tag tag-${getCategoryColor(primaryCat)}`;
        readerBadge.textContent = (item.categories || ["미정"]).map((c) => getCategoryNumberedLabel(c)).join(", ");
      }
      showToast(`분류가 ‘${item.categories.map((c) => getCategoryNumberedLabel(c)).join(", ")}’(으)로 수정되었습니다.`);
    }
    categoryPicker.close();
    return;
  }
  if (!activeCategoryButton) return;
  activeCategoryButton.dataset.selectedCategories = JSON.stringify(selected);
  const label = selected.length
    ? selected.map((c) => getCategoryNumberedLabel(c)).join(", ")
    : getCategoryNumberedLabel("미정");
  activeCategoryButton.querySelector("[data-category-value]").textContent = label;
  activeCategoryButton.title = label;
  categoryPicker.close();
});

// 4. Templates Rendering & Default Setting / Addition / Edit / Copy / Delete
function renderTemplatesUI() {
  const grid = document.getElementById("template-grid");
  const countEl = document.getElementById("template-count");
  if (countEl) countEl.textContent = String(state.templates.length);
  const defTpl = getDefaultTemplate();
  const bannerEl = document.getElementById("active-template-banner-name");
  if (bannerEl && defTpl) bannerEl.textContent = defTpl.name;

  if (grid) {
    grid.innerHTML = state.templates
      .map((tpl, idx) => {
        const isDefault = Boolean(tpl.isDefault) || tpl.id === defTpl.id;
        const tplKey = tpl.id === "" ? "__default__" : tpl.id;
        const isFreeform = Boolean(tpl.isFreeform) || Number(tpl.chapterCount) === 0 || String(tpl.name || "").includes("자유");
        const chCount = tpl.chapterCount || 11;
        const subCount = tpl.subsPerChapter || 2;
        const kpCount = tpl.keypointCount || 16;
        const rulesText =
          tpl.rules ||
          tpl.body ||
          (Array.isArray(tpl.previewSections) && tpl.previewSections.length
            ? tpl.previewSections.join("\n")
            : (tpl.sections || []).join("\n"));

        const specsHtml = isFreeform
          ? `
              <span><strong>[1] 요약 구조:</strong> ✨ 자유형식 (개수·번호 제한 없음)</span>
              <span><strong>[2] 핵심 개수:</strong> AI 자율 추출 (양식 지침 반영)</span>
              <span><strong>문단 어조:</strong> ${tpl.tone === "free" ? "자유 어조 (프롬프트 지침 따름)" : tpl.tone === "hanaro" ? "권면체 (~해요/~하십시오)" : "정중체 (~합니다/~세요)"}</span>
              <span><strong>유형:</strong> 자유형식 맞춤 서식</span>
            `
          : `
              <span><strong>[1] 요약 구조:</strong> ## 1.~${chCount}. / ### 소제목 ${subCount}개</span>
              <span><strong>[2] 핵심 개수:</strong> 번호형 1.~${kpCount}.</span>
              <span><strong>문단 어조:</strong> ${tpl.tone === "hanaro" ? "권면체 (~해요/~하십시오)" : "정중체 (~합니다/~세요)"}</span>
              <span><strong>유형:</strong> ${tpl.builtin ? "표준 내장 서식" : "사용자 서식"}</span>
            `;

        return `
          <article class="template-card ${isDefault ? "default-template" : "custom-template"}">
            <div class="template-card-top">
              <span class="template-symbol">${isDefault ? iconSvg("file") : isFreeform ? iconSvg("sparkles") : "Aa"}</span>
              <span class="tag tag-${isDefault ? "sage" : escapeHtml(tpl.badgeColor || "purple")}">
                ${isDefault ? "★ 기본 서식 (미선택 시 자동 적용)" : escapeHtml(tpl.badge || (isFreeform ? "✨ 자유형식 서식" : `서식 #${idx + 1}`))}
              </span>
            </div>
            <h3>${escapeHtml(tpl.name)}</h3>
            <p>${escapeHtml(tpl.desc || "설정한 구조와 요약 규칙으로 스크립트를 요약합니다.")}</p>
            <div class="algo-specs" style="margin-bottom:10px">${specsHtml}</div>
            <div class="template-structure"><div class="custom-template-body">${escapeHtml(rulesText)}</div></div>
            <div class="algo-card-actions" style="margin-top:12px">
              <button type="button" class="algo-btn ${isDefault ? "primary-algo" : ""}" data-tpl-default="${escapeHtml(tplKey)}">
                ${isDefault ? "현재 기본 서식" : "기본 서식으로 세팅"}
              </button>
              <div>
                <button type="button" class="algo-btn" data-tpl-edit="${escapeHtml(tplKey)}">${iconSvg("edit")}서식 수정</button>
                <button type="button" class="algo-btn" data-tpl-copy="${escapeHtml(tplKey)}">${iconSvg("file")}복사</button>
                <button type="button" class="algo-btn danger-algo" data-tpl-del="${escapeHtml(tplKey)}">${iconSvg("trash")}삭제</button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    grid.querySelectorAll("[data-tpl-default]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.tplDefault;
        const targetId = key === "__default__" ? "" : key;
        state.templates.forEach((t) => {
          t.isDefault = t.id === targetId;
        });
        saveAppState();
        persistTemplatesImmediately();
        renderTemplatesUI();
        showToast(`‘${getDefaultTemplate().name}’이(가) 기본 서식으로 세팅되었습니다.`);
      });
    });

    grid.querySelectorAll("[data-tpl-edit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.tplEdit;
        const target = state.templates.find((t) => (key === "__default__" ? t.id === "" : t.id === key));
        if (!target) return;
        const isFree = Boolean(target.isFreeform) || Number(target.chapterCount) === 0 || String(target.name || "").includes("자유");
        document.getElementById("template-add-title").textContent = "요약 서식 수정";
        document.getElementById("template-edit-id").value = key;
        document.getElementById("template-name").value = target.name;
        const descEl = document.getElementById("template-desc");
        if (descEl) descEl.value = target.desc || "";
        const freeCheck = document.getElementById("template-freeform-check");
        if (freeCheck) freeCheck.checked = isFree;
        const chEl = document.getElementById("template-chapters");
        if (chEl) chEl.value = String(isFree ? 0 : target.chapterCount || 11);
        const subEl = document.getElementById("template-subs");
        if (subEl) subEl.value = String(isFree ? 0 : target.subsPerChapter || 2);
        const kpEl = document.getElementById("template-keypoints");
        if (kpEl) kpEl.value = String(isFree ? 0 : target.keypointCount || 16);
        const toneEl = document.getElementById("template-tone");
        if (toneEl) toneEl.value = target.tone || (isFree ? "free" : "formal");
        syncTemplateFreeformUI(isFree);
        const currentLines =
          target.rules ||
          target.body ||
          (Array.isArray(target.previewSections) && target.previewSections.length
            ? target.previewSections.join("\n")
            : (target.sections || []).join("\n"));
        document.getElementById("template-body").value = currentLines;
        document.getElementById("template-error").hidden = true;
        document.getElementById("template-add").showModal();
      });
    });

    grid.querySelectorAll("[data-tpl-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.tplCopy;
        const target = state.templates.find((t) => (key === "__default__" ? t.id === "" : t.id === key));
        if (!target) return;
        const copyTpl = {
          ...target,
          id: `custom-${Date.now()}`,
          name: `${target.name} (복사본)`,
          badge: "복사된 서식",
          badgeColor: "purple",
          isDefault: false,
          builtin: false
        };
        state.templates.push(copyTpl);
        saveAppState();
        persistTemplatesImmediately();
        renderTemplatesUI();
        showToast(`‘${target.name}’ 서식이 복사되었습니다.`);
      });
    });

    grid.querySelectorAll("[data-tpl-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.templates.length <= 1) {
          showToast("최소 1개의 기본 요약 서식은 유지되어야 합니다.");
          return;
        }
        const key = btn.dataset.tplDel;
        const targetId = key === "__default__" ? "" : key;
        const target = state.templates.find((t) => t.id === targetId);
        if (!target) return;
        const wasDef = Boolean(target.isDefault);
        state.templates = state.templates.filter((t) => t.id !== targetId);
        if (wasDef && state.templates.length > 0) {
          state.templates[0].isDefault = true;
        }
        saveAppState();
        persistTemplatesImmediately();
        renderTemplatesUI();
        showToast(`‘${target.name}’ 서식이 삭제되었습니다.`);
      });
    });
  }

  document.querySelectorAll("[data-template-select]").forEach((select) => {
    const currentVal = select.value;
    select.innerHTML = getTemplateOptionsHtml(currentVal);
  });
}

const FREEFORM_PRESET_PROMPTS = {
  essay:
    "1. [도입 에세이]: 설교·강연이 던지는 핵심 질문과 오늘날 우리의 현실을 따뜻한 칼럼 문체로 서술\n" +
    "2. [깊이 있는 통찰]: 말씀 속 성경 본문(장·절)과 실제 예화를 번호 없이 자연스러운 이야기 흐름(3~4개 섹션)으로 풀어쓰기\n" +
    "3. [삶의 여운과 한 줄 고백]: 글을 마무리하는 깊은 묵상 문단과 오늘 붙들어야 할 결단 정리",
  qna:
    "1. [핵심 질문과 성경적 해답 Q&A]: 설교·강연 전체 내용을 성도/청중이 가장 궁금해할 핵심 질문(Q1~Q5)과 그에 대한 구체적인 해답(A) 형식으로 정리\n" +
    "2. 각 답변(A)에는 설교자가 인용한 성경 구절과 예화를 상세히 포함\n" +
    "3. [실천 체크리스트]: 오늘 바로 실행할 행동 지침 정리",
  qt:
    "1. [오늘의 본문과 중심 메시지]: 설교 본문 구절과 핵심 주제를 명료하게 제시\n" +
    "2. [말씀 속으로 (관찰과 해석)]: 설교에서 강조한 성경적 배경과 하나님의 마음을 깊이 있게 서술\n" +
    "3. [삶으로 드리는 적용과 기도제목]: 소그룹 나눔/개인 묵상을 위한 질문 3가지와 구체적인 합심 기도제목 정리",
  timeline:
    "1. [시간순 스토리텔링 요약]: 서론(마음 열기) → 본론 전개(성경 이야기와 예화) → 클라이맥스(선포와 도전) → 결론(축복과 파송) 순서로 생생하게 정리\n" +
    "2. 설교자의 생생한 비유와 강조 어조를 살려 현장감 있게 작성"
};

function syncTemplateFreeformUI(isFree) {
  const presetsRow = document.getElementById("template-freeform-presets");
  const chEl = document.getElementById("template-chapters");
  const subEl = document.getElementById("template-subs");
  const kpEl = document.getElementById("template-keypoints");
  const toneEl = document.getElementById("template-tone");
  if (presetsRow) presetsRow.style.display = isFree ? "flex" : "none";
  if (isFree) {
    if (chEl) chEl.value = "0";
    if (subEl) subEl.value = "0";
    if (kpEl) kpEl.value = "0";
    if (toneEl && toneEl.value === "formal") toneEl.value = "free";
  } else {
    if (chEl && chEl.value === "0") chEl.value = "11";
    if (subEl && subEl.value === "0") subEl.value = "2";
    if (kpEl && kpEl.value === "0") kpEl.value = "16";
    if (toneEl && toneEl.value === "free") toneEl.value = "formal";
  }
}

document.getElementById("template-freeform-check")?.addEventListener("change", (e) => {
  const isFree = Boolean(e.target.checked);
  syncTemplateFreeformUI(isFree);
  const bodyEl = document.getElementById("template-body");
  if (isFree && bodyEl && bodyEl.value.includes("## 1.~11. 대주제")) {
    bodyEl.value =
      "1. [본문 말씀 및 핵심 주제]: 설교·강연에 등장한 중심 성경 구절과 전체 주제를 제시\n" +
      "2. [자유 구성 본문]: 고정된 번호 틀 없이 말씀의 흐름에 따라 서론·본론(핵심 메시지와 실제 예화)·결론으로 자유롭고 깊이 있게 서술\n" +
      "3. [묵상 질문 및 기도제목]: 삶에 적용할 질문 3가지와 함께 기도할 제목 정리";
  }
});

document.querySelectorAll("[data-freeform-preset]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.freeformPreset;
    const text = FREEFORM_PRESET_PROMPTS[key];
    const bodyEl = document.getElementById("template-body");
    if (text && bodyEl) {
      bodyEl.value = text;
      showToast("자유형식 예시 양식이 입력란에 적용되었습니다. 자유롭게 수정해 보세요.");
    }
  });
});

document.querySelectorAll('[data-open="template-add"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("template-add-title").textContent = "새 요약 서식 추가생성";
    document.getElementById("template-edit-id").value = "";
    document.getElementById("template-name").value = "";
    const descEl = document.getElementById("template-desc");
    if (descEl) descEl.value = "";
    const freeCheck = document.getElementById("template-freeform-check");
    if (freeCheck) freeCheck.checked = false;
    const chEl = document.getElementById("template-chapters");
    if (chEl) chEl.value = "11";
    const subEl = document.getElementById("template-subs");
    if (subEl) subEl.value = "2";
    const kpEl = document.getElementById("template-keypoints");
    if (kpEl) kpEl.value = "16";
    const toneEl = document.getElementById("template-tone");
    if (toneEl) toneEl.value = "formal";
    syncTemplateFreeformUI(false);
    document.getElementById("template-body").value =
      "1. [1] 요약: # 문서 제목 + ## 1.~11. 대주제 + ### 번호 없는 소제목과 2문장 정중체 문단\n2. [2] 핵심: 1.~16. 간결한 1~2문장 실천 요점 정리";
    document.getElementById("template-error").hidden = true;
  });
});

const templateForm = document.getElementById("template-form");
templateForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const editKey = document.getElementById("template-edit-id")?.value.trim() || "";
  const nameField = document.getElementById("template-name");
  const descField = document.getElementById("template-desc");
  const bodyField = document.getElementById("template-body");
  const name = nameField.value.trim();
  const isFreeform =
    Boolean(document.getElementById("template-freeform-check")?.checked) ||
    Number(document.getElementById("template-chapters")?.value) === 0;
  const desc =
    descField?.value.trim() ||
    (isFreeform ? "고정된 틀 없이 지정한 양식과 프롬프트 그대로 요약하는 자유형식 서식입니다." : "직접 설정한 요약 서식입니다.");
  const chapterCount = isFreeform ? 0 : Number(document.getElementById("template-chapters")?.value || 11);
  const subsPerChapter = isFreeform ? 0 : Number(document.getElementById("template-subs")?.value || 2);
  const keypointCount = isFreeform ? 0 : Number(document.getElementById("template-keypoints")?.value || 16);
  const tone = document.getElementById("template-tone")?.value || (isFreeform ? "free" : "formal");
  const body = bodyField.value.trim();
  const error = document.getElementById("template-error");
  error.hidden = true;

  const targetId = editKey === "__default__" ? "" : editKey;
  const duplicate = state.templates.some((t) => t.name === name && t.id !== targetId);
  if (!name || !body || duplicate) {
    error.textContent = duplicate ? "같은 이름의 서식이 있어요. 다른 이름을 입력해주세요." : "서식 이름과 규칙을 모두 입력해주세요.";
    error.hidden = false;
    return;
  }

  const lines = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (editKey) {
    const target = state.templates.find((t) => t.id === targetId);
    if (target) {
      target.name = name;
      target.desc = desc;
      target.isFreeform = isFreeform;
      target.badge = isFreeform ? "✨ 자유형식 · 제한 없음" : target.badge;
      target.chapterCount = chapterCount;
      target.subsPerChapter = subsPerChapter;
      target.keypointCount = keypointCount;
      target.tone = tone;
      target.rules = body;
      target.body = body;
      target.previewSections = lines;
      showToast(`‘${name}’ 서식이 수정되었습니다.`);
    }
  } else {
    state.templates.push({
      id: `custom-${Date.now()}`,
      name,
      badge: isFreeform ? "✨ 자유형식 · 내가 만든 서식" : "내가 만든 서식",
      badgeColor: "purple",
      desc,
      isFreeform,
      chapterCount,
      subsPerChapter,
      keypointCount,
      tone,
      rules: body,
      body,
      sections: [],
      previewSections: lines,
      isDefault: false,
      builtin: false
    });
    showToast(`‘${name}’ 서식이 추가되었습니다. 요약 시 선택하거나 기본 서식으로 세팅할 수 있어요.`);
  }
  saveAppState();
  persistTemplatesImmediately();
  renderTemplatesUI();
  templateForm.reset();
  document.getElementById("template-add").close();
});

// 5. AI Model Selection & Per-Model API Key + Connection Verification
document.querySelectorAll('input[name="ai-model"]').forEach((radio) => {
  if (radio.value === state.selectedAiModel) {
    radio.checked = true;
  }
  radio.closest(".ai-model-option")?.classList.toggle("active", radio.checked);
  radio.addEventListener("change", () => {
    state.selectedAiModel = radio.value;
    document.querySelectorAll(".ai-model-option").forEach((opt) => {
      const r = opt.querySelector('input[name="ai-model"]');
      opt.classList.toggle("active", Boolean(r && r.checked));
    });
    saveAppState();
  });
});

function syncAiModelInputsUI() {
  document.querySelectorAll('input[name="ai-model"]').forEach((radio) => {
    radio.checked = radio.value === state.selectedAiModel;
    radio.closest(".ai-model-option")?.classList.toggle("active", radio.checked);
  });
  document.querySelectorAll("[data-model-key]").forEach((input) => {
    const model = input.dataset.modelKey;
    if (!state.modelApiKeys) state.modelApiKeys = {};
    input.value = state.modelApiKeys[model] || "";
    input.type = "password";
  });
}

syncAiModelInputsUI();

document.querySelectorAll("[data-model-key]").forEach((input) => {
  const model = input.dataset.modelKey;
  input.addEventListener("focus", () => {
    const radio = input.closest(".ai-model-option")?.querySelector('input[name="ai-model"]');
    if (radio && !radio.checked) {
      radio.checked = true;
      radio.dispatchEvent(new Event("change"));
    }
  });
  input.addEventListener("input", () => {
    state.modelApiKeys[model] = input.value.trim();
    const status = document.querySelector(`[data-conn-status="${model}"]`);
    status.className = "ai-conn-status";
    status.textContent = "미확인 · 변경한 키로 연결 확인이 필요합니다.";
    saveAppState();
  });
});

document.querySelectorAll("[data-connect-model]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const model = btn.dataset.connectModel;
    const card = btn.closest(".ai-model-option");
    const radio = card?.querySelector('input[name="ai-model"]');
    if (radio && !radio.checked) {
      radio.checked = true;
      radio.dispatchEvent(new Event("change"));
    }
    const keyInput = card?.querySelector("[data-model-key]");
    const statusEl = card?.querySelector("[data-conn-status]");
    const apiKey = keyInput?.value.trim() || "";
    if (!state.modelApiKeys) state.modelApiKeys = {};
    state.modelApiKeys[model] = apiKey;
    saveAppState();

    if (!statusEl) return;
    btn.disabled = true;
    const origLabel = btn.textContent;
    btn.textContent = "확인 중...";
    statusEl.className = "ai-conn-status testing";
    statusEl.textContent = "⟳ API 서버 연결 및 인증 상태를 확인하고 있습니다...";

    try {
      const res = await fetch(TEST_AI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(150000),
        body: JSON.stringify({ model, apiKey })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        statusEl.className = "ai-conn-status ok";
        statusEl.textContent = `✔ ${data.message} · ${new Date().toLocaleTimeString()}`;
        showToast(data.message);
      } else {
        statusEl.className = "ai-conn-status fail";
        statusEl.textContent = `✖ ${data.message || "연결 실패: API Key를 확인해주세요."}`;
        showToast(data.message || "API 연결에 실패했습니다.");
      }
    } catch (err) {
      if (!apiKey) {
        statusEl.className = "ai-conn-status fail";
        statusEl.textContent = "✖ 연결 실패: API Key가 비어 있습니다. 키를 입력해주세요.";
        showToast("연결 실패: API Key를 입력해주세요.");
      } else {
        statusEl.className = "ai-conn-status fail";
        statusEl.textContent = "✖ 연결 실패: 로컬 요약 서버 또는 API 엔드포인트에 연결할 수 없습니다.";
        showToast("연결 실패: API 키 또는 네트워크를 확인해주세요.");
      }
    } finally {
      btn.disabled = false;
      btn.textContent = origLabel;
    }
  });
});

// 6. Real YouTube Metadata Fetch (oEmbed) + Live Summarization Progress
async function fetchYoutubeMetadata(url) {
  try {
    const cleanUrl = url.trim();
    const oembedUrl = `https://noembed.com/embed?url=${encodeURIComponent(cleanUrl)}`;
    const res = await fetch(oembedUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        return {
          title: data.title,
          channel: data.author_name || "YouTube 채널"
        };
      }
    }
  } catch (e) {
    // Fallback if offline or blocked
  }
  // Extract video ID or fallback title
  const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{6,})/);
  const vid = match ? match[1] : url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 18);
  return {
    title: `유튜브 핵심 인사이트 분석 (${vid})`,
    channel: "YouTube 크리에이터"
  };
}

function getAiModelDisplayName(modelVal) {
  const map = {
    "vscode-gemini4": "Gemini API",
    "free-gemini": "Gemini API",
    "free-openai": "OpenAI API",
    "gpt-4o": "OpenAI GPT-4o",
    "gemini-1.5-pro": "Gemini 1.5 Pro",
    "claude-3.5-sonnet": "Claude 3.5 Sonnet",
    "vscode-copilot": `VS Code Gemini 4 (${getActiveAccount().name})`
  };
  return map[modelVal] || `VS Code Gemini 4 (${getActiveAccount().name})`;
}

function setProgressStepUI(stepIndex) {
  document.querySelectorAll("#progress-steps-bar .p-step").forEach((el) => {
    const s = Number(el.dataset.step);
    el.classList.toggle("active", s === stepIndex);
    el.classList.toggle("done", s < stepIndex);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

let latestCreatedSummaryId = null;
let latestBatchResults = [];
let latestBatchEntries = [];
let activeBatchId = null;
let stopBatchRequested = false;

async function saveBatch() {
  if (!activeBatchId) return;
  await PendingStore.put({id: activeBatchId, kind: "batch", time: Date.now(),
    entries: latestBatchEntries, results: latestBatchResults});
}

function renderBatchRows() {
  document.getElementById("summary-progress-card").hidden = false;
  document.getElementById("progress-items-list").innerHTML = latestBatchEntries.map((entry, i) => {
    const res = latestBatchResults[i];
    const saved = serverBaseline?.summaries?.find((s) => s.uid === res?.uid);
    const catLabel = (saved?.categories || entry.categories || ["미정"]).map((c) => getCategoryNumberedLabel(c)).join(", ");
    const catEditBtn = saved
      ? `<button type="button" class="script-action-btn secondary" data-progress-cat-edit="${saved.id}" style="padding:2px 8px;font-size:11px;margin-left:6px">${iconSvg("bookmark")}분류 수정 (${escapeHtml(catLabel)})</button>`
      : "";
    return `<div class="progress-item-row"><div class="progress-item-top"><strong id="p-item-title-${i}">${escapeHtml(saved?.title || entry.url || "직접 입력 원고")} · ${escapeHtml(entry.templateName)}${catEditBtn}</strong><span id="p-item-status-${i}">${escapeHtml(res?.status || "waiting")}</span></div><div class="progress-item-track"><div id="p-item-bar-${i}" class="progress-item-fill"></div></div></div>`;
  }).join("");
  bindProgressCategoryEditButtons();
}

function bindProgressCategoryEditButtons() {
  document.querySelectorAll("[data-progress-cat-edit]").forEach((btn) => {
    btn.onclick = () => {
      const id = Number(btn.dataset.progressCatEdit);
      openCategoryPickerForSummary(id);
    };
  });
}

function openCategoryPickerForSummary(summaryId) {
  const item = state.summaries.find((s) => s.id === Number(summaryId));
  if (!item) return;
  state.currentSummaryId = item.id;
  categoryPickerMode = "detail";
  document.getElementById("picker-entry-number").textContent = `#${item.id} (${item.title.slice(0, 16)}…)`;
  renderCategoriesUI();
  categoryPicker.showModal();
}

async function restoreBatch() {
  try {
    const records = (await PendingStore.all()).filter(r => r.kind === "batch").sort((a, b) => b.time - a.time);
    if (!records.length) return;
    const record = records[0];
    activeBatchId = record.id;
    latestBatchEntries = record.entries;
    latestBatchResults = record.results;
    renderBatchRows();
    reconcileBatchResults();
    renderBatchOutcome();
  } catch (error) { reportSaveError(error); }
}

document.getElementById("stop-batch-btn")?.addEventListener("click", () => {
  stopBatchRequested = true;
  showToast("현재 영상의 저장을 마친 뒤 중단합니다. 나머지는 이어서 실행할 수 있습니다.");
});

document.getElementById("resume-batch-btn")?.addEventListener("click", async () => {
  if (batchRunning) return;
  try {
    await flushAppState();
    reconcileBatchResults();
    if (latestBatchResults.some(r => r.status === "pending")) throw new Error("저장 대기 결과를 먼저 저장해 주세요.");
    const retry = latestBatchEntries.filter((entry, i) => latestBatchResults[i].status !== "saved");
    if (!retry.length) { showToast("다시 실행할 항목이 없습니다."); return; }
    const list = document.getElementById("video-entries-list");
    list.replaceChildren();
    for (const [i, entry] of retry.entries()) {
      const row = createVideoEntryRow(i + 1);
      row.querySelector('input[type="url"]').value = entry.url;
      row.querySelector(".entry-script-textarea").value = entry.manualScript;
      row.querySelector(".entry-ratio-select").value = String(entry.ratio);
      const select = row.querySelector("[data-template-select]");
      if (!state.templates.some(t => (t.id || "__builtin__") === entry.templateId)) throw new Error("작업 당시 서식이 삭제되었습니다. 서식을 다시 선택해 주세요.");
      select.value = entry.templateId;
      const picker = row.querySelector("[data-category-picker]");
      picker.dataset.selectedCategories = JSON.stringify(entry.categories);
      picker.querySelector("[data-category-value]").textContent = entry.categories.join(", ");
      list.append(row);
    }
    document.getElementById("start-summary-btn").click();
  } catch (error) { reportSaveError(error); }
});

function reconcileBatchResults() {
  if (!serverBaseline) return;
  for (const [index, result] of latestBatchResults.entries()) {
    if (!result.uid) continue;
    const saved = state.summaries.find((s) => s.uid === result.uid) || serverBaseline.summaries.find((s) => s.uid === result.uid);
    if (!saved) continue;
    result.status = "saved";
    latestCreatedSummaryId = saved.id;
    const titleEl = document.getElementById(`p-item-title-${index}`);
    if (titleEl) {
      const catLabel = (saved.categories || ["미정"]).map((c) => getCategoryNumberedLabel(c)).join(", ");
      titleEl.innerHTML = `#${saved.id} ${escapeHtml(saved.title)} <button type="button" class="script-action-btn secondary" data-progress-cat-edit="${saved.id}" style="padding:2px 8px;font-size:11px;margin-left:6px">${iconSvg("bookmark")}분류 수정 (${escapeHtml(catLabel)})</button>`;
    }
    const label = document.getElementById(`p-item-status-${index}`);
    const bar = document.getElementById(`p-item-bar-${index}`);
    if (label) label.textContent = "서버 저장 확인 · 100%";
    if (bar) bar.style.width = "100%";
  }
  bindProgressCategoryEditButtons();
  if (!batchRunning && latestBatchResults.length) renderBatchOutcome();
}

function renderBatchOutcome() {
  const saved = latestBatchResults.filter((item) => item.status === "saved").length;
  const failed = latestBatchResults.filter((item) => item.status === "failed").length;
  const pending = latestBatchResults.filter((item) => item.status === "pending").length;
  const unprocessed = latestBatchResults.length - saved - failed - pending;
  const review = latestBatchResults.filter(item => item.status === "saved" && item.warnings?.length).length;
  const message = `총 ${latestBatchResults.length}개 · 서버 저장 ${saved}개 · 생성 실패 ${failed}개 · 저장 대기 ${pending}개 · 미처리 ${unprocessed}개${review ? ` · 품질 검토 ${review}개` : ""}`;
  document.getElementById("progress-heading-title").textContent = message;
  document.querySelector(".progress-done-msg").textContent = message;
  document.getElementById("progress-actions").hidden = false;
  document.getElementById("open-latest-summary-btn").disabled = !latestCreatedSummaryId;
  document.getElementById("resume-batch-btn").disabled = batchRunning || (saved === latestBatchResults.length);
  return message;
}

document.getElementById("retry-save-btn")?.addEventListener("click", async () => {
  try {
    if (!serverBaseline) await syncLatestState(true);
    await flushAppState();
    reconcileBatchResults();
    if (latestBatchResults.length) renderBatchOutcome();
    setPersistenceStatus(`서버 저장 확인 · ${serverBaseline.summaries.length}개`);
    showToast("서버 저장을 확인했습니다.");
  } catch (error) {
    reportSaveError(error);
  }
});

document.getElementById("start-summary-btn")?.addEventListener("click", async () => {
  if (batchRunning || !serverBaseline || recoveryBlocked) {
    showToast("서버 연결 확인 또는 현재 작업 완료 후 실행해 주세요.");
    return;
  }
  const entryElements = [...document.querySelectorAll("#video-entries-list .entry-block")];
  const entriesData = entryElements
    .map((el, idx) => {
      const urlInput = el.querySelector('input[type="url"]');
      const url = urlInput ? urlInput.value.trim() : "";
      const scriptTextarea = el.querySelector(".entry-script-textarea");
      const manualScript = scriptTextarea ? scriptTextarea.value.trim() : "";
      const catBtn = el.querySelector("[data-category-picker]");
      const selectedCats = JSON.parse(catBtn?.dataset.selectedCategories || "[]");
      const ratio = Number(el.querySelector(".entry-ratio-select")?.value || 30);
      const tplId = el.querySelector("[data-template-select]")?.value || "";
      const tplObj = tplId ? findTemplateObject(tplId) : getDefaultTemplate();
      return {
        blockEl: el,
        index: idx + 1,
        url,
        manualScript,
        categories: selectedCats.length ? selectedCats : ["미정"],
        ratio,
        templateName: tplObj.name,
        templateId: tplObj.id || "__builtin__",
        templateSections: tplObj.sections
      };
    })
    .filter((item) => item.url.length > 0 || item.manualScript.length > 0);

  if (entriesData.length === 0) {
    const firstInput = document.querySelector('#video-entries-list input[type="url"]');
    firstInput?.focus();
    showToast("요약할 유튜브 영상 URL 또는 스크립트를 입력해주세요.");
    return;
  }
  try {
    for (const entry of entriesData) {
      if (entry.url && SummarySync.parseUrls(entry.url).length !== 1) {
        throw new Error(`영상 ${entry.index}: 한 입력칸에는 URL 하나만 입력해 주세요.`);
      }
    }
  } catch (error) {
    showToast(error.message);
    return;
  }

  const startBtn = document.getElementById("start-summary-btn");
  startBtn.disabled = true;
  batchRunning = true;
  try {
    await flushAppState();
  } catch (error) {
    batchRunning = false;
    startBtn.disabled = false;
    reportSaveError(error);
    return;
  }
  latestCreatedSummaryId = null;
  currentLibraryPage = 1;
  currentPublicPage = 1;
  latestBatchResults = entriesData.map(() => ({status: "waiting", uid: crypto.randomUUID()}));
  latestBatchEntries = entriesData.map(({blockEl, ...entry}) => entry);
  activeBatchId = `batch:${crypto.randomUUID()}`;
  stopBatchRequested = false;
  try { await saveBatch(); } catch (error) {
    batchRunning = false;
    startBtn.disabled = false;
    reportSaveError(error);
    return;
  }
  const inputControls = [...document.querySelectorAll(
    "#video-entries-list input, #video-entries-list select, #video-entries-list textarea, #video-entries-list button, #add-url-btn, #reset-input-form-btn, #default-ratio-select, #apply-default-ratio-all-btn"
  )].map((element) => ({element, disabled: element.disabled}));
  inputControls.forEach(({element}) => { element.disabled = true; });

  const progressCard = document.getElementById("summary-progress-card");
  const progressBar = document.getElementById("progress-overall-bar");
  const progressPercent = document.getElementById("progress-overall-percent");
  const itemsListEl = document.getElementById("progress-items-list");
  const actionsEl = document.getElementById("progress-actions");

  progressCard.hidden = false;
  actionsEl.hidden = true;
  progressBar.style.width = "0%";
  progressPercent.textContent = "0%";
  const aiLabel = getAiModelDisplayName(state.selectedAiModel);
  document.getElementById("progress-heading-title").textContent = `${aiLabel} 모델이 유튜브 스크립트를 요약하고 있어요`;

  itemsListEl.innerHTML = entriesData
    .map(
      (item, i) => `
      <div class="progress-item-row" id="p-item-${i}">
        <div class="progress-item-top">
          <strong id="p-item-title-${i}">영상 ${item.index}: ${escapeHtml(item.url || "직접 입력 스크립트")}</strong>
          <span class="progress-item-status" id="p-item-status-${i}">대기 중 · 0%</span>
        </div>
        <div class="progress-item-track"><div class="progress-item-fill" id="p-item-bar-${i}" style="width:0%"></div></div>
      </div>
    `
    )
    .join("");

  progressCard.scrollIntoView({ behavior: "smooth", block: "center" });

  const totalSteps = entriesData.length * 4;
  let completedSteps = 0;
  const updateOverall = () => {
    const pct = Math.min(100, Math.round((completedSteps / totalSteps) * 100));
    progressBar.style.width = `${pct}%`;
    progressPercent.textContent = `${pct}%`;
  };

  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  try {
  for (let i = 0; i < entriesData.length; i++) {
    if (stopBatchRequested) break;
    const entry = entriesData[i];
    const titleEl = document.getElementById(`p-item-title-${i}`);
    const statusEl = document.getElementById(`p-item-status-${i}`);
    const barEl = document.getElementById(`p-item-bar-${i}`);
    const result = latestBatchResults[i];
    try {

    // Step 1: Extract real YouTube transcript & video metadata (reuse pre-fetched cache if unmodified)
    setProgressStepUI(1);
    statusEl.textContent = "유튜브 영상 정보 및 자막 트랙 확인 중 · 25%";
    barEl.style.width = "25%";
    let trData = null;
    const cachedSegsRaw = entry.blockEl?.dataset.fetchedUrl === entry.url
      ? entry.blockEl.dataset.fetchedSegments : null;
    const cachedRawText = entry.blockEl?.dataset.fetchedRawText || "";
    if (cachedSegsRaw && (!entry.manualScript || entry.manualScript === cachedRawText.trim())) {
      try {
        const parsedSegs = JSON.parse(cachedSegsRaw);
        if (Array.isArray(parsedSegs) && parsedSegs.length) {
          trData = {
            ok: true,
            title: entry.blockEl.dataset.fetchedTitle || "YouTube 영상",
            channel: entry.blockEl.dataset.fetchedChannel || "YouTube 채널",
            segments: parsedSegs
          };
        }
      } catch (e) {}
    } else if (entry.manualScript) {
      const meta = entry.url ? await fetchYoutubeMetadata(entry.url) : { title: "직접 입력한 스크립트 요약", channel: "You선생 노트" };
      const parsedSegs = parseRawScriptToSegments(entry.manualScript);
      trData = {
        ok: true,
        title: meta.title,
        channel: meta.channel,
        segments: parsedSegs
      };
    }
    if (!trData) {
      trData = await fetchYoutubeTranscriptData(entry.url, "");
    }
    titleEl.textContent = `영상 ${entry.index}: ${trData.title} (${trData.channel})`;
    completedSteps++;
    updateOverall();

    // Step 2: Script segment parsing or Audio Fallback Prompt when no captions exist
    setProgressStepUI(2);
    let segCount = (trData.segments || []).length;
    let summarized = null;

    if (trData.noCaptions || segCount === 0) {
      const isStaticWebMode = document.body.classList.contains("static-public-mode") && location.port !== "18765";
      const hasGeminiKey = Boolean((getSelectedModelApiKey() || state.modelApiKeys?.["free-gemini"] || state.apiKey || "").trim());
      let audioChoice;
      if (isStaticWebMode && entry.url && hasGeminiKey) {
        // On Web Mode (GitHub Pages), automatically analyze the YouTube URL directly via Gemini API without modal interruption
        audioChoice = { useAudio: true, audioBase64: "", audioMimeType: "" };
      } else {
        statusEl.textContent = `자막이 없는 영상입니다 · 오디오 파일 AI 분석 진행 여부 확인 중...`;
        audioChoice = await askUserForAudioFallback(trData.title, entry.url);
      }
      if (!audioChoice.useAudio) throw new Error("원문 없음 · 이 영상을 건너뛰었습니다. 원고 또는 오디오를 제공한 뒤 재시도해 주세요.");
      completedSteps++;
      updateOverall();

      setProgressStepUI(3);
      let stepPct = 60;
      statusEl.textContent = audioChoice.useAudio
        ? `${aiLabel} · 유튜브 오디오 추출 및 음성 AI 심층 요약 중 (${entry.ratio}%) · ${stepPct}%`
        : `${aiLabel} · 기본 요약 생성 중 (${entry.ratio}%) · ${stepPct}%`;
      barEl.style.width = `${stepPct}%`;

      const progressTick = window.setInterval(() => {
        if (stepPct < 95) {
          stepPct += 2;
          statusEl.textContent = audioChoice.useAudio
            ? `${aiLabel} · 오디오 음성을 듣고 대주제·핵심 요약 작성 중 · ${stepPct}%`
            : `${aiLabel} · 요약 작성 중 · ${stepPct}%`;
          barEl.style.width = `${stepPct}%`;
        }
      }, 1200);

      try {
        if (audioChoice.useAudio) {
          const audioRes = await runAudioSummarizationViaServer({
            url: entry.url,
            title: trData.title,
            channel: trData.channel,
            ratio: entry.ratio,
            templateName: entry.templateName,
            customSections: entry.templateSections,
            audioBase64: audioChoice.audioBase64,
            audioMimeType: audioChoice.audioMimeType
          });
          summarized = audioRes;
          trData.segments = audioRes.segments || [];
          segCount = trData.segments.length;
        } else {
          summarized = await runSummarizationAlgorithm(
            [],
            trData.title,
            trData.channel,
            entry.ratio,
            entry.templateName,
            aiLabel,
            entry.templateSections,
            entry.url
          );
        }
      } catch (audioErr) {
        throw new Error(audioErr.message || "오디오 요약에 실패했습니다.");
      } finally {
        window.clearInterval(progressTick);
      }
      completedSteps++;
      updateOverall();
    } else {
      statusEl.textContent = `추출된 스크립트 ${segCount}개 구간 문장 중요도 분석 중 · 55%`;
      barEl.style.width = "55%";
      const statusBadge = entry.blockEl?.querySelector("[data-script-status]");
      if (statusBadge) {
        statusBadge.textContent = `스크립트 ${segCount}개 구간 추출·분석됨`;
        statusBadge.classList.add("loaded");
      }
      await sleep(280);
      completedSteps++;
      updateOverall();

      // Step 3: Summarize transcript according to ratio & template using summarization algorithm
      setProgressStepUI(3);
      let stepPct = 60;
      statusEl.textContent = `${aiLabel} · 요약 생성 및 요약 원본 기록 중 (${entry.ratio}%) · ${stepPct}%`;
      barEl.style.width = `${stepPct}%`;
      const progressTick = window.setInterval(() => {
        if (stepPct < 94) {
          stepPct += 3;
          statusEl.textContent = `${aiLabel} · 문맥 교정 및 대주제·핵심 요약 작성 중 · ${stepPct}%`;
          barEl.style.width = `${stepPct}%`;
        }
      }, 650);
      try {
        summarized = await runSummarizationAlgorithm(
          trData.segments,
          trData.title,
          trData.channel,
          entry.ratio,
          entry.templateName,
          aiLabel,
          entry.templateSections,
          entry.url
        );
      } finally {
        window.clearInterval(progressTick);
      }
      completedSteps++;
      updateOverall();
    }

    // Step 4: Save to library & open original summary tab
    setProgressStepUI(4);
    if (!summarized || typeof summarized.html !== "string" || !summarized.html.trim()) {
      throw new Error("요약 본문이 비어 있어 저장하지 않았습니다.");
    }
    const nextId = state.summaries.reduce((max, s) => Math.max(max, Number(s.id) || 0), 0) + 1;
    const usedEngineLabel = summarized.engine ? `${aiLabel} (${summarized.engine})` : aiLabel;

    const newSummary = {
      id: nextId,
      uid: crypto.randomUUID(),
      title: trData.title,
      channel: trData.channel,
      url: entry.url || "https://www.youtube.com/",
      categories: entry.categories,
      date: dateStr,
      ratio: entry.ratio,
      template: entry.templateName,
      aiModel: usedEngineLabel,
      quality: summarized.quality || {notice: "오디오 결과 · 원문 인용 대조는 별도 검토가 필요합니다."},
      isNew: true,
      published: true,
      bookmarked: false,
      excerpt: summarized.excerpt,
      scriptSegments: trData.segments,
      originalHtml: summarized.html,
      editedHtml: summarized.html,
      takeaways: summarized.takeaways,
      outline: summarized.outline
    };

    state.summaries.unshift(newSummary);
    state.currentSummaryId = nextId;
    newSummary.uid = result.uid;
    result.status = "pending";
    result.warnings = summarized.quality?.warnings || [];
    statusEl.textContent = "요약 생성 완료 · 서버 저장 확인 중";
    saveLocalState();
    await journalPending();
    await saveBatch();
    await flushAppState();
    const savedSummary = serverBaseline.summaries.find((s) => s.uid === result.uid);
    if (!savedSummary) throw new Error("서버에서 저장 결과를 확인하지 못했습니다.");
    result.status = "saved";
    latestCreatedSummaryId = savedSummary.id;
    state.currentSummaryId = savedSummary.id;
    refreshSummaryLists();
    activeVersionTab = "original";
    document.querySelectorAll("[data-version]").forEach((tab) => {
      const isOrig = tab.dataset.version === "original";
      tab.classList.toggle("active", isOrig);
      tab.setAttribute("aria-selected", String(isOrig));
    });

    const catLabel = (savedSummary.categories || ["미정"]).map((c) => getCategoryNumberedLabel(c)).join(", ");
    titleEl.innerHTML = `영상 ${entry.index}: #${savedSummary.id} ${escapeHtml(trData.title)} (${escapeHtml(trData.channel)}) <button type="button" class="script-action-btn secondary" data-progress-cat-edit="${savedSummary.id}" style="padding:2px 8px;font-size:11px;margin-left:6px">${iconSvg("bookmark")}분류 수정 (${escapeHtml(catLabel)})</button>`;
    bindProgressCategoryEditButtons();
    statusEl.textContent = `서버 저장 확인 (${segCount}구간 → ${entry.ratio}%) · 100%${result.warnings.length ? " · 분량·범위 검토 필요" : ""}`;
    barEl.style.width = "100%";
    completedSteps++;
    updateOverall();
    await saveBatch();
    } catch (error) {
      console.error(`Batch entry ${entry.index} failed`, error);
      if (result.status === "pending") {
        statusEl.textContent = `저장 대기: ${error.message} · 상단 저장 재시도를 눌러 주세요`;
        setPersistenceStatus("서버 저장 실패 · 생성 결과는 현재 창에 보존되어 있습니다", true);
        for (let remaining = i + 1; remaining < entriesData.length; remaining++) {
          document.getElementById(`p-item-status-${remaining}`).textContent = "미처리 · 저장 문제 해결 후 다시 실행해 주세요";
        }
        await saveBatch();
        break;
      }
      result.status = "failed";
      result.error = error.message;
      statusEl.textContent = `생성 실패: ${error.message}`;
      completedSteps = (i + 1) * 4;
      updateOverall();
      await saveBatch();
    }
  }

  refreshSummaryLists();
  renderSummaryDetail(state.currentSummaryId);

  showToast(renderBatchOutcome());
  } catch (error) {
    reportSaveError(error);
    renderBatchOutcome();
  } finally {
    batchRunning = false;
    startBtn.disabled = false;
    inputControls.forEach(({element, disabled}) => { element.disabled = disabled; });
    document.getElementById("resume-batch-btn").disabled = latestBatchResults.every(r => r.status === "saved");
    saveBatch().catch(reportSaveError);
  }
});

document.getElementById("open-latest-summary-btn")?.addEventListener("click", () => {
  if (latestCreatedSummaryId) {
    state.currentSummaryId = latestCreatedSummaryId;
    saveAppState();
    renderSummaryDetail(latestCreatedSummaryId);
  }
  window.location.hash = "summary";
});

function resetNewSummaryInputForm() {
  if (batchRunning) return;
  const list = document.getElementById("video-entries-list");
  if (!list) return;
  const blocks = [...list.querySelectorAll(".entry-block")];
  blocks.slice(1).forEach((b) => b.remove());
  const first = blocks[0];
  if (first) {
    const urlIn = first.querySelector('input[type="url"]');
    if (urlIn) urlIn.value = "";
    const txtIn = first.querySelector(".entry-script-textarea");
    if (txtIn) txtIn.value = "";
    const drawer = first.querySelector("[data-script-drawer]");
    if (drawer) drawer.hidden = true;
    delete first.dataset.fetchedSegments;
    delete first.dataset.fetchedRawText;
    delete first.dataset.fetchedUrl;
    const statusBadge = first.querySelector("[data-script-status]");
    if (statusBadge) {
      statusBadge.textContent = "URL을 붙여넣으면 영상 제목·채널명을 자동으로 확인합니다";
      statusBadge.classList.remove("loaded");
    }
    const catBtn = first.querySelector("[data-category-picker]");
    if (catBtn) {
      catBtn.dataset.selectedCategories = "[]";
      const valSpan = catBtn.querySelector("[data-category-value]");
      if (valSpan) valSpan.textContent = "미정";
    }
    const ratioSel = first.querySelector(".entry-ratio-select");
    if (ratioSel) {
      delete ratioSel.dataset.userModified;
      ratioSel.innerHTML = getRatioOptionsHtml(getDefaultRatio());
      ratioSel.value = String(getDefaultRatio());
    }
  }
  const progressCard = document.getElementById("summary-progress-card");
  if (progressCard) progressCard.hidden = true;
  document.querySelector('#video-entries-list input[type="url"]')?.focus();
}

document.getElementById("reset-input-form-btn")?.addEventListener("click", () => {
  resetNewSummaryInputForm();
  showToast("새 영상을 입력할 수 있도록 입력창을 초기화했습니다.");
});

// 7. Results Library Table, Search, Sort, Pagination & Stats
let currentLibraryPage = 1;
let libraryPerPage = 8;
let currentPublicPage = 1;
const PUBLIC_PER_PAGE = 8;
let pendingDeleteId = null;
const selectedLibraryIds = new Set();

function updateBulkActionBar() {
  const bar = document.getElementById("bulk-action-bar");
  const countEl = document.getElementById("bulk-selected-count");
  if (!bar || !countEl) return;
  const cnt = selectedLibraryIds.size;
  countEl.textContent = String(cnt);
  bar.hidden = cnt === 0;
}

function renderResultsLibrary() {
  const totalCount = state.summaries.length;
  document.querySelectorAll(".nav-count, .section-title > span").forEach((el) => {
    el.textContent = String(totalCount);
  });
  const statStrong = document.getElementById("stat-total-count") || document.querySelector(".stat-card strong");
  if (statStrong) statStrong.textContent = String(totalCount);

  const newItemsCount = state.summaries.filter((s) => s.isNew).length;
  const weeklyEl = document.getElementById("stat-weekly-count");
  if (weeklyEl) weeklyEl.textContent = `↗ ${newItemsCount}개`;

  const savedHours = (totalCount * 0.5).toFixed(1);
  const hoursEl = document.getElementById("stat-saved-hours");
  if (hoursEl) hoursEl.textContent = savedHours;

  let filtered = state.summaries.filter((item) => {
    const cats = item.categories || ["미정"];
    const matchCat =
      state.activeCategoryFilter === "전체"
        ? true
        : state.activeCategoryFilter === "즐겨찾기"
        ? Boolean(item.bookmarked)
        : cats.includes(state.activeCategoryFilter);
    const q = (state.searchQuery || "").toLowerCase();
    const matchQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.channel.toLowerCase().includes(q) ||
      cats.some((c) => c.toLowerCase().includes(q));
    return matchCat && matchQuery;
  });

  filtered.sort((a, b) => (state.sortAsc ? a.id - b.id : b.id - a.id));

  const totalPages = Math.max(1, Math.ceil(filtered.length / libraryPerPage));
  if (currentLibraryPage > totalPages) currentLibraryPage = totalPages;
  const startIdx = (currentLibraryPage - 1) * libraryPerPage;
  const pageItems = filtered.slice(startIdx, startIdx + libraryPerPage);

  const toolbarCount = document.querySelector("#results .table-toolbar > p strong");
  if (toolbarCount) toolbarCount.textContent = String(filtered.length);

  const tbody = document.querySelector(".summary-table tbody");
  if (!tbody) return;

  tbody.innerHTML = pageItems
    .map((item) => {
      const cats = item.categories && item.categories.length ? item.categories : ["미정"];
      const tagsHtml = cats
        .map((c) => `<span class="tag tag-${escapeHtml(getCategoryColor(c))}" data-row-cat="${item.id}" title="클릭하여 분류 수정" style="cursor:pointer">${escapeHtml(getCategoryNumberedLabel(c))}</span>`)
        .join(" ");
      const isChecked = selectedLibraryIds.has(item.id);
      return `
        <tr data-summary-id="${item.id}">
          <td class="check-col"><input type="checkbox" data-row-check="${item.id}" ${isChecked ? "checked" : ""} aria-label="#${item.id} 선택"></td>
          <td class="row-number">${item.id}</td>
          <td>
            <div class="row-title-wrap">
              <a class="video-title" href="#summary" data-open-summary="${item.id}">
                ${escapeHtml(item.title)} ${item.isNew ? '<span class="new-badge">N</span>' : ""}
              </a>
              <button type="button" class="row-title-edit-btn" data-quick-title="${item.id}" title="제목 빠르게 수정" aria-label="제목 수정">${iconSvg("edit")}</button>
            </div>
            <span class="channel">${iconSvg("youtube")}${escapeHtml(item.channel)} · <small>${escapeHtml(item.template || "기본서식")} (${item.ratio}%)</small></span>
          </td>
          <td><div style="display:inline-flex;align-items:center;gap:4px;flex-wrap:wrap">${tagsHtml}<button type="button" class="row-title-edit-btn" data-row-cat="${item.id}" title="분류 수정" aria-label="#${item.id} 분류 수정">${iconSvg("edit")}</button></div></td>
          <td class="date">${escapeHtml(item.date)}</td>
          <td>
            <div class="row-actions">
              <button type="button" data-row-tts="${item.id}" title="요약본 TTS 음성 듣기" aria-label="${escapeHtml(item.title)} TTS 듣기">${iconSvg("volume")}</button>
              <button type="button" class="bookmark-button ${item.bookmarked ? "saved" : ""}" data-row-bm="${item.id}" title="즐겨찾기 토글" aria-label="즐겨찾기" style="width:25px;height:25px">${iconSvg("bookmark")}</button>
              <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(item.title)} 유튜브 바로가기" title="유튜브 바로가기">${iconSvg("arrow-up-right")}</a>
              <button type="button" class="kakao-share" data-share-id="${item.id}" aria-label="${escapeHtml(item.title)} 카카오톡으로 전송" title="카카오톡으로 전송">${iconSvg("message")}<span>카톡 전송</span></button>
              <button type="button" data-row-del="${item.id}" title="게시글 삭제" aria-label="게시글 삭제">${iconSvg("trash")}</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  const selectAllCb = document.getElementById("select-all-rows");
  if (selectAllCb) {
    selectAllCb.checked = pageItems.length > 0 && pageItems.every((it) => selectedLibraryIds.has(it.id));
  }
  updateBulkActionBar();

  tbody.querySelectorAll("[data-row-check]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const id = Number(cb.dataset.rowCheck);
      if (cb.checked) selectedLibraryIds.add(id);
      else selectedLibraryIds.delete(id);
      if (selectAllCb) {
        selectAllCb.checked = pageItems.length > 0 && pageItems.every((it) => selectedLibraryIds.has(it.id));
      }
      updateBulkActionBar();
    });
  });

  const bottomInfo = document.querySelector(".table-bottom > span:first-child");
  if (bottomInfo) {
    const fromNum = filtered.length ? startIdx + 1 : 0;
    const toNum = Math.min(filtered.length, startIdx + pageItems.length);
    bottomInfo.textContent = `${filtered.length}개 중 ${fromNum}–${toNum}개 표시`;
  }

  const pagNav = document.querySelector("#results .pagination");
  if (pagNav) {
    const prevBtn = `<button type="button" data-lib-page="${currentLibraryPage - 1}" aria-label="이전 페이지" ${currentLibraryPage <= 1 ? "disabled" : ""}>${iconSvg("chevron-left")}</button>`;
    const pageBtns = Array.from({ length: totalPages }, (_, idx) => {
      const p = idx + 1;
      return `<button type="button" data-lib-page="${p}" class="${p === currentLibraryPage ? "selected" : ""}">${p}</button>`;
    }).join("");
    const nextBtn = `<button type="button" data-lib-page="${currentLibraryPage + 1}" aria-label="다음 페이지" ${currentLibraryPage >= totalPages ? "disabled" : ""}>${iconSvg("chevron-right")}</button>`;
    pagNav.innerHTML = prevBtn + pageBtns + nextBtn;
    pagNav.querySelectorAll("[data-lib-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        currentLibraryPage = Number(btn.dataset.libPage);
        renderResultsLibrary();
      });
    });
  }

  tbody.querySelectorAll("[data-open-summary]").forEach((link) => {
    link.addEventListener("click", () => {
      const id = Number(link.dataset.openSummary);
      state.currentSummaryId = id;
      saveAppState();
      renderSummaryDetail(id);
    });
  });

  tbody.querySelectorAll("[data-quick-title]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.quickTitle);
      state.currentSummaryId = id;
      saveAppState();
      renderSummaryDetail(id);
      window.location.hash = "summary";
      setTimeout(() => openDetailTitleEditor(), 60);
    });
  });

  tbody.querySelectorAll("[data-row-tts]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.rowTts);
      state.currentSummaryId = id;
      saveAppState();
      renderSummaryDetail(id);
      window.location.hash = "summary";
      setTimeout(() => startTtsPlayback("detail"), 100);
    });
  });

  tbody.querySelectorAll("[data-row-bm]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.rowBm);
      const target = state.summaries.find((s) => s.id === id);
      if (!target) return;
      target.bookmarked = !target.bookmarked;
      saveAppState();
      renderCategoriesUI();
      renderResultsLibrary();
      renderPublicView();
      showToast(target.bookmarked ? "즐겨찾기에 추가되었습니다." : "즐겨찾기에서 해제되었습니다.");
    });
  });

  tbody.querySelectorAll("[data-share-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.shareId);
      openKakaoShareModal(id);
    });
  });

  tbody.querySelectorAll("[data-row-del]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.rowDel);
      promptDeleteSummary(id);
    });
  });

  tbody.querySelectorAll("[data-row-cat]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = Number(el.dataset.rowCat);
      openCategoryPickerForSummary(id);
    });
  });
}

const resultsSearchInput = document.querySelector("#results .search input");
let libSearchTimer = null;
resultsSearchInput?.addEventListener("input", () => {
  window.clearTimeout(libSearchTimer);
  libSearchTimer = window.setTimeout(() => {
    state.searchQuery = resultsSearchInput.value.trim();
    currentLibraryPage = 1;
    renderResultsLibrary();
  }, 160);
});

document.getElementById("dedupe-summaries-btn")?.addEventListener("click", () => {
  const seenKeys = new Set();
  const beforeCount = state.summaries.length;
  // Sort newest first so we keep the latest summary and its exact ID
  const sortedNewest = [...state.summaries].sort((a, b) => Number(b.id) - Number(a.id));
  const deduped = [];
  for (const item of sortedNewest) {
    const vid = extractYoutubeVideoId(item.url);
    const key = vid ? `vid:${vid}` : `title:${(item.title || "").trim().toLowerCase()}`;
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);
    deduped.push(item);
  }
  const removed = beforeCount - deduped.length;
  if (removed <= 0) {
    showToast("중복된 게시글이 없습니다.");
    return;
  }
  state.summaries = deduped;
  if (!state.summaries.some((s) => s.id === state.currentSummaryId)) {
    state.currentSummaryId = state.summaries[0]?.id || 1;
  }
  saveAppState();
  renderCategoriesUI();
  renderResultsLibrary();
  renderPublicView();
  showToast(`중복된 게시글 ${removed}건을 정리했습니다. (기존 게시글 번호는 그대로 유지됩니다)`);
});

document.getElementById("select-all-rows")?.addEventListener("change", (e) => {
  const checked = e.target.checked;
  document.querySelectorAll("#results tbody [data-row-check]").forEach((cb) => {
    const id = Number(cb.dataset.rowCheck);
    cb.checked = checked;
    if (checked) selectedLibraryIds.add(id);
    else selectedLibraryIds.delete(id);
  });
  updateBulkActionBar();
});

document.getElementById("bulk-apply-cat-btn")?.addEventListener("click", () => {
  const chosenCat = document.getElementById("bulk-category-select")?.value;
  if (!chosenCat || !selectedLibraryIds.size) return;
  state.summaries.forEach((s) => {
    if (selectedLibraryIds.has(s.id)) {
      s.categories = [chosenCat];
    }
  });
  const count = selectedLibraryIds.size;
  selectedLibraryIds.clear();
  saveAppState();
  renderCategoriesUI();
  renderResultsLibrary();
  renderPublicView();
  showToast(`선택한 ${count}개 게시글의 분류가 ‘${getCategoryNumberedLabel(chosenCat)}’(으)로 일괄 변경되었습니다.`);
});

document.getElementById("bulk-export-md-btn")?.addEventListener("click", () => {
  if (!selectedLibraryIds.size) return;
  const targets = state.summaries.filter((s) => selectedLibraryIds.has(s.id));
  const combinedMd = targets
    .map((it) => {
      const kps = (it.takeaways || []).map((t, i) => `${i + 1}. ${t.replace(/<[^>]+>/g, "")}`).join("\n");
      return `# ${it.title}\n- 채널: ${it.channel}\n- 분류: ${(it.categories || ["미정"]).join(", ")}\n- 링크: ${it.url}\n\n## 핵심 요약\n${kps}`;
    })
    .join("\n\n---\n\n");
  triggerFileDownload(`You선생_선택요약_${targets.length}건.md`, combinedMd, "text/markdown;charset=utf-8");
  showToast(`선택한 ${targets.length}개 요약본을 Markdown 파일로 저장했습니다.`);
});

document.getElementById("bulk-delete-btn")?.addEventListener("click", () => {
  if (!selectedLibraryIds.size) return;
  const count = selectedLibraryIds.size;
  if (!confirm(`선택한 ${count}개 요약을 삭제하시겠습니까? 삭제 전 백업 파일이 다운로드됩니다.`)) return;
  triggerFileDownload("You선생_삭제전백업.json", JSON.stringify(state, null, 2), "application/json");
  state.summaries = state.summaries.filter((s) => !selectedLibraryIds.has(s.id));
  selectedLibraryIds.clear();
  if (state.summaries.length > 0 && !state.summaries.some((s) => s.id === state.currentSummaryId)) {
    state.currentSummaryId = state.summaries[0].id;
  }
  saveAppState();
  renderCategoriesUI();
  renderResultsLibrary();
  renderPublicView();
  showToast(`선택한 ${count}개의 요약 게시글이 삭제되었습니다. (기존 번호 유지)`);
});

document.getElementById("backup-export-btn")?.addEventListener("click", () => {
  const jsonStr = JSON.stringify(state, null, 2);
  const today = new Date().toISOString().slice(0, 10);
  triggerFileDownload(`You선생_전체백업_${today}.json`, jsonStr, "application/json;charset=utf-8");
  showToast("전체 라이브러리 데이터(.json) 백업 파일이 다운로드되었습니다.");
});

document.getElementById("backup-import-btn")?.addEventListener("click", () => {
  document.getElementById("backup-import-file")?.click();
});

document.getElementById("backup-import-file")?.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(String(reader.result || ""));
      if (imported && Array.isArray(imported.summaries)) {
        if (!imported.summaries.every(s => Number.isInteger(s.id) && s.id > 0 && typeof s.title === "string")
            || new Set(imported.summaries.map(s => s.id)).size !== imported.summaries.length) {
          throw new Error("요약 번호·제목 형식 또는 중복 번호를 확인해 주세요.");
        }
        if (!confirm(`현재 ${state.summaries.length}건을 백업한 뒤 파일의 ${imported.summaries.length}건으로 대체하시겠습니까?`)) return;
        triggerFileDownload("You선생_복원전백업.json", JSON.stringify(state, null, 2), "application/json");
        Object.assign(state, imported);
        saveAppState();
        renderAccountsUI();
        renderCategoriesUI();
        renderTemplatesUI();
        renderResultsLibrary();
        renderSummaryDetail(state.currentSummaryId);
        renderPublicView();
        showToast(`JSON 백업 파일에서 총 ${state.summaries.length}개의 요약 데이터를 복원했습니다!`);
      } else {
        showToast("유효한 You선생 백업 JSON 파일이 아닙니다.");
      }
    } catch (err) {
      showToast("백업 파일을 읽는 중 오류가 발생했습니다.");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});

const sortButton = document.querySelector("#results .sort-button");
sortButton?.addEventListener("click", () => {
  state.sortAsc = !state.sortAsc;
  sortButton.innerHTML = `${state.sortAsc ? "1번부터 (오래된순)" : "최신 번호순"}${iconSvg("chevron-down")}`;
  renderResultsLibrary();
});

document.getElementById("library-per-page-select")?.addEventListener("change", (e) => {
  libraryPerPage = Number(e.target.value) || 8;
  currentLibraryPage = 1;
  renderResultsLibrary();
});

function renderVideoEmbedPlayer(item, startSeconds = 0) {
  const box = document.getElementById("detail-video-embed-box");
  if (!box) return;
  const summaryPage = document.getElementById("summary");
  const isSummaryVisible = Boolean(summaryPage && !summaryPage.hidden);
  const vid = extractYoutubeVideoId(item.url);
  if (vid && (isSummaryVisible || startSeconds > 0)) {
    const autoPlayParam = startSeconds > 0 ? `&start=${Math.floor(startSeconds)}&autoplay=1` : "";
    box.innerHTML = `<iframe loading="lazy" src="https://www.youtube.com/embed/${escapeHtml(vid)}?rel=0${autoPlayParam}" title="${escapeHtml(item.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    box.innerHTML = `<div class="video-preview"><span id="detail-preview-title">${escapeHtml(item.title.slice(0, 18))}</span>${iconSvg("play")}<small id="detail-preview-channel">${escapeHtml(item.channel)}</small></div>`;
  }
}

// 8. Summary Detail Page (Original vs Edited, Live Ratio Re-summarize, Editor Save, Publish)
let activeVersionTab = "original";

function formatInlineMarkdownBold(str) {
  return String(str || "")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^[-•]\s*/, "")
    .trim();
}

function renderTakeawaysListHtml(takeaways = []) {
  if (!Array.isArray(takeaways) || !takeaways.length) return "";
  return takeaways
    .map((raw) => {
      const parts = String(raw || "")
        .split(/\r?\n+/)
        .map((l) => l.trim())
        .filter(Boolean);
      if (parts.length >= 2) {
        const headHtml = formatInlineMarkdownBold(parts[0]);
        const subHtml = parts
          .slice(1)
          .map((p) => `<div style="margin-top:4px;padding-left:10px;color:#3d4d3f;line-height:1.75">• ${formatInlineMarkdownBold(p)}</div>`)
          .join("");
        return `<li style="margin-bottom:8px"><div>${headHtml}</div>${subHtml}</li>`;
      }
      return `<li>${formatInlineMarkdownBold(raw)}</li>`;
    })
    .join("");
}

function parseRawMarkdownTakeawaysText(rawText) {
  const lines = String(rawText || "")
    .split(/\r?\n+/)
    .map((l) => l.replace(/^\d+\.\s*/, "").replace(/^[•*-]\s*/, "").trim())
    .filter(Boolean);
  if (!lines.length) return [];
  const grouped = [];
  for (let i = 0; i < lines.length; i++) {
    const cur = lines[i];
    const next = lines[i + 1];
    const isShortHeading =
      (cur.startsWith("**") && cur.endsWith("**") && cur.length <= 60) ||
      (cur.length <= 38 && !/[.?!다요죠]$/.test(cur));
    if (isShortHeading && next && next.length > cur.length) {
      const boldHead = cur.startsWith("**") ? cur : `**${cur}**`;
      grouped.push(`${boldHead}\n${next}`);
      i++;
    } else {
      grouped.push(cur);
    }
  }
  return grouped;
}

function renderSummaryDetail(summaryId) {
  const item = state.summaries.find((s) => s.id === Number(summaryId)) || state.summaries[0];
  if (!item) return;
  state.currentSummaryId = item.id;

  const postSelect = document.getElementById("detail-post-select");
  if (postSelect) {
    postSelect.innerHTML = state.summaries
      .map(
        (s) =>
          `<option value="${s.id}" ${s.id === item.id ? "selected" : ""}>#${s.id} · ${escapeHtml(s.title.slice(0, 38))}</option>`
      )
      .join("");
  }

  const primaryCat = (item.categories && item.categories[0]) || "미정";
  const badgeEl = document.getElementById("detail-category-badge");
  if (badgeEl) {
    badgeEl.className = `tag tag-${getCategoryColor(primaryCat)}`;
    badgeEl.textContent = (item.categories || ["미정"])
      .map((c) => getCategoryNumberedLabel(c))
      .join(", ");
    badgeEl.style.cursor = "pointer";
    badgeEl.title = "클릭하여 분류 수정";
  }

  const statusBadge = document.getElementById("detail-status-badge");
  if (statusBadge) {
    statusBadge.innerHTML = `<span></span>${item.published ? "공개 게시됨" : "비공개 보관"}`;
  }
  const pubLabel = document.getElementById("publish-button-label");
  if (pubLabel) {
    pubLabel.textContent = item.published ? "You선생 공개 페이지 보기" : "You선생에 게시하기";
  }

  document.getElementById("summary-title").textContent = item.title;
  document.getElementById("detail-title-editor").hidden = true;
  document.querySelector(".detail-title-row").hidden = false;
  document.getElementById("detail-channel").innerHTML = `${iconSvg("youtube")}${escapeHtml(item.channel)}`;
  document.getElementById("detail-date").innerHTML = `${iconSvg("calendar")}작업일 ${escapeHtml(item.date)}`;
  document.getElementById("detail-ratio-meta").innerHTML = `${iconSvg("sliders")}요약률 ${item.ratio}% (${escapeHtml(item.template || "기본서식")})`;
  document.getElementById("detail-ai-meta").innerHTML = `${iconSvg("sparkles")}${escapeHtml(item.aiModel || "OpenAI GPT-4o")}`;
  if (item.quality) {
    document.getElementById("detail-ai-meta").append(document.createTextNode(
      ` · ${item.quality.notice || ""}${item.quality.chunks ? ` · ${item.quality.chunks}구간 / ${item.quality.processedChars}자 처리` : ""}${item.quality.bodyChars ? ` · 본문 ${item.quality.bodyChars}자 / 목표 ${item.quality.targetBodyChars}자` : ""}`
    ));
  }

  const sourceLink = document.getElementById("detail-source-link");
  if (sourceLink) {
    sourceLink.href = item.url;
    sourceLink.innerHTML = `${escapeHtml(item.url)} ${iconSvg("arrow-up-right")}`;
  }
  const asideLink = document.getElementById("detail-aside-link");
  if (asideLink) asideLink.href = item.url;

  const readMin = Math.max(1, Math.round(item.ratio / 10));
  document.getElementById("detail-reading-time").innerHTML = `${iconSvg("clock")}약 ${readMin}분 읽기`;

  const contentEl = document.getElementById("article-content");
  const scriptSearchToolbar = document.getElementById("script-search-toolbar");
  if (activeVersionTab === "script") {
    if (scriptSearchToolbar) scriptSearchToolbar.hidden = false;
    const segs =
      item.scriptSegments && item.scriptSegments.length
        ? item.scriptSegments
        : parseRawScriptToSegments(
            contentEl.textContent ||
              `[00:00] ${item.title} (${item.channel}) 도입부 스크립트\n[00:45] ${item.excerpt || "주요 핵심 내용"}\n[01:30] ${(item.takeaways || []).join(" ")}`
          );
    const sq = (document.getElementById("script-search-input")?.value || "").trim().toLowerCase();
    const filteredSegs = sq
      ? segs.filter((s) => (s.text || "").toLowerCase().includes(sq) || (s.time || "").includes(sq))
      : segs;
    const countSpan = document.getElementById("script-search-count");
    if (countSpan) {
      countSpan.textContent = sq
        ? `검색 결과: ${filteredSegs.length}개 구간 일치 (전체 ${segs.length}구간)`
        : "타임스탬프를 클릭하면 우측 영상이 해당 시간으로 이동합니다";
    }
    contentEl.innerHTML = formatScriptSegmentsHtml(filteredSegs, item.title, item.channel);
    contentEl.querySelectorAll(".script-time-badge").forEach((badge) => {
      badge.title = "클릭 시 우측 유튜브 플레이어에서 해당 시간부터 재생합니다";
      badge.addEventListener("click", () => {
        const secs = parseTimeToSeconds(badge.textContent.trim());
        renderVideoEmbedPlayer(item, secs);
        showToast(`유튜브 영상을 [${badge.textContent.trim()}] 위치부터 재생합니다.`);
      });
    });
  } else {
    if (scriptSearchToolbar) scriptSearchToolbar.hidden = true;
    contentEl.innerHTML = activeVersionTab === "original" ? item.originalHtml : item.editedHtml;
    contentEl.querySelectorAll("h2.hanaro-h2-major, h3.hanaro-h3, p.hanaro-p").forEach((el) => {
      el.title = "클릭 시 이 문단부터 TTS 음성 낭독을 시작합니다";
      el.addEventListener("click", () => {
        if (contentEl.contentEditable === "true") return;
        startTtsPlaybackFromElement(el);
      });
    });
  }
  contentEl.contentEditable = "false";
  document.getElementById("editor-toolbar").hidden = true;
  document.getElementById("save-edit-button").hidden = true;
  document.getElementById("cancel-edit-button").hidden = true;

  const takeawaysEl = document.getElementById("detail-takeaways");
  if (takeawaysEl) {
    takeawaysEl.innerHTML = renderTakeawaysListHtml(item.takeaways || []);
    takeawaysEl.contentEditable = "false";
  }

  const outlineEl = document.getElementById("detail-outline");
  if (outlineEl) {
    outlineEl.innerHTML = (item.outline || [])
      .map((o, idx) => `<li data-outline-idx="${idx}"><span>0${idx + 1}</span>${escapeHtml(o)}</li>`)
      .join("");
    outlineEl.querySelectorAll("[data-outline-idx]").forEach((li) => {
      li.addEventListener("click", () => {
        const idx = Number(li.dataset.outlineIdx);
        const headings = contentEl.querySelectorAll("h2.hanaro-h2-major, h1, h2");
        if (headings[idx]) {
          headings[idx].scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  renderVideoEmbedPlayer(item, 0);

  const detailRatioInput = document.getElementById("detail-ratio");
  const detailRatioLabel = document.getElementById("detail-ratio-label");
  if (detailRatioInput && detailRatioLabel) {
    detailRatioInput.value = String(item.ratio);
    detailRatioLabel.textContent = `${item.ratio}%`;
  }
  const resumTplSelect = document.getElementById("detail-resum-template");
  if (resumTplSelect) {
    const matchedTpl = state.templates.find((t) => t.name === item.template);
    resumTplSelect.innerHTML = getTemplateOptionsHtml(matchedTpl ? matchedTpl.id : "");
  }
}

document.getElementById("script-search-input")?.addEventListener("input", () => {
  if (activeVersionTab === "script") {
    renderSummaryDetail(state.currentSummaryId);
  }
});

document.getElementById("detail-post-select")?.addEventListener("change", (e) => {
  stopTtsPlayback(false);
  const id = Number(e.target.value);
  state.currentSummaryId = id;
  saveAppState();
  renderSummaryDetail(id);
});

document.querySelectorAll("[data-version]").forEach((button) => {
  button.addEventListener("click", () => {
    activeVersionTab = button.dataset.version;
    document.querySelectorAll("[data-version]").forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    renderSummaryDetail(state.currentSummaryId);
  });
});

function openDetailTitleEditor() {
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (!item) return;
  const titleRow = document.querySelector(".detail-title-row");
  const editorRow = document.getElementById("detail-title-editor");
  const titleInput = document.getElementById("detail-title-input");
  if (!editorRow || !titleInput) return;
  titleInput.value = item.title;
  if (titleRow) titleRow.hidden = true;
  editorRow.hidden = false;
  titleInput.focus();
  titleInput.select();
}

function saveDetailTitleEdit() {
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (!item) return;
  const titleInput = document.getElementById("detail-title-input");
  const newTitle = titleInput?.value.trim();
  if (!newTitle) {
    showToast("제목을 입력해주세요.");
    titleInput?.focus();
    return;
  }
  item.title = newTitle;
  saveAppState();
  renderResultsLibrary();
  renderPublicView();
  renderSummaryDetail(item.id);
  showToast("요약본 제목이 수정되었습니다.");
}

document.getElementById("detail-title-edit-btn")?.addEventListener("click", openDetailTitleEditor);
document.getElementById("detail-title-action-btn")?.addEventListener("click", openDetailTitleEditor);
document.getElementById("detail-title-save-btn")?.addEventListener("click", saveDetailTitleEdit);
document.getElementById("detail-title-cancel-btn")?.addEventListener("click", () => {
  document.getElementById("detail-title-editor").hidden = true;
  document.querySelector(".detail-title-row").hidden = false;
});
document.getElementById("detail-title-input")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    saveDetailTitleEdit();
  } else if (e.key === "Escape") {
    document.getElementById("detail-title-editor").hidden = true;
    document.querySelector(".detail-title-row").hidden = false;
  }
});

document.getElementById("edit-button")?.addEventListener("click", () => {
  const editedTab = document.getElementById("edited-tab");
  editedTab.click();
  const contentEl = document.getElementById("article-content");
  const takeawaysEl = document.getElementById("detail-takeaways");
  contentEl.contentEditable = "true";
  if (takeawaysEl) takeawaysEl.contentEditable = "true";
  document.getElementById("editor-toolbar").hidden = false;
  document.getElementById("save-edit-button").hidden = false;
  document.getElementById("cancel-edit-button").hidden = false;
  contentEl.focus();
});

document.getElementById("cancel-edit-button")?.addEventListener("click", () => {
  renderSummaryDetail(state.currentSummaryId);
  showToast("편집을 취소하고 기존 내용을 복원했습니다.");
});

document.querySelectorAll("#editor-toolbar [data-cmd]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.execCommand(btn.dataset.cmd, false, null);
    document.getElementById("article-content").focus();
  });
});

document.querySelectorAll("[data-ai-edit-preset]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = document.getElementById("detail-ai-edit-prompt-input");
    if (input) {
      input.value = btn.dataset.aiEditPreset || "";
      input.focus();
    }
  });
});

async function runAiEditCommandOnSummary() {
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (!item) return;
  const promptInput = document.getElementById("detail-ai-edit-prompt-input");
  const extraCmd = promptInput?.value.trim() || "";
  if (!extraCmd) {
    promptInput?.focus();
    showToast("AI에게 지시할 추가 요약·수정 명령어를 입력해주세요.");
    return;
  }

  const runBtn = document.getElementById("detail-ai-edit-run-btn");
  if (runBtn) {
    runBtn.disabled = true;
    runBtn.innerHTML = `${iconSvg("sparkles")}AI 변환 중...`;
  }

  try {
    const contentEl = document.getElementById("article-content");
    const takeawaysEl = document.getElementById("detail-takeaways");
    let segs = (item.scriptSegments || []).filter((s) => !isGarbageScriptSegmentText(s.text));
    if (!segs.length) {
      throw new Error("원문이 없습니다. 스크립트를 입력하거나 다시 불러온 뒤 편집해 주세요.");
    }

    const aiLabel = getAiModelDisplayName(state.selectedAiModel);
    const currentDraftText = `${contentEl?.innerText || ""}\n\n[현재 핵심 요점]\n${takeawaysEl?.innerText || ""}`.trim();
    const fullCommand = `${extraCmd}\n\n[참고용 현재 요약본 초안]\n${currentDraftText.slice(0, 6000)}`;

    const resummarized = await runSummarizationAlgorithm(
      segs,
      item.title,
      item.channel,
      item.ratio || 30,
      item.template || "기본서식",
      aiLabel,
      null,
      item.url,
      fullCommand
    );

    if (resummarized && resummarized.html) {
      if (contentEl) {
        contentEl.innerHTML = resummarized.html;
        contentEl.contentEditable = "true";
      }
      if (takeawaysEl && Array.isArray(resummarized.takeaways) && resummarized.takeaways.length) {
        takeawaysEl.innerHTML = renderTakeawaysListHtml(resummarized.takeaways);
        takeawaysEl.contentEditable = "true";
        item.takeaways = resummarized.takeaways;
      }
      if (Array.isArray(resummarized.outline) && resummarized.outline.length) {
        item.outline = resummarized.outline;
      }
      item.editedHtml = resummarized.html;
      item.quality = resummarized.quality;
      await flushAppState();
      showToast(`AI 추가 요약 명령어(‘${extraCmd.slice(0, 24)}’)가 [요약 수정본]에 반영되었습니다!`);
    }
  } catch (err) {
    showToast(`AI 편집 실패: ${err.message}`);
  } finally {
    if (runBtn) {
      runBtn.disabled = false;
      runBtn.innerHTML = `${iconSvg("sparkles")}AI 명령 실행`;
    }
  }
}

document.getElementById("detail-ai-edit-run-btn")?.addEventListener("click", runAiEditCommandOnSummary);
document.getElementById("detail-ai-edit-prompt-input")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    runAiEditCommandOnSummary();
  }
});

document.getElementById("save-edit-button")?.addEventListener("click", () => {
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (!item) return;
  const contentEl = document.getElementById("article-content");
  const takeawaysEl = document.getElementById("detail-takeaways");
  item.editedHtml = contentEl.innerHTML;
  if (takeawaysEl) {
    const rawInnerText = takeawaysEl.innerText || "";
    if (rawInnerText.includes("**") || rawInnerText.includes("- ")) {
      const parsedMd = parseRawMarkdownTakeawaysText(rawInnerText);
      if (parsedMd.length) {
        item.takeaways = parsedMd;
      }
    } else {
      const editedTakeaways = [...takeawaysEl.querySelectorAll("li")]
        .map((li) => li.innerHTML.trim())
        .filter(Boolean);
      if (editedTakeaways.length) {
        item.takeaways = editedTakeaways;
      } else {
        const fallbackLines = parseRawMarkdownTakeawaysText(rawInnerText);
        if (fallbackLines.length) item.takeaways = fallbackLines;
      }
    }
    takeawaysEl.innerHTML = renderTakeawaysListHtml(item.takeaways);
  }
  contentEl.contentEditable = "false";
  if (takeawaysEl) takeawaysEl.contentEditable = "false";
  document.getElementById("editor-toolbar").hidden = true;
  document.getElementById("save-edit-button").hidden = true;
  document.getElementById("cancel-edit-button").hidden = true;
  saveAppState();
  showToast("요약 수정본과 핵심 요점이 함께 저장되었습니다.");
});

document.getElementById("detail-copy-summary-btn")?.addEventListener("click", async () => {
  document.getElementById("detail-export-dropdown")?.removeAttribute("open");
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (!item) return;
  const contentEl = document.getElementById("article-content");
  const takeawaysEl = document.getElementById("detail-takeaways");
  const fullText = `[${item.title}]\n채널: ${item.channel} | 분류: ${(item.categories || ["미정"]).map((c) => getCategoryNumberedLabel(c)).join(", ")}\n원본: ${item.url}\n\n${contentEl?.innerText || ""}\n\n[2. 핵심]\n${takeawaysEl?.innerText || ""}`;
  try {
    await navigator.clipboard.writeText(fullText);
    showToast("요약 본문과 핵심 요점 전체가 클립보드에 복사되었습니다!");
  } catch (e) {
    showToast("클립보드 복사가 완료되었습니다.");
  }
});

function buildMarkdownExport(item) {
  const contentEl = document.getElementById("article-content");
  const lines = [`# ${item.title}`, "", `- **채널**: ${item.channel}`, `- **분류**: ${(item.categories || ["미정"]).map((c) => getCategoryNumberedLabel(c)).join(", ")}`, `- **작업일**: ${item.date}`, `- **요약률 / 서식**: ${item.ratio}% (${item.template || "기본서식"})`, `- **원본 링크**: ${item.url}`, "", "---", "", "## 1. 요약", ""];
  if (contentEl) {
    contentEl.querySelectorAll("h1, h2, h3, p, li").forEach((el) => {
      const tag = el.tagName.toLowerCase();
      const txt = el.innerText.trim();
      if (!txt || txt === "요약") return;
      if (tag === "h1") lines.push(`# ${txt}`, "");
      else if (tag === "h2") lines.push(`## ${txt}`, "");
      else if (tag === "h3") lines.push(`### ${txt}`, "");
      else if (tag === "li") lines.push(`- ${txt}`);
      else lines.push(txt, "");
    });
  }
  lines.push("", "## 2. 핵심", "");
  (item.takeaways || []).forEach((t, idx) => {
    const clean = t.replace(/<[^>]+>/g, "").trim();
    lines.push(`${idx + 1}. ${clean}`);
  });
  return lines.join("\n");
}

function triggerFileDownload(filename, content, mimeType = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

document.getElementById("detail-export-md-btn")?.addEventListener("click", () => {
  document.getElementById("detail-export-dropdown")?.removeAttribute("open");
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (!item) return;
  const md = buildMarkdownExport(item);
  const safeName = item.title.replace(/[\\/:*?"<>|]/g, "_").slice(0, 40);
  triggerFileDownload(`${safeName}_요약.md`, md, "text/markdown;charset=utf-8");
  showToast("Markdown(.md) 파일이 다운로드되었습니다.");
});

document.getElementById("detail-export-txt-btn")?.addEventListener("click", () => {
  document.getElementById("detail-export-dropdown")?.removeAttribute("open");
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (!item) return;
  const txt = buildMarkdownExport(item).replace(/^#+\s*/gm, "");
  const safeName = item.title.replace(/[\\/:*?"<>|]/g, "_").slice(0, 40);
  triggerFileDownload(`${safeName}_요약.txt`, txt, "text/plain;charset=utf-8");
  showToast("텍스트(.txt) 파일이 다운로드되었습니다.");
});

document.getElementById("detail-print-pdf-btn")?.addEventListener("click", () => {
  document.getElementById("detail-export-dropdown")?.removeAttribute("open");
  window.print();
});

document.getElementById("detail-ratio")?.addEventListener("input", (e) => {
  document.getElementById("detail-ratio-label").textContent = `${e.target.value}%`;
});

document.getElementById("apply-ratio-btn")?.addEventListener("click", async () => {
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (!item) return;
  const applyBtn = document.getElementById("apply-ratio-btn");
  if (applyBtn) {
    applyBtn.disabled = true;
    applyBtn.textContent = "재요약 중...";
  }
  try {
    const newRatio = Number(document.getElementById("detail-ratio").value || 30);
    const chosenTplId = document.getElementById("detail-resum-template")?.value ?? "";
    const chosenTplObj = chosenTplId ? findTemplateObject(chosenTplId) : getDefaultTemplate();
    const overwriteEdited = Boolean(document.getElementById("detail-overwrite-edited")?.checked);
    const hadCustomEdit = item.editedHtml && item.editedHtml !== item.originalHtml;

    let segs = (item.scriptSegments || []).filter((s) => !isGarbageScriptSegmentText(s.text));
    item.scriptSegments = segs;
    if (!segs.length && item.url && item.url.includes("youtube")) {
      const tr = await fetchYoutubeTranscriptData(item.url, "");
      if (tr && Array.isArray(tr.segments) && tr.segments.length) {
        segs = tr.segments;
        item.scriptSegments = segs;
      }
    }

    const aiLabel = getAiModelDisplayName(state.selectedAiModel);
    let resummarized = null;
    if (!segs.length && item.url && item.url.includes("youtube")) {
      document.getElementById("ratio").close();
      const audioChoice = await askUserForAudioFallback(item.title, item.url);
      if (audioChoice.useAudio) {
        showToast("유튜브 오디오를 추출하여 AI 음성 분석 요약을 진행 중입니다 (약 15~30초 소요)...");
        resummarized = await runAudioSummarizationViaServer({
          url: item.url,
          title: item.title,
          channel: item.channel,
          ratio: newRatio,
          templateName: chosenTplObj.name,
          customSections: chosenTplObj.sections,
          audioBase64: audioChoice.audioBase64,
          audioMimeType: audioChoice.audioMimeType
        });
        if (resummarized.segments && resummarized.segments.length) {
          item.scriptSegments = resummarized.segments;
        }
      }
    }
    if (!resummarized) {
      const extraResumCmd = document.getElementById("detail-resum-extra-prompt")?.value.trim() || "";
      resummarized = await runSummarizationAlgorithm(
        segs,
        item.title,
        item.channel,
        newRatio,
        chosenTplObj.name,
        aiLabel,
        chosenTplObj.sections,
        item.url,
        extraResumCmd
      );
    }
    item.ratio = newRatio;
    item.template = chosenTplObj.name;
    item.aiModel = resummarized.engine || aiLabel;
    item.quality = resummarized.quality;
    item.originalHtml = resummarized.html;
    if (!hadCustomEdit || overwriteEdited) {
      item.editedHtml = resummarized.html;
    }
    item.takeaways = resummarized.takeaways;
    item.outline = resummarized.outline;
    item.excerpt = resummarized.excerpt;

    activeVersionTab = "original";
    document.querySelectorAll("[data-version]").forEach((tab) => {
      const isOrig = tab.dataset.version === "original";
      tab.classList.toggle("active", isOrig);
      tab.setAttribute("aria-selected", String(isOrig));
    });
    await flushAppState();
    document.getElementById("ratio").close();
    renderSummaryDetail(item.id);
    renderResultsLibrary();
    renderPublicView();
    showToast(`요약률 ${newRatio}% · ${chosenTplObj.name} 설정으로 다시 요약하여 [요약 원본]에 기록했습니다.`);
  } catch (error) {
    showToast(`재요약 실패: ${error.message}`);
  } finally {
    if (applyBtn) {
      applyBtn.disabled = false;
      applyBtn.innerHTML = `${iconSvg("sparkles")}다시 요약하기`;
    }
  }
});

async function executeContentSummarizationForCurrentItem(customRawText = "", extraPrompt = "") {
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (!item) return;

  const runBtn = document.getElementById("detail-run-summarize-btn");
  if (runBtn) {
    runBtn.disabled = true;
    runBtn.innerHTML = `${iconSvg("sparkles")}내용 요약 중...`;
  }

  try {
    let segs = item.scriptSegments || [];
    if (customRawText && customRawText.trim().length > 0) {
      segs = parseRawScriptToSegments(customRawText.trim());
      item.scriptSegments = segs;
    } else if (!segs.length && item.url && item.url.includes("youtube.com")) {
      const tr = await fetchYoutubeTranscriptData(item.url, "");
      if (tr && Array.isArray(tr.segments) && tr.segments.length) {
        segs = tr.segments;
        item.scriptSegments = segs;
      }
    } else if (!segs.length) {
      throw new Error("원문이 없습니다. 직접 입력한 원고 또는 실제 자막이 필요합니다.");
    }

    const aiLabel = getAiModelDisplayName(state.selectedAiModel);
    const summarized = await runSummarizationAlgorithm(
      segs,
      item.title,
      item.channel,
      item.ratio || 30,
      item.template || "기본서식",
      aiLabel,
      null,
      item.url,
      extraPrompt
    );

    item.aiModel = summarized.engine || aiLabel;
    item.quality = summarized.quality;
    item.originalHtml = summarized.html;
    item.editedHtml = summarized.html;
    item.takeaways = summarized.takeaways;
    item.outline = summarized.outline;
    item.excerpt = summarized.excerpt;

    activeVersionTab = "original";
    document.querySelectorAll("[data-version]").forEach((tab) => {
      const isOrig = tab.dataset.version === "original";
      tab.classList.toggle("active", isOrig);
      tab.setAttribute("aria-selected", String(isOrig));
    });

    await flushAppState();
    renderSummaryDetail(item.id);
    renderResultsLibrary();
    renderPublicView();
    showToast(`‘${item.title}’ 내용 요약이 완료되어 [요약 원본]에 기록되었습니다.`);
  } catch (error) {
    showToast(`내용 요약 실패: ${error.message}`);
  } finally {
    if (runBtn) {
      runBtn.disabled = false;
      runBtn.innerHTML = `${iconSvg("sparkles")}내용 요약`;
    }
  }
}

document.getElementById("detail-run-summarize-btn")?.addEventListener("click", () => {
  executeContentSummarizationForCurrentItem("");
});

document.getElementById("run-direct-summarize-btn")?.addEventListener("click", async () => {
  const rawText = document.getElementById("direct-summarize-input")?.value.trim() || "";
  const extraPrompt = document.getElementById("direct-summarize-extra-prompt")?.value.trim() || "";
  document.getElementById("direct-content-summarize")?.close();
  await executeContentSummarizationForCurrentItem(rawText, extraPrompt);
});

document.getElementById("publish-button")?.addEventListener("click", () => {
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (item) {
    item.published = true;
    saveAppState();
    renderSummaryDetail(item.id);
    renderPublicView();
  }
  window.location.hash = "view";
  showToast("‘You선생’ 공개 페이지에 게시되었습니다.");
});

// Detail Page: Category Edit, Kakao Share, and Delete
document.getElementById("detail-category-edit-btn")?.addEventListener("click", () => {
  openCategoryPickerForSummary(state.currentSummaryId);
});
document.getElementById("detail-category-badge")?.addEventListener("click", () => {
  openCategoryPickerForSummary(state.currentSummaryId);
});

document.getElementById("detail-kakao-share-btn")?.addEventListener("click", () => {
  openKakaoShareModal(state.currentSummaryId);
});

function promptDeleteSummary(summaryId) {
  const item = state.summaries.find((s) => s.id === Number(summaryId));
  if (!item) return;
  pendingDeleteId = item.id;
  const descEl = document.getElementById("delete-confirm-desc");
  if (descEl) {
    descEl.textContent = `#${item.id} ‘${item.title}’ 요약 게시글을 정말 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.`;
  }
  document.getElementById("delete-confirm-modal")?.showModal();
}

document.getElementById("detail-delete-btn")?.addEventListener("click", () => {
  promptDeleteSummary(state.currentSummaryId);
});

document.getElementById("confirm-delete-btn")?.addEventListener("click", () => {
  if (pendingDeleteId === null) return;
  const item = state.summaries.find((s) => s.id === pendingDeleteId);
  document.getElementById("delete-confirm-modal")?.close();
  if (!item) return;
  const deletedTitle = item.title;
  state.summaries = state.summaries.filter((s) => s.id !== item.id);
  if (state.summaries.length > 0 && !state.summaries.some((s) => s.id === state.currentSummaryId)) {
    state.currentSummaryId = state.summaries[0].id;
  } else if (!state.summaries.length) {
    state.currentSummaryId = null;
  }
  pendingDeleteId = null;
  saveAppState();
  renderCategoriesUI();
  renderResultsLibrary();
  renderPublicView();
  if (state.currentSummaryId) {
    renderSummaryDetail(state.currentSummaryId);
  }
  if (window.location.hash.startsWith("#summary")) {
    window.location.hash = "results";
  }
  showToast(`‘${deletedTitle}’ 요약 게시글이 삭제되었습니다. (기존 번호 유지)`);
});

// 8-B. Summarization Algorithms Page (Default setting, Add, Edit, Copy, Delete)
function renderAlgorithmsUI() {
  if (!Array.isArray(state.algorithms) || !state.algorithms.length) {
    state.algorithms = [...DEFAULT_ALGORITHMS];
  }
  const activeAlgo = getActiveAlgorithm();
  const bannerName = document.getElementById("active-algo-banner-name");
  if (bannerName && activeAlgo) {
    bannerName.textContent = activeAlgo.name;
  }
  const countEl = document.getElementById("algorithm-count");
  if (countEl) {
    countEl.textContent = String(state.algorithms.length);
  }

  const grid = document.getElementById("algorithm-grid");
  if (!grid) return;

  grid.innerHTML = state.algorithms
    .map((algo, idx) => {
      const isDef = Boolean(algo.isDefault);
      return `
        <article class="algo-card ${isDef ? "default-algo" : ""}" data-algo-id="${escapeHtml(algo.id)}">
          <div class="algo-card-head">
            <span class="tag ${isDef ? "tag-sage" : "tag-purple"}">${isDef ? "★ 기본 알고리즘 (적용 중)" : `알고리즘 #${idx + 1}`}</span>
            <span class="public-date">대주제 ${algo.chapterCount} · 소주제 ${algo.subsPerChapter} · 핵심 ${algo.keypointCount}</span>
          </div>
          <h3>${escapeHtml(algo.name)}</h3>
          <p>${escapeHtml(algo.desc || "")}</p>
          <div class="algo-specs">
            <span><strong>[1] 요약 구조:</strong> # 1.~# ${algo.chapterCount}. / ## 1.1~${algo.chapterCount}.${algo.subsPerChapter}</span>
            <span><strong>[2] 핵심 개수:</strong> 번호형 1.~${algo.keypointCount}.</span>
            <span><strong>문단 어조:</strong> ${algo.tone === "formal" ? "정중체 (~합니다)" : "Hanaro 표준 (~해요/~합니다/~권면)"}</span>
            <span><strong>연동 서식:</strong> 기본서식 (hanaro-people)</span>
          </div>
          <div class="algo-rules-preview">${escapeHtml(algo.rules || "")}</div>
          <div class="algo-card-actions">
            <button type="button" class="algo-btn ${isDef ? "primary-algo" : ""}" data-algo-default="${escapeHtml(algo.id)}">
              ${isDef ? "현재 기본 알고리즘" : "기본 알고리즘으로 세팅"}
            </button>
            <div>
              <button type="button" class="algo-btn" data-algo-edit="${escapeHtml(algo.id)}">${iconSvg("edit")}수정</button>
              <button type="button" class="algo-btn" data-algo-copy="${escapeHtml(algo.id)}">${iconSvg("file")}복사</button>
              <button type="button" class="algo-btn danger-algo" data-algo-del="${escapeHtml(algo.id)}">${iconSvg("trash")}삭제</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  grid.querySelectorAll("[data-algo-default]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.algoDefault;
      state.algorithms.forEach((a) => {
        a.isDefault = a.id === id;
      });
      saveAppState();
      renderAlgorithmsUI();
      const chosen = getActiveAlgorithm();
      showToast(`‘${chosen.name}’이(가) 기본 요약 알고리즘으로 세팅되었습니다.`);
    });
  });

  grid.querySelectorAll("[data-algo-edit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.algoEdit;
      const target = state.algorithms.find((a) => a.id === id);
      if (!target) return;
      document.getElementById("algorithm-modal-title").textContent = "요약 알고리즘 수정";
      document.getElementById("algo-edit-id").value = target.id;
      document.getElementById("algo-name").value = target.name;
      document.getElementById("algo-desc").value = target.desc || "";
      document.getElementById("algo-chapters").value = String(target.chapterCount || 4);
      document.getElementById("algo-subs").value = String(target.subsPerChapter || 3);
      document.getElementById("algo-keypoints").value = String(target.keypointCount || 18);
      document.getElementById("algo-tone").value = target.tone || "hanaro";
      document.getElementById("algo-rules").value = target.rules || "";
      document.getElementById("algorithm-modal").showModal();
    });
  });

  grid.querySelectorAll("[data-algo-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.algoCopy;
      const target = state.algorithms.find((a) => a.id === id);
      if (!target) return;
      const copyItem = {
        ...target,
        id: `algo-${Date.now()}`,
        name: `${target.name} (복사본)`,
        isDefault: false
      };
      state.algorithms.push(copyItem);
      saveAppState();
      renderAlgorithmsUI();
      showToast(`‘${target.name}’ 알고리즘이 복사되었습니다.`);
    });
  });

  grid.querySelectorAll("[data-algo-del]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.algoDel;
      if (state.algorithms.length <= 1) {
        showToast("최소 1개의 기본 요약 알고리즘은 유지되어야 합니다.");
        return;
      }
      const target = state.algorithms.find((a) => a.id === id);
      if (!target) return;
      const wasDefault = target.isDefault;
      state.algorithms = state.algorithms.filter((a) => a.id !== id);
      if (wasDefault && state.algorithms.length > 0) {
        state.algorithms[0].isDefault = true;
      }
      saveAppState();
      renderAlgorithmsUI();
      showToast(`‘${target.name}’ 알고리즘이 삭제되었습니다.`);
    });
  });
}

document.getElementById("open-add-algo-btn")?.addEventListener("click", () => {
  document.getElementById("algorithm-modal-title").textContent = "새 요약 알고리즘 추가생성";
  document.getElementById("algo-edit-id").value = "";
  document.getElementById("algo-name").value = "";
  document.getElementById("algo-desc").value = "";
  document.getElementById("algo-chapters").value = "4";
  document.getElementById("algo-subs").value = "3";
  document.getElementById("algo-keypoints").value = "18";
  document.getElementById("algo-tone").value = "hanaro";
  document.getElementById("algo-rules").value =
    "1. 유튜브 자막 추임새 제거 및 문장 단위 병합\n2. [1] 요약: 대주제(# 1.~# 4.) 및 소주제(## 1.1~) 3문장 문단 생성\n3. [2] 핵심: 번호형 핵심 요점 및 실천 권면 추출";
  document.getElementById("algorithm-modal").showModal();
});

document.getElementById("algorithm-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const editId = document.getElementById("algo-edit-id").value.trim();
  const name = document.getElementById("algo-name").value.trim();
  const desc = document.getElementById("algo-desc").value.trim();
  const chapterCount = Number(document.getElementById("algo-chapters").value || 4);
  const subsPerChapter = Number(document.getElementById("algo-subs").value || 3);
  const keypointCount = Number(document.getElementById("algo-keypoints").value || 18);
  const tone = document.getElementById("algo-tone").value || "hanaro";
  const rules = document.getElementById("algo-rules").value.trim();

  if (!name || !rules) return;

  if (editId) {
    const target = state.algorithms.find((a) => a.id === editId);
    if (target) {
      target.name = name;
      target.desc = desc;
      target.chapterCount = chapterCount;
      target.subsPerChapter = subsPerChapter;
      target.keypointCount = keypointCount;
      target.tone = tone;
      target.rules = rules;
      showToast(`‘${name}’ 알고리즘이 수정되었습니다.`);
    }
  } else {
    state.algorithms.push({
      id: `algo-${Date.now()}`,
      name,
      desc,
      chapterCount,
      subsPerChapter,
      keypointCount,
      tone,
      rules,
      isDefault: false
    });
    showToast(`새 요약 알고리즘 ‘${name}’이(가) 추가생성되었습니다.`);
  }

  saveAppState();
  renderAlgorithmsUI();
  document.getElementById("algorithm-modal").close();
});

// 9. Public View ('You선생') Page & Bookmarks
function renderPublicView() {
  const publishedItems = state.summaries.filter((s) => s.published !== false);
  const bookmarkCount = publishedItems.filter((s) => s.bookmarked).length;

  const bmBtn = document.querySelector(".bookmark-filter");
  if (bmBtn) {
    bmBtn.classList.toggle("active", state.publicBookmarkOnly);
    bmBtn.innerHTML = `${iconSvg("bookmark")}즐겨찾기<span>${bookmarkCount}</span>`;
  }

  let list = publishedItems.filter((item) => {
    const cats = item.categories || ["미정"];
    const matchCat =
      state.activePublicCategoryFilter === "전체" ||
      state.activePublicCategoryFilter === "즐겨찾기" ||
      cats.includes(state.activePublicCategoryFilter);
    const matchBm =
      !(state.publicBookmarkOnly || state.activePublicCategoryFilter === "즐겨찾기") || item.bookmarked;
    const q = (state.publicSearchQuery || "").toLowerCase();
    const matchQ =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.channel.toLowerCase().includes(q) ||
      (item.excerpt || "").toLowerCase().includes(q);
    return matchCat && matchBm && matchQ;
  });

  const countSpan = document.querySelector(".public-list-heading h2 > span");
  if (countSpan) countSpan.textContent = String(list.length);

  const totalPubPages = Math.max(1, Math.ceil(list.length / PUBLIC_PER_PAGE));
  if (currentPublicPage > totalPubPages) currentPublicPage = totalPubPages;
  const pubStart = (currentPublicPage - 1) * PUBLIC_PER_PAGE;
  const pagedList = list.slice(pubStart, pubStart + PUBLIC_PER_PAGE);

  const listContainer = document.querySelector(".public-list");
  if (!listContainer) return;

  listContainer.innerHTML = pagedList
    .map((item) => {
      const primaryCat = (item.categories && item.categories[0]) || "미정";
      const numStr = String(item.id).padStart(3, "0");
      const readMin = Math.max(2, Math.round((item.ratio || 30) / 10));
      return `
        <article class="public-item">
          <span class="public-number">${numStr}</span>
          <div class="public-item-body">
            <div><span class="tag tag-${escapeHtml(getCategoryColor(primaryCat))}">${escapeHtml((item.categories || ["미정"]).map((c) => getCategoryNumberedLabel(c)).join(", "))}</span><span class="public-date">${escapeHtml(item.date)}</span></div>
            <a href="#view?id=${item.id}" data-pub-open="${item.id}"><h3>${escapeHtml(item.title)}</h3></a>
            ${item.quality?.method === "audio-ai" ? '<span class="tag">원음 검토 필요 · 날짜·수량 확인</span>' : ""}
            ${item.quality?.warnings?.length ? '<span class="tag">분량·범위 검토 필요</span>' : ""}
            <p>${escapeHtml(item.excerpt || "")}</p>
            <span class="channel">${escapeHtml(item.channel)} <span>·</span> ${readMin}분 읽기</span>
          </div>
          <div class="public-item-actions">
            <button type="button" class="bookmark-button" data-pub-tts="${item.id}" title="요약본 TTS 음성 듣기" aria-label="${escapeHtml(item.title)} TTS 듣기">${iconSvg("volume")}</button>
            <button type="button" class="bookmark-button" data-pub-kakao="${item.id}" title="카카오톡으로 제목 · 링크 전달" aria-label="${escapeHtml(item.title)} 카카오톡 전달">${iconSvg("message")}</button>
            <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="public-youtube" aria-label="${escapeHtml(item.title)} 유튜브 바로가기">${iconSvg("youtube")}<span>유튜브</span>${iconSvg("arrow-up-right")}</a>
            <button type="button" class="bookmark-button ${item.bookmarked ? "saved" : ""}" data-toggle-bm="${item.id}" aria-label="즐겨찾기 토글" aria-pressed="${item.bookmarked}">${iconSvg("bookmark")}</button>
          </div>
        </article>
      `;
    })
    .join("");

  const pubPagNav = document.querySelector("#view .public-pagination .pagination");
  if (pubPagNav) {
    const prevBtn = `<button type="button" data-pub-page="${currentPublicPage - 1}" aria-label="이전 페이지" ${currentPublicPage <= 1 ? "disabled" : ""}>${iconSvg("chevron-left")}</button>`;
    const pageBtns = Array.from({ length: totalPubPages }, (_, idx) => {
      const p = idx + 1;
      return `<button type="button" data-pub-page="${p}" class="${p === currentPublicPage ? "selected" : ""}">${p}</button>`;
    }).join("");
    const nextBtn = `<button type="button" data-pub-page="${currentPublicPage + 1}" aria-label="다음 페이지" ${currentPublicPage >= totalPubPages ? "disabled" : ""}>${iconSvg("chevron-right")}</button>`;
    pubPagNav.innerHTML = prevBtn + pageBtns + nextBtn;
    pubPagNav.querySelectorAll("[data-pub-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        currentPublicPage = Number(btn.dataset.pubPage);
        renderPublicView();
      });
    });
  }

  listContainer.querySelectorAll("[data-pub-open]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = Number(a.dataset.pubOpen);
      state.currentSummaryId = id;
      saveAppState();
      openPublicReaderModal(id);
    });
  });

  listContainer.querySelectorAll("[data-pub-tts]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.pubTts);
      state.currentSummaryId = id;
      saveLocalState();
      openPublicReaderModal(id);
      // Call startTtsPlayback synchronously inside user gesture so mobile iOS/Android allows speechSynthesis
      startTtsPlayback("reader");
    });
  });

  listContainer.querySelectorAll("[data-pub-kakao]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.pubKakao);
      openKakaoShareModal(id);
    });
  });

  listContainer.querySelectorAll("[data-toggle-bm]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.toggleBm);
      const target = state.summaries.find((s) => s.id === id);
      if (!target) return;
      target.bookmarked = !target.bookmarked;
      if (serverBaseline) saveAppState();
      else saveLocalState();
      renderCategoriesUI();
      renderResultsLibrary();
      renderPublicView();
      showToast(target.bookmarked ? "즐겨찾기에 추가되었습니다." : "즐겨찾기에서 해제되었습니다.");
    });
  });
}

function openPublicReaderModal(summaryId) {
  const item = state.summaries.find((s) => s.id === Number(summaryId)) || state.summaries[0];
  if (!item) return;
  state.currentSummaryId = item.id;
  const primaryCat = (item.categories && item.categories[0]) || "미정";
  const catBadge = document.getElementById("reader-category-badge");
  if (catBadge) {
    catBadge.className = `tag tag-${getCategoryColor(primaryCat)}`;
    catBadge.textContent = (item.categories || ["미정"]).map((c) => getCategoryNumberedLabel(c)).join(", ");
    catBadge.style.cursor = "default";
    catBadge.removeAttribute("title");
  }
  document.getElementById("reader-date").textContent = item.date;
  document.getElementById("reader-channel").textContent = `· ${item.channel}`;
  document.getElementById("reader-modal-title").textContent = item.title;
  const readerContentEl = document.getElementById("reader-article-content");
  if (readerContentEl) {
    readerContentEl.innerHTML = item.editedHtml || item.originalHtml;
    readerContentEl.querySelectorAll("h2.hanaro-h2-major, h3.hanaro-h3, p.hanaro-p").forEach((el) => {
      el.title = "클릭(터치) 시 이 문단부터 TTS 음성 낭독을 시작합니다";
      el.addEventListener("click", () => {
        startTtsPlaybackFromElement(el, "reader");
      });
    });
  }
  const readerTakeawaysEl = document.getElementById("reader-takeaways");
  if (readerTakeawaysEl) {
    readerTakeawaysEl.innerHTML = renderTakeawaysListHtml(item.takeaways || []);
    readerTakeawaysEl.querySelectorAll("li").forEach((li) => {
      li.style.cursor = "pointer";
      li.title = "클릭(터치) 시 이 핵심 요점부터 TTS 음성 낭독을 시작합니다";
      li.addEventListener("click", () => {
        startTtsPlaybackFromElement(li, "reader");
      });
    });
  }
  const ytLink = document.getElementById("reader-youtube-link");
  if (ytLink) ytLink.href = item.url;
  const bmBtn = document.getElementById("reader-bookmark-btn");
  if (bmBtn) {
    bmBtn.innerHTML = `${iconSvg("bookmark")}${item.bookmarked ? "즐겨찾기됨" : "즐겨찾기"}`;
  }
  const modal = document.getElementById("public-reader-modal");
  if (modal && !modal.open) modal.showModal();
}

document.getElementById("reader-bookmark-btn")?.addEventListener("click", () => {
  const item = state.summaries.find((s) => s.id === state.currentSummaryId);
  if (!item) return;
  item.bookmarked = !item.bookmarked;
  if (serverBaseline) saveAppState();
  else saveLocalState();
  renderCategoriesUI();
  renderResultsLibrary();
  renderPublicView();
  const bmBtn = document.getElementById("reader-bookmark-btn");
  if (bmBtn) bmBtn.innerHTML = `${iconSvg("bookmark")}${item.bookmarked ? "즐겨찾기됨" : "즐겨찾기"}`;
  showToast(item.bookmarked ? "즐겨찾기에 추가되었습니다." : "즐겨찾기에서 해제되었습니다.");
});

document.getElementById("reader-kakao-btn")?.addEventListener("click", () => {
  document.getElementById("public-reader-modal")?.close();
  openKakaoShareModal(state.currentSummaryId);
});

// 9-B. TTS (Text-to-Speech) Voice Reader Engine
let ttsQueue = [];
let ttsCurrentIdx = 0;
let ttsIsPlaying = false;
let ttsIsPaused = false;
let ttsTargetContext = "detail"; // "detail" or "reader"

function populateTtsVoices() {
  if (!("speechSynthesis" in window)) return;
  const select = document.getElementById("tts-voice-select");
  if (!select) return;
  const voices = window.speechSynthesis.getVoices() || [];
  const koVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("ko"));
  const list = koVoices.length ? koVoices : voices.slice(0, 8);
  if (!list.length) {
    select.innerHTML = `<option value="">한국어 기본 음성</option>`;
    return;
  }
  const prevVal = select.value;
  select.innerHTML = list
    .map(
      (v, i) =>
        `<option value="${escapeHtml(v.name)}" ${v.name === prevVal || (!prevVal && i === 0) ? "selected" : ""}>${escapeHtml(v.name.replace(/Microsoft |Google /g, ""))}</option>`
    )
    .join("");
}

if ("speechSynthesis" in window) {
  populateTtsVoices();
  window.speechSynthesis.onvoiceschanged = populateTtsVoices;
}

function clearTtsDomHighlight() {
  document.querySelectorAll(".tts-speaking-active").forEach((el) => {
    el.classList.remove("tts-speaking-active");
  });
}

function buildTtsQueue(context = "detail") {
  const scopeSelectId = context === "reader" ? "reader-tts-scope-select" : "tts-scope-select";
  const scope = document.getElementById(scopeSelectId)?.value || "all";
  const contentContainer =
    context === "reader"
      ? document.getElementById("reader-article-content")
      : document.getElementById("article-content");
  const takeawaysContainer =
    context === "reader"
      ? document.getElementById("reader-takeaways")
      : document.getElementById("detail-takeaways");

  const queue = [];

  if (scope === "all" || scope === "summary") {
    if (contentContainer) {
      contentContainer.querySelectorAll("h1, h2, h3, p, li, .script-segment-row").forEach((el) => {
        if (el.closest(".summary-evidence")) return;
        const txt = el.innerText.replace(/\s+/g, " ").trim();
        if (txt && txt !== "요약" && txt.length >= 2) {
          queue.push({ text: txt, element: el });
        }
      });
    }
  }

  if (scope === "all" || scope === "keypoints") {
    if (takeawaysContainer) {
      queue.push({ text: "두 번째, 핵심 요점입니다.", element: takeawaysContainer });
      takeawaysContainer.querySelectorAll("li").forEach((li, idx) => {
        const txt = li.innerText.replace(/\s+/g, " ").trim();
        if (txt) {
          queue.push({ text: `${idx + 1}번. ${txt}`, element: li });
        }
      });
    }
  }

  return queue;
}

function updateTtsButtonsUI() {
  const detailBtnLabel = document.getElementById("detail-tts-btn-label");
  const readerBtnLabel = document.getElementById("reader-tts-label");
  const playPauseBtn = document.getElementById("tts-play-pause-btn");
  const readerPlayPauseBtn = document.getElementById("reader-tts-play-pause-btn");
  const bar = document.getElementById("tts-player-bar");
  const readerBar = document.getElementById("reader-tts-player-bar");

  if (!ttsIsPlaying) {
    if (detailBtnLabel) detailBtnLabel.textContent = "TTS 듣기";
    if (readerBtnLabel) readerBtnLabel.textContent = "TTS 듣기";
    if (bar) bar.hidden = true;
    if (readerBar) readerBar.hidden = true;
    clearTtsDomHighlight();
    return;
  }

  if (bar) bar.hidden = ttsTargetContext !== "detail";
  if (readerBar) readerBar.hidden = ttsTargetContext !== "reader";
  if (detailBtnLabel) {
    detailBtnLabel.textContent = ttsIsPaused ? "TTS 이어듣기" : "TTS 일시정지";
  }
  if (readerBtnLabel) {
    readerBtnLabel.textContent = ttsIsPaused ? "TTS 이어듣기" : "TTS 일시정지";
  }
  const ppHtml = ttsIsPaused
    ? `${iconSvg("play")}<span>재생</span>`
    : `${iconSvg("pause")}<span>일시정지</span>`;
  if (playPauseBtn) playPauseBtn.innerHTML = ppHtml;
  if (readerPlayPauseBtn) readerPlayPauseBtn.innerHTML = ppHtml;
}

let activeTtsUtterance = null;
let mobileTtsKeepAliveTimer = null;

function speakCurrentTtsChunk() {
  if (!("speechSynthesis" in window)) {
    showToast("이 브라우저는 TTS 음성 합성을 지원하지 않습니다.");
    return;
  }
  if (!ttsIsPlaying || ttsCurrentIdx < 0 || ttsCurrentIdx >= ttsQueue.length) {
    stopTtsPlayback(true);
    return;
  }

  window.clearInterval(mobileTtsKeepAliveTimer);
  window.speechSynthesis.cancel();
  if (window.speechSynthesis.paused) {
    try { window.speechSynthesis.resume(); } catch (e) {}
  }

  const currentItem = ttsQueue[ttsCurrentIdx];
  clearTtsDomHighlight();
  if (currentItem.element) {
    currentItem.element.classList.add("tts-speaking-active");
    currentItem.element.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const progText = `구간 ${ttsCurrentIdx + 1} / ${ttsQueue.length}`;
  const progEl = document.getElementById("tts-progress-text");
  if (progEl) progEl.textContent = progText;
  const readerProgEl = document.getElementById("reader-tts-progress-text");
  if (readerProgEl) readerProgEl.textContent = progText;

  const sentEl = document.getElementById("tts-current-sentence");
  if (sentEl) sentEl.textContent = currentItem.text;
  const readerSentEl = document.getElementById("reader-tts-current-sentence");
  if (readerSentEl) readerSentEl.textContent = currentItem.text;

  const utter = new SpeechSynthesisUtterance(currentItem.text);
  activeTtsUtterance = utter;
  utter.lang = "ko-KR";
  const rateSelectId = ttsTargetContext === "reader" ? "reader-tts-rate-select" : "tts-rate-select";
  const rateVal = Number(document.getElementById(rateSelectId)?.value || 1);
  utter.rate = rateVal;

  const chosenVoiceName = document.getElementById("tts-voice-select")?.value || "";
  const voices = window.speechSynthesis.getVoices() || [];
  if (chosenVoiceName) {
    const found = voices.find((v) => v.name === chosenVoiceName);
    if (found) utter.voice = found;
  } else {
    const koVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("ko"));
    if (koVoice) utter.voice = koVoice;
  }

  // Mobile/Chrome keep-alive workaround so long utterances don't freeze mid-sentence
  mobileTtsKeepAliveTimer = window.setInterval(() => {
    if (!ttsIsPlaying || ttsIsPaused) {
      window.clearInterval(mobileTtsKeepAliveTimer);
      return;
    }
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 12000);

  utter.onend = () => {
    window.clearInterval(mobileTtsKeepAliveTimer);
    if (!ttsIsPlaying || ttsIsPaused) return;
    ttsCurrentIdx++;
    if (ttsCurrentIdx < ttsQueue.length) {
      speakCurrentTtsChunk();
    } else {
      stopTtsPlayback(true);
    }
  };

  utter.onerror = () => {
    window.clearInterval(mobileTtsKeepAliveTimer);
    if (!ttsIsPlaying || ttsIsPaused) return;
    ttsCurrentIdx++;
    if (ttsCurrentIdx < ttsQueue.length) {
      speakCurrentTtsChunk();
    } else {
      stopTtsPlayback(false);
    }
  };

  window.speechSynthesis.speak(utter);
}

function startTtsPlaybackFromElement(clickedEl, context = "detail") {
  if (!("speechSynthesis" in window)) {
    showToast("이 브라우저는 TTS 음성 합성을 지원하지 않습니다.");
    return;
  }
  populateTtsVoices();
  ttsTargetContext = context;
  ttsQueue = buildTtsQueue(context);
  if (!ttsQueue.length) return;
  const foundIdx = ttsQueue.findIndex((q) => q.element === clickedEl || clickedEl.contains(q.element) || q.element.contains(clickedEl));
  ttsCurrentIdx = foundIdx >= 0 ? foundIdx : 0;
  ttsIsPlaying = true;
  ttsIsPaused = false;
  updateTtsButtonsUI();
  speakCurrentTtsChunk();
}

function startTtsPlayback(context = "detail") {
  if (!("speechSynthesis" in window)) {
    showToast("이 브라우저는 TTS 음성 합성을 지원하지 않습니다.");
    return;
  }
  populateTtsVoices();
  ttsTargetContext = context;
  ttsQueue = buildTtsQueue(context);
  if (!ttsQueue.length) {
    showToast("낭독할 요약 본문이 없습니다.");
    return;
  }
  ttsCurrentIdx = 0;
  ttsIsPlaying = true;
  ttsIsPaused = false;
  updateTtsButtonsUI();
  speakCurrentTtsChunk();
  showToast("요약본 TTS 음성 낭독을 시작합니다.");
}

function togglePauseTtsPlayback() {
  if (!ttsIsPlaying) {
    startTtsPlayback(ttsTargetContext || "detail");
    return;
  }
  if (ttsIsPaused) {
    ttsIsPaused = false;
    window.speechSynthesis.resume();
    if (!window.speechSynthesis.speaking) {
      speakCurrentTtsChunk();
    }
    updateTtsButtonsUI();
  } else {
    ttsIsPaused = true;
    window.speechSynthesis.pause();
    updateTtsButtonsUI();
  }
}

function stopTtsPlayback(completed = false) {
  window.clearInterval(mobileTtsKeepAliveTimer);
  activeTtsUtterance = null;
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  const wasPlaying = ttsIsPlaying;
  ttsIsPlaying = false;
  ttsIsPaused = false;
  ttsCurrentIdx = 0;
  updateTtsButtonsUI();
  if (completed && wasPlaying) {
    showToast("요약본 TTS 음성 낭독이 완료되었습니다.");
  }
}

document.getElementById("detail-tts-toggle-btn")?.addEventListener("click", () => {
  if (!ttsIsPlaying || ttsTargetContext !== "detail") {
    startTtsPlayback("detail");
  } else {
    togglePauseTtsPlayback();
  }
});

document.getElementById("tts-play-pause-btn")?.addEventListener("click", () => {
  togglePauseTtsPlayback();
});

document.getElementById("tts-stop-btn")?.addEventListener("click", () => {
  stopTtsPlayback(false);
  showToast("TTS 음성 낭독을 정지했습니다.");
});

document.getElementById("tts-prev-btn")?.addEventListener("click", () => {
  if (!ttsIsPlaying || !ttsQueue.length) return;
  ttsCurrentIdx = Math.max(0, ttsCurrentIdx - 1);
  ttsIsPaused = false;
  updateTtsButtonsUI();
  speakCurrentTtsChunk();
});

document.getElementById("tts-next-btn")?.addEventListener("click", () => {
  if (!ttsIsPlaying || !ttsQueue.length) return;
  ttsCurrentIdx = Math.min(ttsQueue.length - 1, ttsCurrentIdx + 1);
  ttsIsPaused = false;
  updateTtsButtonsUI();
  speakCurrentTtsChunk();
});

document.getElementById("tts-rate-select")?.addEventListener("change", () => {
  if (ttsIsPlaying && !ttsIsPaused) {
    speakCurrentTtsChunk();
  }
});

document.getElementById("tts-voice-select")?.addEventListener("change", () => {
  if (ttsIsPlaying && !ttsIsPaused) {
    speakCurrentTtsChunk();
  }
});

document.getElementById("tts-scope-select")?.addEventListener("change", () => {
  if (ttsIsPlaying) {
    startTtsPlayback(ttsTargetContext);
  }
});

document.getElementById("reader-tts-btn")?.addEventListener("click", () => {
  if (!ttsIsPlaying || ttsTargetContext !== "reader") {
    startTtsPlayback("reader");
  } else {
    togglePauseTtsPlayback();
  }
});
document.getElementById("reader-tts-play-pause-btn")?.addEventListener("click", () => {
  togglePauseTtsPlayback();
});
document.getElementById("reader-tts-stop-btn")?.addEventListener("click", () => {
  stopTtsPlayback(false);
  showToast("TTS 음성 낭독을 정지했습니다.");
});
document.getElementById("reader-tts-prev-btn")?.addEventListener("click", () => {
  if (!ttsIsPlaying || !ttsQueue.length) return;
  ttsCurrentIdx = Math.max(0, ttsCurrentIdx - 1);
  ttsIsPaused = false;
  updateTtsButtonsUI();
  speakCurrentTtsChunk();
});
document.getElementById("reader-tts-next-btn")?.addEventListener("click", () => {
  if (!ttsIsPlaying || !ttsQueue.length) return;
  ttsCurrentIdx = Math.min(ttsQueue.length - 1, ttsCurrentIdx + 1);
  ttsIsPaused = false;
  updateTtsButtonsUI();
  speakCurrentTtsChunk();
});
document.getElementById("reader-tts-rate-select")?.addEventListener("change", () => {
  if (ttsIsPlaying && !ttsIsPaused && ttsTargetContext === "reader") {
    speakCurrentTtsChunk();
  }
});
document.getElementById("reader-tts-scope-select")?.addEventListener("change", () => {
  if (ttsIsPlaying && ttsTargetContext === "reader") {
    startTtsPlayback("reader");
  }
});

document.getElementById("public-reader-modal")?.addEventListener("close", () => {
  if (ttsTargetContext === "reader") {
    stopTtsPlayback(false);
  }
});

document.querySelector(".bookmark-filter")?.addEventListener("click", () => {
  state.publicBookmarkOnly = !state.publicBookmarkOnly;
  state.activePublicCategoryFilter = state.publicBookmarkOnly ? "즐겨찾기" : "전체";
  currentPublicPage = 1;
  saveAppState();
  renderCategoriesUI();
  renderPublicView();
});

const publicSearchInput = document.querySelector("#view .search input");
let pubSearchTimer = null;
publicSearchInput?.addEventListener("input", () => {
  window.clearTimeout(pubSearchTimer);
  pubSearchTimer = window.setTimeout(() => {
    state.publicSearchQuery = publicSearchInput.value.trim();
    currentPublicPage = 1;
    renderPublicView();
  }, 160);
});

// 10. KakaoTalk Share Modal (Public Page URL + Title Delivery)
let currentShareItem = null;
const PUBLIC_WEB_SHARE_BASE = "https://daehann-svg.github.io/yousunsaeng/";

function getPublicShareUrl(item) {
  const isLocalHost = ["127.0.0.1", "localhost"].includes(window.location.hostname);
  if (!isLocalHost) {
    const baseUrl = window.location.href.split("#")[0];
    return `${baseUrl}#view?id=${item.id}`;
  }
  return `${PUBLIC_WEB_SHARE_BASE}#view?id=${item.id}`;
}

function buildKakaoShareMessage(item) {
  const publicUrl = getPublicShareUrl(item);
  return `${item.title}\n${publicUrl}`;
}

function openKakaoShareModal(summaryId) {
  const item = state.summaries.find((s) => s.id === Number(summaryId)) || state.summaries[0];
  if (!item) return;
  currentShareItem = item;
  const publicUrl = getPublicShareUrl(item);
  const shareMessage = buildKakaoShareMessage(item);
  document.getElementById("kakao-video-title").textContent = item.title;
  document.getElementById("kakao-video-desc").textContent = `${item.channel} · You선생 공개 웹페이지`;
  const urlInput = document.getElementById("kakao-public-url-input");
  if (urlInput) urlInput.value = publicUrl;
  const previewArea = document.getElementById("kakao-share-message-preview");
  if (previewArea) previewArea.value = shareMessage;
  document.getElementById("share").showModal();
}

document.getElementById("kakao-copy-url-btn")?.addEventListener("click", async () => {
  if (!currentShareItem) return;
  const shareMessage = buildKakaoShareMessage(currentShareItem);
  try {
    await navigator.clipboard.writeText(shareMessage);
    showToast("요약 제목과 공개 웹페이지 링크가 클립보드에 복사되었습니다.");
  } catch (e) {
    showToast(shareMessage);
  }
});

document.getElementById("kakao-send-btn")?.addEventListener("click", async () => {
  if (!currentShareItem) return;
  const publicUrl = getPublicShareUrl(currentShareItem);
  const shareTitle = currentShareItem.title;
  const shareText = buildKakaoShareMessage(currentShareItem);

  // 1. Copy title + web link to clipboard first so user can paste immediately in KakaoTalk PC/Mobile
  try {
    await navigator.clipboard.writeText(shareText);
  } catch (e) {
    // ignore clipboard error
  }

  // 2. If Web Share API is supported (mobile / modern desktop browsers), open system share sheet (includes KakaoTalk)
  if (navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareTitle,
        url: publicUrl
      });
      document.getElementById("share").close();
      return;
    } catch (e) {
      // User cancelled or fallback to kakaotalk:// scheme below
    }
  }

  // 3. Launch KakaoTalk app via kakaotalk:// custom protocol scheme (PC & Mobile)
  const kakaoSchemeUrl = `kakaotalk://msg/text/${encodeURIComponent(shareText)}`;
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = kakaoSchemeUrl;
  document.body.appendChild(iframe);
  setTimeout(() => iframe.remove(), 2000);

  document.getElementById("share").close();
  showToast("카카오톡을 호출했습니다! (제목과 웹페이지 링크가 복사되어 대화창에 바로 붙여넣을 수 있습니다)");
});

document.getElementById("kakao-preview-link-btn")?.addEventListener("click", () => {
  if (currentShareItem) {
    state.currentSummaryId = currentShareItem.id;
    currentShareItem.published = true;
    if (serverBaseline) saveAppState();
    else saveLocalState();
    renderPublicView();
  }
  document.getElementById("share").close();
  window.location.hash = currentShareItem ? `view?id=${currentShareItem.id}` : "view";
});

// 11. GitHub Registration, Source Auto-Upload & Web/Server Connectivity Check
function ensureGithubConfigState() {
  if (!state.githubConfig || typeof state.githubConfig !== "object") {
    state.githubConfig = {
      username: getActiveAccount()?.name || "daehann",
      repoPath: `https://github.com/${getActiveAccount()?.name || "daehann"}/yousunsaeng`,
      branch: "main",
      subpath: "",
      includeDb: true
    };
  }
  return state.githubConfig;
}

function syncGithubConfigUI() {
  const cfg = ensureGithubConfigState();
  const userIn = document.getElementById("gh-username-input");
  const passIn = document.getElementById("gh-password-input");
  const repoIn = document.getElementById("gh-repo-path-input");
  const branchIn = document.getElementById("gh-branch-input");
  const subIn = document.getElementById("gh-subpath-input");
  const dbCheck = document.getElementById("gh-include-db-check");

  if (userIn && document.activeElement !== userIn) userIn.value = cfg.username || "";
  if (repoIn && document.activeElement !== repoIn) repoIn.value = cfg.repoPath || "";
  if (branchIn && document.activeElement !== branchIn) branchIn.value = cfg.branch || "main";
  if (subIn && document.activeElement !== subIn) subIn.value = cfg.subpath || "";
  if (dbCheck) dbCheck.checked = cfg.includeDb !== false;
  if (passIn && !passIn.value) {
    passIn.value = getStoredGithubToken();
  }
}

function readGithubFormValues() {
  const cfg = ensureGithubConfigState();
  const username = document.getElementById("gh-username-input")?.value.trim() || "";
  const password = document.getElementById("gh-password-input")?.value.trim() || "";
  const repoPath = document.getElementById("gh-repo-path-input")?.value.trim() || "";
  const branch = document.getElementById("gh-branch-input")?.value.trim() || "main";
  const subpath = document.getElementById("gh-subpath-input")?.value.trim().replace(/^\/+|\/+$/g, "") || "";
  const includeDb = Boolean(document.getElementById("gh-include-db-check")?.checked);
  const commitMessage = document.getElementById("gh-commit-msg-input")?.value.trim() || "chore: You선생 소스 및 공개 요약 데이터 자동 업데이트";

  cfg.username = username;
  cfg.repoPath = repoPath;
  cfg.branch = branch;
  cfg.subpath = subpath;
  cfg.includeDb = includeDb;
  if (password) {
    setStoredGithubToken(password);
  } else {
    setStoredGithubToken("");
  }
  return { username, password, repoPath, branch, subpath, includeDb, commitMessage };
}

function updateGithubCheckCardUI(key, ok, message) {
  const card = document.querySelector(`[data-gh-check-card="${key}"]`);
  const msgEl = document.querySelector(`[data-gh-check-msg="${key}"]`);
  if (msgEl) {
    msgEl.textContent = `${ok ? "✔ " : "✖ "}${message}`;
    msgEl.style.color = ok ? "#1f5f3b" : "#b42318";
  }
  if (card) {
    card.style.borderColor = ok ? "#b7dfc5" : "#f1c2bc";
    card.style.background = ok ? "#f6fbf7" : "#fff8f7";
  }
}

async function runBrowserDirectGithubCheck(vals) {
  const target = parseGithubRepoTargetInBrowser(vals.repoPath, vals.username, vals.branch, vals.subpath);
  updateGithubCheckCardUI("local_server", true, `웹 브라우저 단독 실행 모드 (IndexedDB + GitHub 클라우드 저장 활성 · 요약 ${state.summaries.length}개)`);

  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
  if (vals.password) headers.Authorization = `Bearer ${vals.password}`;

  let webOk = false;
  let authOk = false;
  let repoOk = false;
  try {
    const rRate = await fetch("https://api.github.com/rate_limit", { headers });
    webOk = rRate.ok;
    updateGithubCheckCardUI("github_web", webOk, webOk ? "깃허브 API 서버(api.github.com) 브라우저 직접 통신 원활" : `깃허브 API 응답 오류 (${rRate.status})`);
  } catch (e) {
    updateGithubCheckCardUI("github_web", false, `깃허브 API 연결 실패: ${e.message}`);
  }

  if (!vals.password) {
    updateGithubCheckCardUI("github_auth", false, "패스워드(Personal Access Token)를 입력하면 GitHub 클라우드 자동 저장이 활성화됩니다.");
  } else {
    try {
      const rUser = await fetch("https://api.github.com/user", { headers });
      if (rUser.ok) {
        const uJson = await rUser.json();
        authOk = true;
        updateGithubCheckCardUI("github_auth", true, `브라우저 직접 인증 성공: @${uJson.login}`);
      } else {
        updateGithubCheckCardUI("github_auth", false, `인증 실패 (HTTP ${rUser.status}) · 유효한 GitHub 토큰(ghp_ / gho_ / github_pat_)을 입력해 주세요.`);
      }
    } catch (e) {
      updateGithubCheckCardUI("github_auth", false, `인증 확인 오류: ${e.message}`);
    }
  }

  try {
    const rRepo = await fetch(`https://api.github.com/repos/${encodeURIComponent(target.owner)}/${encodeURIComponent(target.repo)}`, { headers });
    if (rRepo.ok) {
      const repoJson = await rRepo.json();
      const canPush = vals.password ? Boolean(repoJson.permissions?.push || repoJson.permissions?.admin) : false;
      repoOk = vals.password ? canPush : true;
      updateGithubCheckCardUI(
        "github_repo",
        repoOk,
        `저장소 확인됨: ${target.owner}/${target.repo} (${vals.password ? (canPush ? "웹 직접 저장 가능" : "쓰기 권한 확인 필요") : "공개 읽기 가능"})`
      );
    } else {
      updateGithubCheckCardUI("github_repo", false, `저장소 조회 실패 (${target.owner}/${target.repo} · HTTP ${rRepo.status})`);
    }
  } catch (e) {
    updateGithubCheckCardUI("github_repo", false, `저장소 조회 오류: ${e.message}`);
  }

  return { allPassed: webOk && authOk && repoOk, webAndServerOk: webOk };
}

async function runGithubConnectivityCheck() {
  const vals = readGithubFormValues();
  saveAppState();

  const summaryBadge = document.getElementById("gh-check-summary-badge");
  const btn1 = document.getElementById("gh-test-conn-btn");
  const btn2 = document.getElementById("gh-run-check-btn");
  if (btn1) btn1.disabled = true;
  if (btn2) btn2.disabled = true;
  if (summaryBadge) {
    summaryBadge.className = "tag tag-amber";
    summaryBadge.textContent = "깃허브 웹 · 서버 통신 상태를 점검하고 있습니다...";
  }

  try {
    const isStaticWebMode = document.body.classList.contains("static-public-mode") && location.port !== "18765";
    if (isStaticWebMode) {
      const { allPassed, webAndServerOk } = await runBrowserDirectGithubCheck(vals);
      if (summaryBadge) {
        summaryBadge.className = allPassed ? "tag tag-sage" : webAndServerOk ? "tag tag-amber" : "tag tag-purple";
        summaryBadge.textContent = allPassed
          ? `✔ 웹 브라우저 ↔ GitHub 클라우드 직접 통신 정상 (${new Date().toLocaleTimeString()})`
          : `⚠ 웹 브라우저 연결은 정상이나 GitHub 토큰 확인이 필요합니다 (${new Date().toLocaleTimeString()})`;
      }
      showToast(allPassed ? "웹 브라우저와 GitHub 클라우드 통신이 원활합니다." : "통신 점검이 완료되었습니다.");
      return;
    }

    const res = await fetch(GITHUB_CHECK_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vals)
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.error || `통신 점검 실패 (HTTP ${res.status})`);
    }
    const ch = data.checks || {};
    for (const key of ["local_server", "github_web", "github_auth", "github_repo"]) {
      if (ch[key]) {
        updateGithubCheckCardUI(key, Boolean(ch[key].ok), ch[key].message || "");
      }
    }
    const allPassed = ["local_server", "github_web", "github_auth", "github_repo"].every((k) => ch[k]?.ok);
    const webAndServerOk = Boolean(ch.local_server?.ok && ch.github_web?.ok);
    if (summaryBadge) {
      if (allPassed) {
        summaryBadge.className = "tag tag-sage";
        summaryBadge.textContent = `✔ 모든 통신 점검 정상 (${new Date().toLocaleTimeString()}) · 즉시 업로드 가능`;
      } else if (webAndServerOk) {
        summaryBadge.className = "tag tag-amber";
        summaryBadge.textContent = `⚠ 서버·깃허브 웹 연결은 정상이나 계정 토큰 또는 저장소 경로 확인이 필요합니다 (${new Date().toLocaleTimeString()})`;
      } else {
        summaryBadge.className = "tag tag-purple";
        summaryBadge.textContent = `✖ 통신 이상 감지 · 아래 세부 점검 카드를 확인하세요`;
      }
    }
    showToast(allPassed ? "깃허브 웹 및 로컬 서버 통신이 모두 원활합니다." : "통신 점검이 완료되었습니다. 세부 항목을 확인해 주세요.");
  } catch (error) {
    const { allPassed } = await runBrowserDirectGithubCheck(vals);
    if (summaryBadge) {
      summaryBadge.className = allPassed ? "tag tag-sage" : "tag tag-amber";
      summaryBadge.textContent = allPassed
        ? `✔ 웹 브라우저 직접 통신 정상 (${new Date().toLocaleTimeString()})`
        : `⚠ 로컬 서버 오프라인 · 웹 브라우저 단독 모드로 동작합니다`;
    }
  } finally {
    if (btn1) btn1.disabled = false;
    if (btn2) btn2.disabled = false;
  }
}

async function runGithubAutoUpload() {
  const vals = readGithubFormValues();
  saveAppState();

  if (!vals.username || !vals.repoPath) {
    showToast("깃허브 아이디와 등록 경로(URL 또는 owner/repo)를 입력해주세요.");
    return;
  }
  if (!vals.password) {
    document.getElementById("gh-password-input")?.focus();
    showToast("깃허브 자동 업로드를 위해 패스워드(Personal Access Token)를 입력해주세요.");
    return;
  }

  const uploadBtn = document.getElementById("gh-auto-upload-btn");
  const progBox = document.getElementById("gh-upload-progress-box");
  const titleEl = document.getElementById("gh-upload-status-title");
  const pctEl = document.getElementById("gh-upload-percent");
  const barEl = document.getElementById("gh-upload-bar");
  const logEl = document.getElementById("gh-upload-file-log");

  if (uploadBtn) uploadBtn.disabled = true;
  if (progBox) progBox.hidden = false;
  if (titleEl) titleEl.textContent = "깃허브 저장소 인증 및 You선생 데이터 업로드 중...";
  if (pctEl) pctEl.textContent = "35%";
  if (barEl) barEl.style.width = "35%";
  if (logEl) logEl.innerHTML = `<div>• 대상 경로: <strong>${escapeHtml(vals.repoPath)}</strong> (${escapeHtml(vals.branch)})</div><div>• 데이터 패키징 및 GitHub API 전송 중...</div>`;

  try {
    const isStaticWebMode = document.body.classList.contains("static-public-mode") && location.port !== "18765";
    if (isStaticWebMode) {
      const ghRes = await pushWebStateToGithubRepo(state, vals.commitMessage);
      if (titleEl) titleEl.textContent = `✔ 웹 브라우저에서 GitHub 클라우드 DB(summaries_db.json) 직접 업로드 완료!`;
      if (pctEl) pctEl.textContent = "100%";
      if (barEl) barEl.style.width = "100%";
      if (logEl) {
        logEl.innerHTML = `
          <div>✔ <code>summaries_db.json</code> (총 ${state.summaries.length}개 요약본 · 커밋 <code>${escapeHtml(ghRes.commitSha)}</code>)</div>
          <div style="margin-top:8px"><a href="${escapeHtml(ghRes.pagesUrl)}" target="_blank" rel="noopener noreferrer" style="color:#1d4ed8;font-weight:700;text-decoration:underline">🌐 You선생 공개 웹페이지 열기 (${escapeHtml(ghRes.pagesUrl)})</a></div>
        `;
      }
      showToast("웹 브라우저에서 GitHub 저장소에 요약 데이터를 성공적으로 저장했습니다!");
      return;
    }

    const res = await fetch(GITHUB_UPLOAD_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vals)
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      if (res.status === 401) {
        if (titleEl) titleEl.textContent = "일반 계정 비밀번호는 GitHub API에서 차단됩니다 · 웹 로그인 자동인증 코드를 발급합니다...";
        await startGithubDeviceLogin(true);
        return;
      }
      const partial = Array.isArray(data.uploaded) && data.uploaded.length
        ? `<div style="margin-top:6px">일부 업로드됨 (${data.uploaded.length}개): ${data.uploaded.map((u) => escapeHtml(u.file)).join(", ")}</div>`
        : "";
      if (titleEl) titleEl.textContent = `업로드 실패: ${data.error || `HTTP ${res.status}`}`;
      if (pctEl) pctEl.textContent = "실패";
      if (barEl) barEl.style.width = "100%";
      if (logEl) logEl.innerHTML = `<div style="color:#b42318;font-weight:700">✖ ${escapeHtml(data.error || "업로드에 실패했습니다.")}</div>${partial}`;
      showToast(data.error || "깃허브 자동 업로드에 실패했습니다.");
      return;
    }

    if (titleEl) titleEl.textContent = `✔ ${data.message}`;
    if (pctEl) pctEl.textContent = "100%";
    if (barEl) barEl.style.width = "100%";
    const rowsHtml = (data.uploaded || [])
      .map(
        (u) =>
          `<div>✔ <code>${escapeHtml(u.file)}</code> (${(u.size / 1024).toFixed(1)}KB · ${u.action === "created" ? "신규 생성" : "업데이트"} · 커밋 <code>${escapeHtml(u.commitSha || "-")}</code>)</div>`
      )
      .join("");
    const linkHtml = data.treeUrl
      ? `<div style="margin-top:8px;padding-top:8px;border-top:1px dashed #d5e2ce;display:flex;flex-direction:column;gap:5px">
          <a href="${escapeHtml(data.treeUrl)}" target="_blank" rel="noopener noreferrer" style="color:#244b40;font-weight:700;text-decoration:underline">👉 1. 깃허브 소스 저장소 주소 열기 (${escapeHtml(data.treeUrl)})</a>
          ${data.pagesUrl ? `<a href="${escapeHtml(data.pagesUrl)}" target="_blank" rel="noopener noreferrer" style="color:#1d4ed8;font-weight:700;text-decoration:underline">🌐 2. 웹에서 바로 보는 You선생 공개 주소 (${escapeHtml(data.pagesUrl)})</a>` : ""}
        </div>`
      : "";
    if (logEl) logEl.innerHTML = rowsHtml + linkHtml;
    showToast(data.message);
    await runGithubConnectivityCheck();
  } catch (error) {
    try {
      const ghRes = await pushWebStateToGithubRepo(state, vals.commitMessage);
      if (ghRes && ghRes.ok) {
        if (titleEl) titleEl.textContent = `✔ 웹 브라우저에서 GitHub 클라우드 DB(summaries_db.json) 직접 업로드 완료!`;
        if (pctEl) pctEl.textContent = "100%";
        if (barEl) barEl.style.width = "100%";
        if (logEl) {
          logEl.innerHTML = `
            <div>✔ <code>summaries_db.json</code> (총 ${state.summaries.length}개 요약본 · 커밋 <code>${escapeHtml(ghRes.commitSha)}</code>)</div>
            <div style="margin-top:8px"><a href="${escapeHtml(ghRes.pagesUrl)}" target="_blank" rel="noopener noreferrer" style="color:#1d4ed8;font-weight:700;text-decoration:underline">🌐 You선생 공개 웹페이지 열기 (${escapeHtml(ghRes.pagesUrl)})</a></div>
          `;
        }
        showToast("웹 브라우저에서 GitHub 저장소에 요약 데이터를 성공적으로 저장했습니다!");
        return;
      }
    } catch (ghFallbackErr) {
      // use original error below
    }
    if (titleEl) titleEl.textContent = `업로드 오류: ${error.message}`;
    if (pctEl) pctEl.textContent = "오류";
    if (logEl) logEl.innerHTML = `<div style="color:#b42318">✖ 서버 통신 오류: ${escapeHtml(error.message)}</div>`;
    showToast(`업로드 오류: ${error.message}`);
  } finally {
    if (uploadBtn) uploadBtn.disabled = false;
  }
}

let ghDevicePollTimer = null;

async function startGithubDeviceLogin(autoUploadAfterAuth = false) {
  const banner = document.getElementById("gh-device-auth-banner");
  const codeEl = document.getElementById("gh-device-user-code");
  const msgEl = document.getElementById("gh-device-status-msg");
  const linkEl = document.getElementById("gh-device-verify-link");
  const btn = document.getElementById("gh-device-auth-btn");

  if (btn) btn.disabled = true;
  window.clearInterval(ghDevicePollTimer);

  try {
    const res = await fetch(GITHUB_DEVICE_START_API_URL, { method: "POST" });
    const data = await res.json();
    if (!res.ok || !data.ok || !data.deviceCode) {
      throw new Error(data.error || "디바이스 인증 시작에 실패했습니다.");
    }
    if (banner) banner.hidden = false;
    if (codeEl) codeEl.textContent = data.userCode;
    if (linkEl) linkEl.href = data.verificationUri || "https://github.com/login/device";
    try {
      await navigator.clipboard.writeText(data.userCode);
      showToast(`인증 코드 [${data.userCode}]가 복사되었습니다! 열리는 깃허브 창에 붙여넣고 승인해 주세요.`);
    } catch (e) {
      showToast(`깃허브 인증 창에서 코드 [${data.userCode}]를 입력해 주세요.`);
    }
    window.open(data.verificationUri || "https://github.com/login/device", "_blank", "noopener");

    const intervalMs = Math.max(5, Number(data.interval) || 5) * 1000;
    ghDevicePollTimer = window.setInterval(async () => {
      try {
        const pRes = await fetch(GITHUB_DEVICE_POLL_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deviceCode: data.deviceCode })
        });
        const pData = await pRes.json();
        if (pData.status === "authorized" && pData.accessToken) {
          window.clearInterval(ghDevicePollTimer);
          const passIn = document.getElementById("gh-password-input");
          if (passIn) passIn.value = pData.accessToken;
          setStoredGithubToken(pData.accessToken);
          if (pData.login) {
            const userIn = document.getElementById("gh-username-input");
            const repoIn = document.getElementById("gh-repo-path-input");
            if (userIn) userIn.value = pData.login;
            if (repoIn && (!repoIn.value.trim() || repoIn.value.includes("daehann/"))) {
              repoIn.value = `https://github.com/${pData.login}/yousunsaeng`;
            }
          }
          if (msgEl) msgEl.textContent = `✔ @${pData.login || "GitHub"} 계정 인증 및 토큰 발급 완료!`;
          showToast(`✔ GitHub 계정(@${pData.login}) 인증이 완료되었습니다!`);
          await runGithubConnectivityCheck();
          if (autoUploadAfterAuth) {
            await runGithubAutoUpload();
          }
        } else if (pData.status === "expired_token" || pData.status === "access_denied") {
          window.clearInterval(ghDevicePollTimer);
          if (msgEl) msgEl.textContent = `✖ 인증이 만료되었거나 취소되었습니다. 다시 시도해 주세요.`;
        }
      } catch (e) {
        // ignore transient poll error
      }
    }, intervalMs);
  } catch (err) {
    showToast(err.message);
  } finally {
    if (btn) btn.disabled = false;
  }
}

document.getElementById("gh-device-auth-btn")?.addEventListener("click", () => startGithubDeviceLogin(false));
document.getElementById("gh-save-config-btn")?.addEventListener("click", () => {
  readGithubFormValues();
  saveAppState();
  showToast("깃허브 등록 설정(아이디·등록경로·브랜치)이 저장되었습니다.");
});
document.getElementById("gh-test-conn-btn")?.addEventListener("click", runGithubConnectivityCheck);
document.getElementById("gh-run-check-btn")?.addEventListener("click", runGithubConnectivityCheck);
document.getElementById("gh-auto-upload-btn")?.addEventListener("click", runGithubAutoUpload);

// 12. Admin Authentication & Page Control + Routing & Modal Helpers
const ADMIN_SESSION_KEY = "yousunsaeng_admin_session_v1";
const ADMIN_REMEMBER_KEY = "yousunsaeng_admin_remember_v1";
const DEFAULT_ADMIN_ID = "admin";
const DEFAULT_ADMIN_PW = "1234";

function hashAdminPassword(id, pw) {
  const input = `yousunsaeng-admin-v1:${String(id || "").trim()}:${String(pw || "")}`;
  let h1 = 0xdeadbeef ^ input.length;
  let h2 = 0x41c6ce57 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
}

function getAdminAccount() {
  if (
    state.adminAccount &&
    typeof state.adminAccount === "object" &&
    state.adminAccount.id &&
    state.adminAccount.passwordHash
  ) {
    return state.adminAccount;
  }
  return {
    id: DEFAULT_ADMIN_ID,
    passwordHash: hashAdminPassword(DEFAULT_ADMIN_ID, DEFAULT_ADMIN_PW),
    isDefault: true
  };
}

function getStoredAdminSession() {
  try {
    const rawSession = sessionStorage.getItem(ADMIN_SESSION_KEY) || localStorage.getItem(ADMIN_REMEMBER_KEY);
    if (!rawSession) return null;
    const parsed = JSON.parse(rawSession);
    const acc = getAdminAccount();
    if (parsed && parsed.id === acc.id && parsed.passwordHash === acc.passwordHash) {
      return parsed;
    }
  } catch (e) {
    // ignore invalid storage
  }
  return null;
}

function isAdminLoggedIn() {
  if (location.port === "18765" && !window.__testForceAdminLoggedOut) return true;
  return Boolean(getStoredAdminSession());
}

function syncAdminAuthUI() {
  const loggedIn = isAdminLoggedIn();
  const acc = getAdminAccount();
  const session = getStoredAdminSession();

  document.body.classList.toggle("admin-logged-in", loggedIn);
  document.body.classList.toggle("admin-logged-out", !loggedIn);

  const brandLink = document.getElementById("sidebar-brand-link");
  if (brandLink) brandLink.setAttribute("href", loggedIn ? "#results" : "#view");

  const wsLabel = document.getElementById("sidebar-workspace-label");
  if (wsLabel) wsLabel.textContent = loggedIn ? "MY WORKSPACE" : "PUBLIC MENU";

  const sidebarAdminLabel = document.getElementById("sidebar-admin-nav-label");
  if (sidebarAdminLabel) sidebarAdminLabel.textContent = loggedIn ? "관리자 페이지" : "관리자 로그인";

  const pubAdminBtn = document.getElementById("public-admin-login-btn");
  const pubAdminLabel = document.getElementById("public-admin-login-label");
  const pubLogoutBtn = document.getElementById("public-admin-logout-btn");
  if (pubAdminLabel) pubAdminLabel.textContent = loggedIn ? "관리자 페이지" : "관리자 로그인";
  if (pubAdminBtn) pubAdminBtn.className = loggedIn ? "button secondary" : "button primary";
  if (pubLogoutBtn) pubLogoutBtn.hidden = !loggedIn;

  const loginView = document.getElementById("admin-login-view");
  const dashboardView = document.getElementById("admin-dashboard-view");
  if (loginView) loginView.hidden = loggedIn;
  if (dashboardView) dashboardView.hidden = !loggedIn;

  const defaultHint = document.getElementById("admin-default-hint");
  if (defaultHint) {
    defaultHint.hidden = !acc.isDefault;
  }

  if (loggedIn) {
    unlockAdminVaultInBrowser();
    const currentIdBadge = document.getElementById("admin-current-id-badge");
    if (currentIdBadge) currentIdBadge.textContent = acc.id;
    const loginTimeText = document.getElementById("admin-login-time-text");
    if (loginTimeText) {
      loginTimeText.textContent = session?.loginAt
        ? `로그인 시각: ${session.loginAt} · 전체 관리자 메뉴가 활성화되었습니다.`
        : "전체 관리자 메뉴(요약 라이브러리, 새 요약 만들기, 서식 설정, 깃허브 등록)가 활성화되었습니다.";
    }
    const editIdInput = document.getElementById("admin-edit-id");
    if (editIdInput && document.activeElement !== editIdInput) {
      editIdInput.value = acc.id;
    }
    const statTotal = document.getElementById("admin-stat-total");
    if (statTotal) statTotal.textContent = String(state.summaries.length);
    const statPub = document.getElementById("admin-stat-published");
    if (statPub) statPub.textContent = String(state.summaries.filter((s) => s.published !== false).length);
  }
}

function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  localStorage.removeItem(ADMIN_REMEMBER_KEY);
  const loginPw = document.getElementById("admin-login-pw");
  if (loginPw) loginPw.value = "";
  syncAdminAuthUI();
  window.location.hash = "view";
  showPage();
  showToast("관리자 로그아웃 완료 · You선생 공개페이지와 로그인 메뉴만 노출됩니다.");
}

document.getElementById("admin-pw-toggle-btn")?.addEventListener("click", () => {
  const pwInput = document.getElementById("admin-login-pw");
  const toggleBtn = document.getElementById("admin-pw-toggle-btn");
  if (!pwInput || !toggleBtn) return;
  const isPw = pwInput.type === "password";
  pwInput.type = isPw ? "text" : "password";
  toggleBtn.textContent = isPw ? "숨김" : "표시";
});

document.getElementById("admin-login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const idInput = document.getElementById("admin-login-id");
  const pwInput = document.getElementById("admin-login-pw");
  const rememberCheck = document.getElementById("admin-login-remember");
  const errBox = document.getElementById("admin-login-error");

  const inputId = (idInput?.value || "").trim();
  const inputPw = pwInput?.value || "";
  const acc = getAdminAccount();

  if (!inputId || !inputPw) {
    if (errBox) {
      errBox.textContent = "관리자 아이디와 패스워드를 모두 입력해주세요.";
      errBox.hidden = false;
    }
    return;
  }

  const candidateHash = hashAdminPassword(inputId, inputPw);
  if (inputId !== acc.id || candidateHash !== acc.passwordHash) {
    if (errBox) {
      errBox.textContent = "관리자 아이디 또는 패스워드가 일치하지 않습니다. 다시 확인해주세요.";
      errBox.hidden = false;
    }
    pwInput?.focus();
    pwInput?.select();
    showToast("관리자 아이디 또는 패스워드가 올바르지 않습니다.");
    return;
  }

  if (errBox) errBox.hidden = true;
  const sessionPayload = JSON.stringify({
    id: acc.id,
    passwordHash: acc.passwordHash,
    loginAt: new Date().toLocaleString("ko-KR")
  });
  sessionStorage.setItem(ADMIN_SESSION_KEY, sessionPayload);
  if (rememberCheck?.checked) {
    localStorage.setItem(ADMIN_REMEMBER_KEY, sessionPayload);
  } else {
    localStorage.removeItem(ADMIN_REMEMBER_KEY);
  }

  if (pwInput) pwInput.value = "";
  syncAdminAuthUI();
  showPage();
  showToast(`환영합니다, ${acc.id} 관리자님! 모든 관리자 메뉴가 활성화되었습니다.`);
});

document.getElementById("admin-credentials-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!isAdminLoggedIn()) {
    showToast("먼저 관리자 로그인이 필요합니다.");
    return;
  }
  const acc = getAdminAccount();
  const newIdInput = document.getElementById("admin-edit-id");
  const curPwInput = document.getElementById("admin-edit-current-pw");
  const newPwInput = document.getElementById("admin-edit-new-pw");
  const confirmPwInput = document.getElementById("admin-edit-confirm-pw");

  const newId = (newIdInput?.value || "").trim();
  const curPw = curPwInput?.value || "";
  const newPw = newPwInput?.value || "";
  const confirmPw = confirmPwInput?.value || "";

  if (!newId) {
    newIdInput?.focus();
    showToast("새 관리자 아이디를 입력해주세요.");
    return;
  }
  if (hashAdminPassword(acc.id, curPw) !== acc.passwordHash) {
    curPwInput?.focus();
    showToast("현재 패스워드가 일치하지 않습니다.");
    return;
  }
  if (newPw.length < 4) {
    newPwInput?.focus();
    showToast("새 패스워드는 최소 4자 이상으로 입력해주세요.");
    return;
  }
  if (newPw !== confirmPw) {
    confirmPwInput?.focus();
    showToast("새 패스워드와 패스워드 확인이 일치하지 않습니다.");
    return;
  }

  const nextAccount = {
    id: newId,
    passwordHash: hashAdminPassword(newId, newPw),
    isDefault: false,
    updatedAt: new Date().toISOString()
  };
  state.adminAccount = nextAccount;
  state.encryptedAdminVault = encryptAdminVault(
    {
      apiKey: state.apiKey || "",
      modelApiKeys: state.modelApiKeys || {},
      githubToken: getStoredGithubToken() || ""
    },
    nextAccount
  );

  const sessionPayload = JSON.stringify({
    id: nextAccount.id,
    passwordHash: nextAccount.passwordHash,
    loginAt: new Date().toLocaleString("ko-KR")
  });
  sessionStorage.setItem(ADMIN_SESSION_KEY, sessionPayload);
  if (localStorage.getItem(ADMIN_REMEMBER_KEY)) {
    localStorage.setItem(ADMIN_REMEMBER_KEY, sessionPayload);
  }

  if (curPwInput) curPwInput.value = "";
  if (newPwInput) newPwInput.value = "";
  if (confirmPwInput) confirmPwInput.value = "";

  saveAppState();
  syncAdminAuthUI();
  showToast(`관리자 계정이 ‘${newId}’(으)로 변경 저장되었습니다.`);
});

document.getElementById("admin-logout-btn")?.addEventListener("click", logoutAdmin);
document.getElementById("admin-logout-card-btn")?.addEventListener("click", logoutAdmin);
document.getElementById("topbar-admin-logout-btn")?.addEventListener("click", logoutAdmin);
document.getElementById("public-admin-logout-btn")?.addEventListener("click", logoutAdmin);

const routeTitles = {
  results: "요약 라이브러리",
  input: "새 요약 만들기",
  summary: "You선생 페이지 (상세)",
  templates: "서식 설정",
  view: "You선생 공개페이지",
  github: "깃허브 등록",
  admin: "관리자 페이지"
};

function showPage() {
  syncAdminAuthUI();
  const loggedIn = isAdminLoggedIn();
  const rawHash = window.location.hash.slice(1);
  const [requested, queryStr] = rawHash.split("?");
  if (requested !== "summary" && requested !== "view") {
    stopTtsPlayback(false);
  }
  let sharedId = null;
  if (queryStr && queryStr.includes("id=")) {
    const idMatch = queryStr.match(/id=(\d+)/);
    if (idMatch) {
      sharedId = Number(idMatch[1]);
      state.currentSummaryId = sharedId;
    }
  }

  let route;
  if (!loggedIn) {
    // 비로그인 시: You선생 공개페이지(#view)와 관리자 로그인(#admin)만 노출
    route = requested === "admin" ? "admin" : "view";
    if (requested && requested !== "view" && requested !== "admin") {
      history.replaceState(null, "", "#view");
    }
  } else {
    route = Object.prototype.hasOwnProperty.call(routeTitles, requested)
      ? requested
      : "results";
  }

  document.body.classList.toggle("public-route-active", route === "view");
  document.querySelectorAll(".page").forEach((page) => {
    page.hidden = page.id !== route;
  });
  document.querySelectorAll("[data-route]").forEach((link) => {
    const active = link.dataset.route === route;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (route === "summary") {
    renderSummaryDetail(state.currentSummaryId);
  } else if (route === "templates") {
    renderTemplatesUI();
  } else if (route === "github") {
    syncGithubConfigUI();
  } else if (route === "admin") {
    syncAdminAuthUI();
    if (!loggedIn) {
      setTimeout(() => document.getElementById("admin-login-id")?.focus(), 50);
    }
  } else if (route === "view") {
    renderPublicView();
    if (sharedId !== null) {
      setTimeout(() => openPublicReaderModal(sharedId), 80);
    }
  }
  if (serverBaseline && (route === "view" || route === "results")) syncLatestState();
  const pageTitle = route === "admin" && !loggedIn ? "관리자 로그인" : routeTitles[route];
  document.getElementById("breadcrumb-title").textContent = pageTitle;
  document.title = `${pageTitle} — You선생`;
  window.scrollTo({ top: 0, behavior: "instant" });
}

window.addEventListener("hashchange", showPage);

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.open;
    const adminOnlyModals = new Set([
      "categories",
      "template-add",
      "direct-content-summarize",
      "ratio",
      "vscode-account",
      "delete-confirm-modal"
    ]);
    if (adminOnlyModals.has(targetId) && !isAdminLoggedIn()) {
      showToast("관리자 로그인이 필요한 기능입니다.");
      window.location.hash = "admin";
      return;
    }
    const modal = document.getElementById(targetId);
    if (modal) modal.showModal();
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog")?.close());
});

// Initialize everything
renderIcons();
document.querySelectorAll("#video-entries-list .entry-block").forEach(bindVideoEntryEvents);
syncDefaultRatioUI(false);
syncGithubConfigUI();
renderAccountsUI();
renderCategoriesUI();
renderTemplatesUI();
renderResultsLibrary();
renderSummaryDetail(state.currentSummaryId);
renderPublicView();
showPage();
syncStateFromServerOnBoot();
