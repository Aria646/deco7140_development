// 点击画廊图片 → 右侧查看器滑入；关闭按钮收起
const initGalleryViewer = () => {
    const viewer = document.getElementById("viewer");
    const imgEl = document.getElementById("viewer-img");
    const captionEl = document.getElementById("viewer-caption");
    const closeBtn = document.getElementById("close-viewer");
    if (!viewer || !imgEl || !captionEl || !closeBtn) return;

    document.querySelectorAll(".gallery img").forEach((img) => {
        img.addEventListener("click", () => {
            imgEl.src = img.src;
            imgEl.alt = img.alt;
            captionEl.textContent = img.alt;
            viewer.classList.add("open");
            viewer.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.addEventListener("click", () => {
        viewer.classList.remove("open");
        viewer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
    });
};
export { initGalleryViewer };
