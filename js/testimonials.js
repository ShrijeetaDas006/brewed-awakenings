// ════════════════════════════════════════
// testimonials.js — Render review cards
// ════════════════════════════════════════

(function () {
  "use strict";

  const grid = document.getElementById("testimonialGrid");

  /**
   * Generates star icons based on rating
   * @param {number} rating - Number of stars (1-5)
   * @returns {string} HTML string of stars
   */
  function generateStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  /**
   * Creates a single testimonial card element
   * @param {Object} review - Testimonial data object
   * @returns {HTMLElement}
   */
  function createTestimonialCard(review) {
    const card = document.createElement("div");
    card.className = "testimonial-card reveal";

    card.innerHTML = `
      <div class="stars">${generateStars(review.rating)}</div>
      <p>${review.text}</p>
      <div class="reviewer">
        <img
          src="${review.avatar}"
          alt="${review.name}"
          class="reviewer-img"
          loading="lazy"
          onerror="this.src='https://i.pravatar.cc/80?img=1'"
        />
        <div>
          <div class="reviewer-name">${review.name}</div>
          <div class="reviewer-sub">${review.role}</div>
        </div>
      </div>
    `;

    return card;
  }

  /**
   * Renders all testimonial cards into the grid
   */
  function renderTestimonials() {
    if (!grid) return;

    TESTIMONIALS.forEach((review, index) => {
      const card = createTestimonialCard(review);
      card.style.transitionDelay = `${index * 0.15}s`;
      grid.appendChild(card);
    });
  }

  renderTestimonials();
})();
