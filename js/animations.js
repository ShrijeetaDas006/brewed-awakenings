// ════════════════════════════════════════
// animations.js — Scroll reveal, counter,
//                 lightbox, gallery
// ════════════════════════════════════════

(function () {
  "use strict";

  /* ──────────────────────────────────────
     1. SCROLL REVEAL (IntersectionObserver)
  ────────────────────────────────────── */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ──────────────────────────────────────
     2. ANIMATED COUNTER (About stats)
  ────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const suffix = target >= 500 ? "+" : (target === 6 ? "+" : "");
    const duration = 1500;
    const stepTime = 16; // ~60fps
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  }

  function initCounters() {
    const counters = document.querySelectorAll(".stat-num[data-target]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  /* ──────────────────────────────────────
     3. LIGHTBOX for Gallery
  ────────────────────────────────────── */
  function initLightbox() {
    // Create lightbox element
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.id = "lightbox";
    lightbox.innerHTML = `
      <button class="lightbox-close" id="lightboxClose" aria-label="Close">✕</button>
      <img id="lightboxImg" src="" alt="Gallery image" />
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById("lightboxImg");

    // Open lightbox on gallery click
    document.querySelectorAll(".gallery-item img").forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        lightboxImg.src = img.src.replace("w=500", "w=1200").replace("w=800", "w=1400");
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    // Close on button click
    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);

    // Close on backdrop click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  /* ──────────────────────────────────────
     INIT ALL
  ────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initCounters();
    initLightbox();
  });
})();
