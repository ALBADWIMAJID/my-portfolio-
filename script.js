const menu = document.querySelector(".menu-links");
const icon = document.querySelector(".hamburger-icon");

if (menu && icon) {
  icon.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    icon.classList.toggle("open", isOpen);
    icon.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      icon.classList.remove("open");
      icon.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menu.classList.remove("open");
      icon.classList.remove("open");
      icon.setAttribute("aria-expanded", "false");
    }
  });
}
