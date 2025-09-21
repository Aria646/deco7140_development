function initAccordion() {
    document.querySelectorAll(".accordion-header").forEach((header) => {
        header.addEventListener("click", () => {
            const item = header.closest(".accordion-item");
            if (item) item.classList.toggle("open");
        });
    });
}

export { initAccordion };
