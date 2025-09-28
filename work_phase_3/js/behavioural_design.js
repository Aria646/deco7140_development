// js/behavioural_design.js
import postFormData from "./modules/postFormData.js";

document.addEventListener("DOMContentLoaded", () => {
    /* 1) 粘性分区导航高亮 */
    const sectionIds = [
        "links",
        "navigation",
        "cards",
        "forms",
        "button-styles",
    ];
    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    const nav = document.querySelector(".section-nav");
    const navLinks = nav
        ? Array.from(nav.querySelectorAll("a[href^='#']"))
        : [];

    const setActive = (id) => {
        navLinks.forEach((a) => {
            const match = a.getAttribute("href") === `#${id}`;
            a.toggleAttribute("aria-current", match);
            a.dataset.active = match ? "true" : "false";
        });
    };

    if (sections.length && nav) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { threshold: 0.5, rootMargin: "-20% 0px -60% 0px" }
        );
        sections.forEach((s) => io.observe(s));
    }

    /* 2) 外链可达性增强 */
    document.querySelectorAll("a[target='_blank'], a.external").forEach((a) => {
        a.setAttribute("rel", "noopener");
        const label = (a.textContent || "link").trim() + " (opens in new tab)";
        if (!a.getAttribute("aria-label")) a.setAttribute("aria-label", label);
    });

    /* 3) 表单：API 提交（community-form）与演示（demo-form） */
    const communityForm = document.getElementById("community-form");
    const feedback = document.getElementById("form-feedback");
    const setFeedback = (msg, ok) => {
        if (!feedback) return;
        feedback.textContent = msg || "";
        feedback.classList.remove("ok", "error");
        feedback.classList.add(ok ? "ok" : "error");
    };

    if (communityForm && feedback) {
        const ENDPOINT = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/";
        const HEADERS = {
            student_number: "s4929713",
            uqcloud_zone_id: "https://deco7140-0ba79392.uqcloud.net",
        };

        communityForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const { success, data } = await postFormData(
                communityForm,
                ENDPOINT,
                HEADERS
            );
            if (success) {
                setFeedback(
                    data?.message || "Thanks for joining the community!",
                    true
                );
                communityForm.reset();
            } else {
                setFeedback(
                    data?.message || "Submission failed. Please try again.",
                    false
                );
            }
        });
    }

    // 演示表单（你现有 HTML 里有 demo-form）
    const demoForm = document.getElementById("demo-form");
    const demoMsg = document.getElementById("formMessage");
    const demoOk = (m) => {
        demoMsg.textContent = m;
        demoMsg.className = "live ok";
    };
    const demoErr = (m) => {
        demoMsg.textContent = m;
        demoMsg.className = "live error";
    };

    if (demoForm && demoMsg) {
        demoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // 简单前端校验示意
            const email = demoForm.querySelector("#email");
            const pwd = demoForm.querySelector("#password");
            if (!email.checkValidity() || !pwd.checkValidity()) {
                demoErr("Please correct validation errors.");
                return;
            }
            setTimeout(() => demoOk("Demo success: form validated."), 300);
        });
        const failBtn = document.getElementById("failBtn");
        if (failBtn)
            failBtn.addEventListener("click", () =>
                demoErr("Demo error: simulated failure.")
            );
    }
});
