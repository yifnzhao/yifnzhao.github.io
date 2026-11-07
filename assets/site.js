/* Progressive enhancements: image viewing and educational workflow walkthroughs.
 * The walkthroughs explain each method; they do not run scientific analyses.
 */
(() => {
  "use strict";

  function enhanceImageViewer() {
    const dialog = document.getElementById("image-viewer");
    const image = document.getElementById("viewer-image");
    const caption = document.getElementById("viewer-caption");
    const closeButton = dialog?.querySelector("[data-viewer-close]");

    // Image links remain ordinary links when native dialogs are unavailable.
    if (!dialog || typeof dialog.showModal !== "function" ||
        !(image instanceof HTMLImageElement) || !caption || !closeButton) return;

    let opener = null;
    const imageDirectory = new URL("images/", document.baseURI);

    function localImageUrl(link) {
      try {
        const url = new URL(link.getAttribute("href"), document.baseURI);
        if (url.origin !== window.location.origin ||
            url.protocol !== window.location.protocol ||
            !url.pathname.startsWith(imageDirectory.pathname)) return null;
        return url.href;
      } catch {
        return null;
      }
    }

    document.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
          event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element
        ? event.target.closest("a[data-lightbox]") : null;
      if (!link) return;
      const url = localImageUrl(link);
      if (!url) return;

      image.src = url;
      image.alt = link.querySelector("img")?.alt || link.dataset.caption || "";
      caption.textContent = link.dataset.caption || image.alt;
      opener = link;
      if (!dialog.open) dialog.showModal();
      event.preventDefault();
      closeButton.focus({ preventScroll: true });
    });

    closeButton.addEventListener("click", () => dialog.close());

    // The native Escape-key behavior closes the dialog too. Only clicks beyond
    // its bounds count as backdrop clicks, so padding does not dismiss a figure.
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", () => {
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
      opener = null;
    });
  }

  function enhanceWalkthroughs() {
    let generatedId = 0;
    function ensureId(element, prefix) {
      if (element.id) return element.id;
      let id;
      do { id = `${prefix}-${++generatedId}`; }
      while (document.getElementById(id));
      element.id = id;
      return id;
    }

    document.querySelectorAll("[data-walkthrough]").forEach((group) => {
      const controls = group.querySelector("[data-step-controls]");
      const buttons = Array.from(group.querySelectorAll(".workflow-steps button[data-step]"))
        .filter((button) => button.closest("[data-walkthrough]") === group);
      const panels = Array.from(group.querySelectorAll("[data-step-panel]"))
        .filter((panel) => panel.closest("[data-walkthrough]") === group);

      // Leave the complete, readable fallback intact if markup is incomplete.
      if (!controls || !buttons.length || !panels.length ||
          buttons.some((button) => !panels.some((panel) =>
            panel.dataset.stepPanel === button.dataset.step))) return;

      buttons.forEach((button) => {
        const panel = panels.find((item) => item.dataset.stepPanel === button.dataset.step);
        button.setAttribute("aria-controls", ensureId(panel, "workflow-panel"));
        panel.setAttribute("aria-labelledby", ensureId(button, "workflow-step"));
        panel.setAttribute("role", "region");
      });

      function select(index, moveFocus = false) {
        const selected = buttons[index];
        buttons.forEach((button) => {
          const active = button === selected;
          button.setAttribute("aria-pressed", String(active));
          button.tabIndex = active ? 0 : -1;
        });
        panels.forEach((panel) => {
          panel.hidden = panel.dataset.stepPanel !== selected.dataset.step;
        });
        if (moveFocus) selected.focus();
      }

      buttons.forEach((button, index) => {
        button.addEventListener("click", () => select(index));
        button.addEventListener("keydown", (event) => {
          let next;
          switch (event.key) {
            case "ArrowRight":
            case "ArrowDown": next = (index + 1) % buttons.length; break;
            case "ArrowLeft":
            case "ArrowUp": next = (index - 1 + buttons.length) % buttons.length; break;
            case "Home": next = 0; break;
            case "End": next = buttons.length - 1; break;
            default: return;
          }
          event.preventDefault();
          select(next, true);
        });
      });

      const initial = buttons.findIndex((button) => button.getAttribute("aria-pressed") === "true");
      select(initial === -1 ? 0 : initial);
      controls.hidden = false;
    });
  }

  function initialize() {
    enhanceImageViewer();
    enhanceWalkthroughs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
