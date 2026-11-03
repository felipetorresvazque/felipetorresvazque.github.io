document.querySelectorAll(".gcmusic-carousel").forEach((carousel) => {
  const viewport = carousel.querySelector(".gcmusic-carousel__viewport");
  const slides = Array.from(
    carousel.querySelectorAll(".gcmusic-carousel__slide"),
  );
  const arrows = carousel.querySelectorAll(".gcmusic-carousel__arrow");
  const dots = Array.from(
    carousel.querySelectorAll(".gcmusic-carousel__dot"),
  );
  const status = carousel.querySelector(".gcmusic-carousel__status");

  if (
    !viewport ||
    slides.length === 0 ||
    dots.length !== slides.length ||
    !status
  ) {
    console.error("The GC Music carousel markup is incomplete.");
    return;
  }

  let activeIndex = 0;

  const updateControls = () => {
    arrows.forEach((arrow) => {
      const direction = Number(arrow.dataset.direction);
      arrow.disabled =
        direction < 0
          ? activeIndex === 0
          : activeIndex === slides.length - 1;
    });

    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", String(index !== activeIndex));
    });

    dots.forEach((dot, index) => {
      dot.setAttribute("aria-pressed", String(index === activeIndex));
    });

    status.textContent = `Imagen ${activeIndex + 1} de ${slides.length}`;
  };

  const showSlide = (index) => {
    activeIndex = Math.max(0, Math.min(index, slides.length - 1));
    viewport.scrollTo({
      left: slides[activeIndex].offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    updateControls();
  };

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      showSlide(activeIndex + Number(arrow.dataset.direction));
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  let scrollTimeout;
  viewport.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        const index = Math.round(viewport.scrollLeft / viewport.clientWidth);

        if (index !== activeIndex) {
          activeIndex = index;
          updateControls();
        }
      }, 120);
    },
    { passive: true },
  );

  updateControls();
});
