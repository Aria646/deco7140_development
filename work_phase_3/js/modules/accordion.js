/**
 * Accordion module
 * Usage:
 *   import { initAccordion } from './modules/accordion.js';
 *   initAccordion('#site-accordion'); // 会连同内部嵌套一起初始化
 */

function initAccordion(rootSelector = "[data-accordion]") {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  // 同时初始化根与其内部所有 [data-accordion]
  const containers = [root, ...root.querySelectorAll("[data-accordion]")];

  containers.forEach((container) => setupContainer(container));

  function setupContainer(container) {
    const single = String(container.dataset.single).toLowerCase() === "true";

    const items = Array.from(
      container.querySelectorAll(":scope > .accordion-item")
    );

    const headers = items.map((item) =>
      item.querySelector(":scope > .accordion-header")
    );
    const contents = items.map((item) =>
      item.querySelector(":scope > .accordion-content")
    );

    headers.forEach((header, idx) => {
      const content = contents[idx];
      if (!header || !content) return;

      // ---- 无障碍：自动补齐 id/aria-controls/aria-labelledby
      ensureA11y(header, content);

      // ---- 美化：去掉按钮文本里手动写的 ▷ 前缀，交给 CSS ::before 画箭头
      const raw = header.textContent.trim();
      header.dataset.label = raw.replace(/^[▸▶▷]\s*/, "");
      header.textContent = header.dataset.label;

      // ---- 初始化展开状态（支持预置 .open 或 aria-expanded="true"）
      const initiallyOpen =
        header.getAttribute("aria-expanded") === "true" ||
        header.parentElement.classList.contains("open");
      setExpanded(header, content, initiallyOpen, false);

      // ---- 点击
      header.addEventListener("click", () => {
        const isOpen = header.getAttribute("aria-expanded") === "true";

        if (single && !isOpen) {
          // 单开容器：先收起其他项
          items.forEach((it, i) => {
            if (i !== idx) setExpanded(headers[i], contents[i], false);
          });
        }
        setExpanded(header, content, !isOpen);
      });

      // ---- 键盘可用性
      header.addEventListener("keydown", (e) => {
        // Space / Enter 切换
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          header.click();
        }
        const i = headers.indexOf(header);
        if (e.key === "ArrowDown") {
          e.preventDefault();
          headers[(i + 1) % headers.length].focus();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          headers[(i - 1 + headers.length) % headers.length].focus();
        } else if (e.key === "Home") {
          e.preventDefault();
          headers[0].focus();
        } else if (e.key === "End") {
          e.preventDefault();
          headers[headers.length - 1].focus();
        }
      });
    });
  }

  // ---- Helpers
  function ensureA11y(header, content) {
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");

    const contentId = ensureId(content, "acc-content");
    const headerId = ensureId(header, "acc-header");

    header.setAttribute("aria-controls", contentId);
    content.setAttribute("aria-labelledby", headerId);
  }

  function ensureId(el, prefix) {
    if (el.id) return el.id;
    const id = `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
    el.id = id;
    return id;
  }

  /**
   * 展开/收起（带高度动画）；首次初始化可关闭动画
   */
  function setExpanded(header, content, expand, animate = true) {
    header.setAttribute("aria-expanded", expand ? "true" : "false");
    header.parentElement.classList.toggle("open", !!expand);

    // 关键：清掉上一次的 transitionend，避免竞态
    content.ontransitionend = null;

    if (!animate) {
      content.hidden = !expand;
      content.style.height = expand ? "auto" : "0px";
      return;
    }

    if (expand) {
      content.hidden = false;
      // 从 0 -> 内容高度
      content.style.height = "0px";
      // 强制回流
      content.offsetHeight;
      const h = content.scrollHeight;
      content.style.height = h + "px";

      content.ontransitionend = (e) => {
        if (e.propertyName !== "height") return;
        content.style.height = "auto"; // 展开后回到自适应
        content.ontransitionend = null;
      };
    } else {
      // 从当前高度 -> 0
      const h = content.scrollHeight;
      content.style.height = h + "px";
      content.offsetHeight;
      content.style.height = "0px";

      content.ontransitionend = (e) => {
        if (e.propertyName !== "height") return;
        content.hidden = true;
        content.style.height = ""; // 关键：还原到基线（CSS 里是 height:0）
        content.ontransitionend = null;
      };
    }
  }
}

export { initAccordion };
