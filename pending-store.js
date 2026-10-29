const PendingStore = (() => {
  let connection;
  function open() {
    if (!connection) connection = new Promise((resolve, reject) => {
      const request = indexedDB.open("yousunsaeng-recovery", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("records", {keyPath: "id"});
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error("복구 저장소를 열지 못했습니다."));
    });
    return connection;
  }
  async function operation(mode, action) {
    const database = await open();
    return new Promise((resolve, reject) => {
      const tx = database.transaction("records", mode);
      const request = action(tx.objectStore("records"));
      tx.oncomplete = () => resolve(request.result);
      tx.onerror = () => reject(new Error("복구 데이터 저장 실패: " + (tx.error?.message || "저장 공간 확인 필요")));
      tx.onabort = tx.onerror;
    });
  }
  return {
    put: (record) => operation("readwrite", store => store.put(record)),
    remove: (id) => operation("readwrite", store => store.delete(id)),
    all: () => operation("readonly", store => store.getAll())
  };
})();
