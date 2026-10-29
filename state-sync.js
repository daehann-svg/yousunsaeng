/* Shared by persistence and its regression tests. */
const SummarySync = (() => {
  const localKeys = new Set([
    "currentSummaryId", "activeCategoryFilter", "activePublicCategoryFilter",
    "publicBookmarkOnly", "searchQuery", "publicSearchQuery", "sortAsc"
  ]);
  const clone = (value) => JSON.parse(JSON.stringify(value));
  function equal(a, b) {
    if (a === b) return true;
    if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const keys = Object.keys(a);
    return keys.length === Object.keys(b).length
      && keys.every((name) => Object.prototype.hasOwnProperty.call(b, name) && equal(a[name], b[name]));
  }
  const key = (item) => item.uid ? `uid:${item.uid}` : `id:${item.id}`;
  const persistent = (value) => Object.fromEntries(
    Object.entries(value).filter(([name]) => !localKeys.has(name) && name !== "_revision")
  );

  function mergeFields(base, local, remote, label, ignored = new Set()) {
    const result = clone(remote);
    for (const name of new Set([...Object.keys(base), ...Object.keys(local)])) {
      if (ignored.has(name) || equal(base[name], local[name])) continue;
      if (!equal(base[name], remote[name]) && !equal(local[name], remote[name])) {
        throw new Error(`${label}: '${name}' 항목이 다른 창에서 변경되었습니다. 백업 후 최신 내용을 확인해 주세요.`);
      }
      if (local[name] === undefined) delete result[name];
      else result[name] = clone(local[name]);
    }
    return result;
  }

  function rebase(base, local, remote) {
    const ignored = new Set([...localKeys, "summaries", "_revision"]);
    const result = mergeFields(base, local, remote, "설정 충돌", ignored);
    const before = new Map((base.summaries || []).map((s) => [key(s), s]));
    const after = new Map((local.summaries || []).map((s) => [key(s), s]));
    const merged = new Map((remote.summaries || []).map((s) => [key(s), clone(s)]));
    for (const [id, old] of before) {
      const current = after.get(id);
      const latest = merged.get(id);
      if (!current) {
        if (latest && !equal(old, latest)) {
          throw new Error(`삭제 충돌: #${old.id} 요약이 다른 창에서 수정되었습니다.`);
        }
        merged.delete(id);
      } else if (!equal(old, current)) {
        if (!latest) throw new Error(`#${old.id} 요약은 다른 창에서 삭제되었습니다. 자동 복원하지 않습니다.`);
        merged.set(id, mergeFields(old, current, latest, `요약 #${old.id} 충돌`, new Set(["id"])));
      }
    }
    let nextId = Math.max(0, ...[...merged.values()].map((s) => Number(s.id) || 0));
    for (const [id, item] of after) {
      if (before.has(id)) continue;
      if (merged.has(id)) {
        const existing = merged.get(id);
        if (!equal({...existing, id: 0}, {...item, id: 0})) {
          throw new Error(`추가 충돌: '${item.title}'의 저장된 내용이 다릅니다.`);
        }
      } else {
        merged.set(id, {...clone(item), id: ++nextId});
      }
    }
    result.summaries = [...merged.values()].sort((a, b) => b.id - a.id);
    result._revision = remote._revision || 0;
    return result;
  }

  function parseUrls(text) {
    const urls = String(text).trim().split(/[\s,]+/).filter(Boolean);
    return urls.map((value) => {
      const url = new URL(value);
      const host = url.hostname.toLowerCase();
      const allowed = ["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com", "youtu.be"];
      const id = host === "youtu.be" ? url.pathname.slice(1).split("/")[0]
        : url.pathname === "/watch" ? url.searchParams.get("v")
        : /^\/(?:shorts|embed|live)\//.test(url.pathname) ? url.pathname.split("/")[2] : null;
      if (!["http:", "https:"].includes(url.protocol) || !allowed.includes(host) || !/^[\w-]{11}$/.test(id || "")) {
        throw new Error(`유효한 유튜브 영상 URL이 아닙니다: ${value}`);
      }
      return url.href;
    });
  }
  return {clone, equal, key, persistent, rebase, parseUrls, localKeys};
})();
