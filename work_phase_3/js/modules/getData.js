// js/modules/getData.js
export async function fetchGetData(url, headers = {}) {
    try {
        const res = await fetch(url, { method: "GET", headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json(); // 期望是数组或对象，取决于 API
    } catch (err) {
        console.error("[fetchGetData] error:", err);
        return null; // 页面逻辑要能优雅处理 null
    }
}
