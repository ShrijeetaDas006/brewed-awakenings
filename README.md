# ShopGreen 🛍️
### Modern E-Commerce Shopping App

A fully functional React e-commerce application with product listing, smart filtering, cart management, and a secure payment flow — built from scratch with a premium design aesthetic.

---

## Live Preview

> Deploy on Vercel for a live link (see Setup Guide below)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Context API (useReducer), CSS3 |
| State Management | React Context + useReducer |
| Styling | Custom CSS with CSS Variables, Google Fonts |
| Fonts | Playfair Display (display) + DM Sans (body) |
| Icons | Inline SVG |
| Build Tool | Create React App |

---

## Project Structure

```
shopgreen/
├── public/
│   └── index.html                  # HTML template
└── src/
    ├── App.js                      # Root component + routing logic
    ├── index.js                    # React entry point
    ├── index.css                   # Full design system (CSS variables, components)
    ├── context/
    │   └── CartContext.js          # Global cart state (useReducer)
    ├── components/
    │   ├── ProductCard.js          # Individual product tile with add-to-cart
    │   ├── Sidebar.js              # Category, price & sort filters
    │   ├── CartPanel.js            # Cart items + order summary
    │   ├── PaymentForm.js          # Payment form with validation
    │   └── Toast.js                # Animated toast notifications
    └── data/
        └── products.js             # 18 products across 4 categories
```

---

## Key Features

- **Product Listing** — 18 products across Electronics, Fashion, Food & Home categories
- **Smart Filters** — Filter by category, price range slider, and sort (price, rating, reviews)
- **Live Search** — Real-time search by product name or description
- **Shopping Cart** — Add, remove, increase/decrease quantity with live totals
- **Order Summary** — Subtotal + 8% tax + shipping calculated automatically
- **Secure Payment Form** — Card number formatting, expiry formatting, CVV, client-side validation
- **Toast Notifications** — Animated feedback on every cart action
- **Order Confirmation** — Success screen with unique order number
- **Responsive Design** — Works on desktop and tablet

---

## Screenshots

> Add screenshots here after deployment

---

## Setup Guide

### Prerequisites
- Node.js v18+
- npm

### Step 1 — Clone the repo
```bash
git clone https://github.com/ShrijeetaDas006/shopgreen-ecommerce.git
cd shopgreen-ecommerce
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Start the development server
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4 — Build for production
```bash
npm run build
```

---

## Component Guide

### `CartContext.js`
Global state using `useReducer`. Supports:
| Action | Description |
|--------|-------------|
| `ADD` | Add product to cart |
| `INC` | Increase quantity |
| `DEC` | Decrease quantity (removes if 0) |
| `REMOVE` | Remove item entirely |
| `CLEAR` | Empty cart after order |

### `PaymentForm.js`
Client-side validated payment form:
- Card number auto-formats to `1234 5678 9012 3456`
- Expiry auto-formats to `MM/YY`
- Highlights invalid fields in red on submit
- Simulates 1.8s processing before success

### `Toast.js`
Global notification system — call `toast("message")` from anywhere in the app.

---

## Deploy on Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. Click **Add New Project** → import `shopgreen-ecommerce`
3. Vercel auto-detects React → click **Deploy**
4. Your app goes live at `shopgreen-ecommerce.vercel.app`

---

## Skills Demonstrated

- React component architecture (functional components + hooks)
- Global state management with Context API + useReducer
- CSS design systems with custom properties (variables)
- Form validation and user feedback patterns
- Data filtering, sorting, and search logic
- Responsive layout with CSS Grid and Flexbox
- Production build with Create React App

---

## Author

**Shrijeeta Das** · B.Tech CSE (AI) · IEM Kolkata  
GitHub: [@ShrijeetaDas006](https://github.com/ShrijeetaDas006)  
LinkedIn: [Connect with me](https://www.linkedin.com/in/shrijeeta-das)

---

> Built with 💚 as part of full-stack portfolio development
