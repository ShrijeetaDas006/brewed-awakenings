// ════════════════════════════════════════
// main.js — Navbar, hamburger, back-to-top,
//            smooth scroll, active nav link
// ════════════════════════════════════════

(function () {
  "use strict";

  const navbar     = document.getElementById("navbar");
  const hamburger  = document.getElementById("hamburger");
  const navLinks   = document.getElementById("navLinks");
  const backToTop  = document.getElementById("backToTop");

  /* ──────────────────────────────────────
     1. NAVBAR — shrink on scroll
  ────────────────────────────────────── */
  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  /* ──────────────────────────────────────
     2. BACK TO TOP button
  ────────────────────────────────────── */
  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ──────────────────────────────────────
     3. HAMBURGER MENU toggle
  ────────────────────────────────────── */
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ──────────────────────────────────────
     4. ACTIVE NAV LINK on scroll
  ────────────────────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  function setActiveNavLink() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navAnchors.forEach((a) => {
      a.classList.remove("active-link");
      if (a.getAttribute("href") === `#${current}`) {
        a.classList.add("active-link");
      }
    });
  }

  /* ──────────────────────────────────────
     5. SCROLL EVENT — throttled
  ────────────────────────────────────── */
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavbarScroll();
        handleBackToTop();
        setActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ──────────────────────────────────────
     6. SMOOTH SCROLL for anchor links
  ────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    });
  });

  /* ──────────────────────────────────────
     7. CURRENT YEAR in footer
  ────────────────────────────────────── */
  const footerCopy = document.querySelector(".footer-copy");
  if (footerCopy) {
    footerCopy.innerHTML = footerCopy.innerHTML.replace(
      "2025",
      new Date().getFullYear()
    );
  }

  // Run once on load
  handleNavbarScroll();
  handleBackToTop();
})();
