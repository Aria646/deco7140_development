(function () {
    const STORE_KEY = "forum:threads:v1";
    const panelToCat = {
        "acc-panel-1": "skill",
        "acc-panel-2": "restaurant",
        "acc-panel-3": "showcase",
    };
    const catToPanel = {
        skill: "acc-panel-1",
        restaurant: "acc-panel-2",
        showcase: "acc-panel-3",
    };

    const form = document.getElementById("thread-form");
    const selCat = document.getElementById("thread-category");
    const titleI = document.getElementById("thread-title");
    const contI = document.getElementById("thread-content");
    const status = document.getElementById("thread-status");

    function load() {
        try {
            return (
                JSON.parse(localStorage.getItem(STORE_KEY)) || {
                    skill: [],
                    restaurant: [],
                    showcase: [],
                }
            );
        } catch {
            return { skill: [], restaurant: [], showcase: [] };
        }
    }
    function save(data) {
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
    }

    function escapeHtml(s) {
        return s.replace(
            /[&<>"']/g,
            (c) =>
                ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                }[c])
        );
    }
    function timeAgo(ts) {
        const m = Math.floor((Date.now() - ts) / 60000);
        if (m < 1) return "just now";
        if (m < 60) return m + " min ago";
        const h = Math.floor(m / 60);
        if (h < 24) return h + " h ago";
        const d = Math.floor(h / 24);
        return d + " d ago";
    }

    function updateCount(panelId) {
        const span = document.querySelector(
            `[aria-controls="${panelId}"] .count`
        );
        if (!span) return;
        const base = Number(
            span.dataset.base || (span.textContent.match(/(\d+)/) || [0, 0])[1]
        );
        if (!span.dataset.base) span.dataset.base = base;
        const cat = panelToCat[panelId];
        const extra = state[cat]?.length || 0;
        span.textContent = base + extra + " topics";
    }

    function renderCat(cat) {
        const panelId = catToPanel[cat];
        const list = document.querySelector("#" + panelId + " .thread-list");
        if (!list) return;
        (state[cat] || []).forEach((item) => {
            const el = document.createElement("article");
            el.className = "thread-item";
            el.innerHTML = `
        <h3 class="thread-title"><a href="#">${escapeHtml(item.title)}</a></h3>
        <p class="thread-meta">0 replies · ${timeAgo(
            item.at
        )} · Posted by ${escapeHtml(item.author || "You")}</p>
    `;
            list.prepend(el);
        });
        updateCount(panelId);
    }

    const state = load();
    ["skill", "restaurant", "showcase"].forEach(renderCat);

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".acc-actions .btn");
        if (!btn) return;
        const panel = btn.closest(".acc-panel");
        const panelId = panel?.id;
        const cat = panelToCat[panelId] || "skill";
        if (selCat) selCat.value = cat;
        if (form) {
            form.scrollIntoView({ behavior: "smooth", block: "start" });
            titleI && titleI.focus();
        }
    });

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const cat = selCat.value;
            const title = (titleI.value || "").trim();
            const body = (contI.value || "").trim();
            if (title.length < 3) {
                status.textContent = "Title must be at least 3 characters";
                return;
            }
            if (body.length < 10) {
                status.textContent = "Content must be at least 10 characters";
                return;
            }

            const item = { title, body, at: Date.now(), author: "You" };
            state[cat] = state[cat] || [];
            state[cat].unshift(item);
            save(state);

            const panelId = catToPanel[cat];
            const list = document.querySelector(
                "#" + panelId + " .thread-list"
            );
            if (list) {
                const el = document.createElement("article");
                el.className = "thread-item";
                el.innerHTML = `
        <h3 class="thread-title"><a href="#">${escapeHtml(title)}</a></h3>
        <p class="thread-meta">0 replies · just now · Posted by You</p>
        `;
                list.prepend(el);
            }
            updateCount(panelId);

            const lt = document.querySelector(".latest-threads .lt-list");
            if (lt) {
                const li = document.createElement("li");
                li.className = "lt-item";
                li.innerHTML = `<a href="#" class="lt-link">${escapeHtml(
                    title
                )}</a><span class="lt-meta">· just now · 0 replies</span>`;
                lt.prepend(li);
            }

            form.reset();
            status.textContent = "Published!";
            setTimeout(() => (status.textContent = ""), 1500);
        });
    }
})();
