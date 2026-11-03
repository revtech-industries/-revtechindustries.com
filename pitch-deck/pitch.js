class PitchDeck {
  constructor() {
    this.slides = Array.from(document.querySelectorAll(".slide"));
    this.totalSlides = this.slides.length;
    this.currentSlide = 1;
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.currentSlideDisplay = document.getElementById("currentSlide");
    this.totalSlidesDisplay = document.getElementById("totalSlides");
    this.indicatorsRoot = document.getElementById("slideIndicators");
    this.init();
  }

  init() {
    if (this.totalSlidesDisplay) {
      this.totalSlidesDisplay.textContent = String(this.totalSlides);
    }
    this.buildIndicators();
    this.prevBtn?.addEventListener("click", () => this.previousSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());
    document.addEventListener("keydown", (e) => this.handleKeyboard(e));
    this.addTouchSupport();
    this.updateSlideDisplay();
  }

  buildIndicators() {
    if (!this.indicatorsRoot) return;
    this.indicatorsRoot.innerHTML = "";
    for (let i = 1; i <= this.totalSlides; i += 1) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "indicator" + (i === 1 ? " active" : "");
      btn.setAttribute("aria-label", `Go to slide ${i}`);
      btn.addEventListener("click", () => this.goToSlide(i));
      this.indicatorsRoot.appendChild(btn);
    }
    this.indicators = this.indicatorsRoot.querySelectorAll(".indicator");
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.currentSlide += 1;
      this.updateSlideDisplay();
    }
  }

  previousSlide() {
    if (this.currentSlide > 1) {
      this.currentSlide -= 1;
      this.updateSlideDisplay();
    }
  }

  goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
      this.currentSlide = slideNumber;
      this.updateSlideDisplay();
    }
  }

  updateSlideDisplay() {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    const current = document.querySelector(`[data-slide="${this.currentSlide}"]`);
    if (current) current.classList.add("active");

    this.indicators?.forEach((indicator, index) => {
      indicator.classList.toggle("active", index + 1 === this.currentSlide);
    });

    if (this.currentSlideDisplay) {
      this.currentSlideDisplay.textContent = String(this.currentSlide);
    }
    if (this.prevBtn) this.prevBtn.disabled = this.currentSlide === 1;
    if (this.nextBtn) this.nextBtn.disabled = this.currentSlide === this.totalSlides;
  }

  handleKeyboard(e) {
    switch (e.key) {
      case "ArrowRight":
      case " ":
        e.preventDefault();
        this.nextSlide();
        break;
      case "ArrowLeft":
        e.preventDefault();
        this.previousSlide();
        break;
      case "Home":
        e.preventDefault();
        this.goToSlide(1);
        break;
      case "End":
        e.preventDefault();
        this.goToSlide(this.totalSlides);
        break;
      default:
        break;
    }
  }

  addTouchSupport() {
    let startX = 0;
    let startY = 0;
    document.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );
    document.addEventListener(
      "touchend",
      (e) => {
        const deltaX = e.changedTouches[0].clientX - startX;
        const deltaY = e.changedTouches[0].clientY - startY;
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          if (deltaX > 0) this.previousSlide();
          else this.nextSlide();
        }
      },
      { passive: true }
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.pitchDeck = new PitchDeck();
});
