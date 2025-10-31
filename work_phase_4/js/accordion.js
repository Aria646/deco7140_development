(function () {
  const acc = document.querySelector(".accordion");
  if (!acc) return;

  const single = acc.hasAttribute("data-single");
  const triggers = acc.querySelectorAll(".acc-trigger");

  function closePanel(btn) {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded", "false");
    panel.hidden = true;
  }
  function openPanel(btn) {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded", "true");
    panel.hidden = false;
  }

  triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (single) {
        triggers.forEach((b) => {
          if (b !== btn) closePanel(b);
        });
      }
      expanded ? closePanel(btn) : openPanel(btn);
    });

    btn.addEventListener("keydown", (e) => {
      const i = Array.prototype.indexOf.call(triggers, btn);
      if (e.key === "ArrowDown") {
        (triggers[i + 1] || triggers[0]).focus();
        e.preventDefault();
      }
      if (e.key === "ArrowUp") {
        (triggers[i - 1] || triggers[triggers.length - 1]).focus();
        e.preventDefault();
      }
      if (e.key === "Home") {
        triggers[0].focus();
        e.preventDefault();
      }
      if (e.key === "End") {
        triggers[triggers.length - 1].focus();
        e.preventDefault();
      }
    });
  });
})();
