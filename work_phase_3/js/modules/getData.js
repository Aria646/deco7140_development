export async function fetchGetData(url, headers = {}) {
    try {
        const res = await fetch(url, { method: "GET", headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("[fetchGetData] error:", err);
        return null;
    }
}
