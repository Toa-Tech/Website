/* ==========================================================================
   Progressive enhancement only. The page is fully usable without this file:
   the nav links are always in the HTML and the footer year is hard-coded.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Mobile menu toggle
     Reveals the button, collapses the menu, and keeps aria-expanded in sync.
     ---------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".site-header__toggle");
  var menu = document.getElementById("site-menu");

  if (header && toggle && menu) {
    var isOpen = function () {
      return toggle.getAttribute("aria-expanded") === "true";
    };

    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
    };

    toggle.hidden = false;
    header.classList.add("site-header--enhanced");

    toggle.addEventListener("click", function () {
      setOpen(!isOpen());
    });

    // Escape closes the menu and returns focus to the button.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Choosing a link closes the menu; the browser then moves to the target.
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    // Reset when the layout switches to the desktop header (64em = --bp-lg).
    var desktop = window.matchMedia("(min-width: 64em)");
    desktop.addEventListener("change", function (event) {
      if (event.matches) {
        setOpen(false);
      }
    });
  }

  /* ----------------------------------------------------------------------
     Footer year (the HTML already contains the correct year as a fallback)
     ---------------------------------------------------------------------- */
  var year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = year;
  });
})();
