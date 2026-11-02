document.querySelectorAll(".topnav .icon").forEach((button) => {
  const navigation = button.closest(".topnav");

  if (!navigation) {
    return;
  }

  button.addEventListener("click", () => {
    const isExpanded = navigation.classList.toggle("responsive");
    button.setAttribute("aria-expanded", String(isExpanded));
    button.setAttribute(
      "aria-label",
      isExpanded ? "Cerrar menú de navegación" : "Abrir menú de navegación",
    );
  });
});
