(function () {
    const $ = (s, r = document) => r.querySelector(s);

    const title = $("#title");
    const cat = $("#category");
    const content = $("#content");
    const img = $("#preview-img");
    const pill = $("#preview-cat");
    const tText = $("#preview-title-text");
    const excerpt = $("#preview-excerpt");
    const dz = $("#dropzone");
    const fileInp = $("#photo");

    function truncate(str, n) {
        return (
            (str || "").trim().slice(0, n) + ((str || "").length > n ? "…" : "")
        );
    }

    function syncPreview() {
        tText.textContent = title.value.trim() || "Your title will appear here";

        excerpt.textContent =
            truncate(content.value, 110) ||
            "The first few lines of your content will appear here so you can check layout and line breaks.";

        const map = {
            breakfast: "Breakfast",
            dinner: "Dinner",
            dessert: "Dessert",
        };
        pill.textContent = map[cat.value] || "Uncategorized";
    }

    ["input", "change", "keyup"].forEach((ev) => {
        title.addEventListener(ev, syncPreview);
        content.addEventListener(ev, syncPreview);
        cat.addEventListener("change", syncPreview);
    });
    syncPreview();

    function setImage(file) {
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    fileInp.addEventListener("change", (e) => setImage(e.target.files[0]));

    ["dragenter", "dragover"].forEach((ev) =>
        dz.addEventListener(ev, (e) => {
            e.preventDefault();
            dz.classList.add("dragover");
        })
    );
    ["dragleave", "drop"].forEach((ev) =>
        dz.addEventListener(ev, (e) => {
            e.preventDefault();
            dz.classList.remove("dragover");
        })
    );
    dz.addEventListener("drop", (e) => {
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) setImage(file);
    });
})();
