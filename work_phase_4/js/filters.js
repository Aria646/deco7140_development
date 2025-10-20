// /js/filters.js
(function () {
  const toolbar = document.querySelector(".filter-controls");
  const grid = document.getElementById("recipe-grid");
  if (!toolbar || !grid) return;

  toolbar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    const filter = btn.dataset.filter;
    toolbar.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });

    grid.querySelectorAll(".recipe-card").forEach((card) => {
      const cat = card.getAttribute("data-category");
      const show = filter === "all" || filter === cat;
      card.style.display = show ? "" : "none";
    });
  });
})();
