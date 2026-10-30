/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

/**
 * Write any other JavaScript below
 */

import Typed from "typed.js";

/* Animació de teclat*/
const typedElements = document.querySelectorAll("[data-typed]");
const revealElements = document.querySelectorAll("[data-reveal]");
const discoverButton = document.querySelector("[data-discover]");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Conservem els textos originals abans de modificar-los.
const originalTexts = Array.from(typedElements, (element) =>
  element.textContent.trim(),
);

function revealContent() {
  document.documentElement.classList.remove("js-booting");
}

// Només iniciem l'animació si tenim els elements necessaris.
if (typedElements.length === 4 && discoverButton && revealElements.length > 0) {
  // El contingut només s'oculta quan JavaScript està preparat.
  document.documentElement.classList.add("js-booting");

  // Preparem els quatre elements per escriure-hi.
  typedElements.forEach((element) => {
    element.textContent = "";
  });

  function typeNext(index) {
    if (index >= typedElements.length) {
      return;
    }

    const element = typedElements[index];

    element.classList.add("is-typing");

    new Typed(element, {
      strings: [originalTexts[index]],
      typeSpeed: 45,
      startDelay: index === 0 ? 400 : 150,
      showCursor: false,
      loop: false,

      onComplete: () => {
        typeNext(index + 1);
      },
    });
  }

  if (reducedMotion) {
    typedElements.forEach((element, index) => {
      element.textContent = originalTexts[index];
      element.classList.add("is-typing");
    });
  } else {
    // Esperem que es carregui la imatge visible del Pip-Boy.
    const frameImage = document.querySelector(".pipboy__frame img");

    if (frameImage && !frameImage.complete) {
      frameImage.addEventListener(
        "load",
        () => {
          typeNext(0);
        },
        { once: true },
      );

      // Si la imatge falla, no bloquegem l'animació.
      frameImage.addEventListener(
        "error",
        () => {
          typeNext(0);
        },
        { once: true },
      );
    } else {
      typeNext(0);
    }
  }

  // Revelem la resta de la web en prémer el botó.
  discoverButton.addEventListener("click", () => {
    revealContent();
  });
}
(function () {
  const university = "UOC";
  console.log(`Hello, ${university}!`);
})();

const menu = document.querySelector(".pipboy__menu");

const desktopQuery = window.matchMedia("(min-width: 1024px)");

function updateMenu() {
  if (menu) {
    menu.open = desktopQuery.matches;
  }
}

// Comprovem la mida en carregar la pàgina
updateMenu();

// Actualitzem el menú quan canviem de format
desktopQuery.addEventListener("change", updateMenu);
