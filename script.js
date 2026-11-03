document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  const betaForm = document.getElementById("betaRequestForm");
  const betaMessage = document.getElementById("betaFormMessage");
  if (betaForm && betaMessage) {
    betaForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("beta-name")?.value.trim() || "";
      const email = document.getElementById("beta-email")?.value.trim() || "";
      const platform = document.getElementById("beta-platform")?.value || "Not specified";
      const subject = encodeURIComponent("Artemis AI – Closed beta / partner request");
      const body = encodeURIComponent(
        `New signup:\n\nName: ${name}\nEmail: ${email}\nInterest: ${platform}\n\nPlease follow up with beta access or partnership next steps.`
      );
      betaMessage.textContent =
        "Opening your email client to send the request. Send the email to complete signup.";
      window.location.href = `mailto:warnecke.james@outlook.com?subject=${subject}&body=${body}`;
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  let lastFocus = null;

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lightboxImage) {
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
    }
    if (lightboxCaption) lightboxCaption.textContent = "";
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
    lastFocus = null;
  };

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImage || !src) return;
    lastFocus = document.activeElement;
    // Restart animated GIFs from frame 0 on each open.
    lightboxImage.removeAttribute("src");
    const joiner = src.includes("?") ? "&" : "?";
    lightboxImage.src = `${src}${joiner}replay=${Date.now()}`;
    lightboxImage.alt = alt || "";
    if (lightboxCaption) lightboxCaption.textContent = alt || "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  };

  document.querySelectorAll(".zoom-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const dataSrc = trigger.getAttribute("data-lightbox-src");
      const dataAlt = trigger.getAttribute("data-lightbox-alt");
      const img = trigger.querySelector("img");
      const src = dataSrc || img?.currentSrc || img?.src;
      const alt = dataAlt || img?.alt || trigger.getAttribute("aria-label") || "";
      openLightbox(src, alt);
    });
  });

  if (lightbox) {
    lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
      el.addEventListener("click", closeLightbox);
    });
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
      event.preventDefault();
      closeLightbox();
    }
  });
});
