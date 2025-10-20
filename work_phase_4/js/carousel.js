(function () {
  const root = document.getElementById("hero-carousel");
  if (!root) return;

  const inner = root.querySelector(".carousel-inner");
  const items = [...root.querySelectorAll(".carousel-item")];
  const btnPrev = root.querySelector('[data-action="prev"]');
  const btnNext = root.querySelector('[data-action="next"]');
  const indicators = root.querySelector(".carousel-indicators");

  let index = 0;
  let timer = null;
  const DURATION = 5000;

  function update() {
    items.forEach((it, i) => {
      it.classList.toggle("is-active", i === index);
    });
    inner.style.transform = `translateX(-${index * 100}%)`;

    // indicators
    [...indicators.children].forEach((b, i) => {
      b.classList.toggle("active", i === index);
      b.setAttribute("aria-selected", i === index ? "true" : "false");
      b.tabIndex = i === index ? 0 : -1;
    });
  }

  function go(delta) {
    index = (index + delta + items.length) % items.length;
    update();
  }

  function makeIndicators() {
    items.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = i === 0 ? "active" : "";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);
      b.addEventListener("click", () => {
        index = i;
        update();
        restart();
      });
      indicators.appendChild(b);
    });
  }

  function start() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => go(1), DURATION);
  }

  function pause() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restart() {
    start();
  }

  // click controls
  btnPrev.addEventListener("click", () => {
    go(-1);
    restart();
  });

  btnNext.addEventListener("click", () => {
    go(1);
    restart();
  });

  // keyboard controls
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      go(-1);
      restart();
    }
    if (e.key === "ArrowRight") {
      go(1);
      restart();
    }
  });

  // pause on hover
  root.addEventListener("mouseenter", () => {
    pause();
  });
  root.addEventListener("mouseleave", () => {
    start();
  });

  makeIndicators();
  update();
  start();
})();
