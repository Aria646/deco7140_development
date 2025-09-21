function initAccordion(containerSelector) {
    const accordions = document.querySelectorAll(containerSelector);
    accordions.forEach((container) => {
        const headers = container.querySelectorAll(".accordion-header");
        headers.forEach((header) => {
            header.addEventListener("click", () => {
                const item = header.parentElement; // Get the parent of the header - the accordion-item;
                item.classList.toggle("open"); // Adds or removes the open class to the accordion-item
            });
        });
    });
}
export { initAccordion };
