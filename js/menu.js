// ════════════════════════════════════════
// menu.js — Menu rendering & tab filtering
// ════════════════════════════════════════

(function () {
  "use strict";

  const menuGrid = document.getElementById("menuGrid");
  const tabButtons = document.querySelectorAll(".tab-btn");

  /**
   * Creates a single menu card element
   * @param {Object} item - Menu item data
   * @returns {HTMLElement}
   */
  function createMenuCard(item) {
    const card = document.createElement("div");
    card.className = "menu-card reveal";
    card.setAttribute("data-category", item.category);

    card.innerHTML = `
      <img
        src="${item.img}"
        alt="${item.name}"
        class="menu-card-img"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=70'"
      />
      <div class="menu-card-body">
        ${item.badge ? `<div class="menu-badge">${item.badge}</div>` : ""}
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="menu-price">${item.price}</div>
      </div>
    `;

    return card;
  }

  /**
   * Renders filtered menu items into the grid
   * @param {string} filter - Category filter ('all' | 'drinks' | 'food' | 'seasonal')
   */
  function renderMenu(filter) {
    // Clear existing cards
    menuGrid.innerHTML = "";

    const filtered =
      filter === "all"
        ? MENU_ITEMS
        : MENU_ITEMS.filter((item) => item.category === filter);

    if (filtered.length === 0) {
      menuGrid.innerHTML = `<p style="color:var(--mocha);grid-column:1/-1;text-align:center;padding:2rem;">No items found.</p>`;
      return;
    }

    filtered.forEach((item, index) => {
      const card = createMenuCard(item);
      // Staggered animation delay
      card.style.transitionDelay = `${index * 0.07}s`;
      menuGrid.appendChild(card);
    });

    // Trigger reveal for new cards
    requestAnimationFrame(() => {
      document.querySelectorAll(".menu-card.reveal").forEach((card) => {
        card.classList.add("visible");
      });
    });
  }

  /**
   * Handles tab button clicks
   */
  function handleTabClick(e) {
    const btn = e.currentTarget;
    const filter = btn.getAttribute("data-filter");

    // Update active state
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    renderMenu(filter);
  }

  // Attach event listeners to tabs
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", handleTabClick);
  });

  // Initial render
  renderMenu("all");
})();
