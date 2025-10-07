// js/reflective_design.js
import { fetchGetData } from "./modules/getData.js";

document.addEventListener("DOMContentLoaded", () => {
    /* 1) 粘性分区导航高亮（可复用行为层思路） */
    const ids = [
        "values",
        "imagery-tone",
        "language",
        "community",
        "a11y-audit",
        "client-response",
    ];
    const sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    const navLinks = Array.from(
        document.querySelectorAll(".section-nav a[href^='#']")
    );
    const setActive = (id) =>
        navLinks.forEach((a) => {
            const on = a.getAttribute("href") === `#${id}`;
            a.toggleAttribute("aria-current", on);
            a.dataset.active = on ? "true" : "false";
        });
    if (sections.length) {
        const io = new IntersectionObserver(
            (es) =>
                es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { threshold: 0.5, rootMargin: "-20% 0px -60% 0px" }
        );
        sections.forEach((s) => io.observe(s));
    }

    const list = document.getElementById("community-list");
    if (list) {
        const ENDPOINT =
            "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/";
        const HEADERS = {
            student_number: "s4929713",
            uqcloud_zone_id: "0ba79392",
        };
        list.innerHTML = `<p class="note">Loading community members…</p>`;

        fetchGetData(ENDPOINT, HEADERS)
            .then((data) => {
                if (!data || !Array.isArray(data) || data.length === 0) {
                    list.innerHTML = `<p class="note">No community members yet.</p>`;
                    return;
                }
                const frag = document.createDocumentFragment();
                data.forEach((member) => {
                    const article = document.createElement("article");
                    article.className = "card member-card";
                    article.innerHTML = `
            <div class="member-media">
            <img src="${
                member.photo_url || "assets/placeholder-avatar.png"
            }" alt="${member.name || "Community member"}"/>
            </div>
            <div class="card-body">
            <h3 class="card-title">${member.name || "Unnamed"}</h3>
            <p class="note">${member.message || "—"}</p>
            </div>
        `;
                    frag.appendChild(article);
                });
                list.innerHTML = "";
                list.appendChild(frag);
            })
            .catch(() => {
                list.innerHTML = `<p class="live error" role="status" aria-live="polite">Unable to load community members.</p>`;
            });
    }
});
