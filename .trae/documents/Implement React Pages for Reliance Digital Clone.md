## Overview
- Convert the static HTML pages in `reliancedigital_clone/html` into React components in `frontend/src/pages`.
- Implement shared `Navbar` and `Footer` components to match the header/footer used across the HTML pages.
- Wire up client-side routing to match the navigation in the HTML (login, register, mobiles, product list, product details, account, orders, addresses, cart, payment, success/failure).
- Use the images and icons already placed under `frontend/public` via paths like `/images/...` and `/icons/...`.
- Keep the same class names and layout; import the corresponding CSS per-page to avoid re-styling from scratch.
- Add concise comments in the React components to explain major sections and intent.

## Files To Create/Update
- Update `frontend/src/App.jsx` to register routes for all pages.
- Implement `frontend/src/components/Navbar.jsx` and `frontend/src/components/Footer.jsx` with the header/footer structure from the HTML.
- Create React pages in `frontend/src/pages/`:
  - `MobileSection.jsx` (from `mobile-section.html`)
  - `MobileProducts.jsx` (from `mobile_product_page.html`)
  - `SingleMobileProduct.jsx` (from `single-mobile-product-page.html`)
  - `MyAccount.jsx` (from `my-account.html`)
  - `MyAddresses.jsx` (from `my-addresses.html`)
  - `MyOrders.jsx` (from `my-orders.html`)
  - `Payment.jsx` (from `payment.html`)
  - `PaymentSuccess.jsx` (from `payment-success.html`)
  - `PaymentFailed.jsx` (from `payment-failed.html`)
  - Flesh out existent placeholders: `Cart.jsx`, `Login.jsx`, `Register.jsx`, `ProductDetails.jsx`, `Home.jsx` (align with `index.html` hero and sections)

## Routing
- Use `react-router-dom` with these paths:
  - `/` → `Home`
  - `/login` → `Login`
  - `/register` → `Register`
  - `/cart` → `Cart`
  - `/mobiles` → `MobileSection`
  - `/mobiles/all` → `MobileProducts`
  - `/mobiles/:slug` → `SingleMobileProduct` (route param for specific model)
  - `/account` → `MyAccount`
  - `/account/orders` → `MyOrders`
  - `/account/addresses` → `MyAddresses`
  - `/payment` → `Payment`
  - `/payment/success` → `PaymentSuccess`
  - `/payment/failed` → `PaymentFailed`
- Replace `<a>` tags in header/footer with `<Link>`s to these routes.
- Reference: current router shell is here: `frontend/src/App.jsx:16`.

## Styling Strategy
- Migrate page-specific CSS from `reliancedigital_clone/css/*.css` into `frontend/src/styles/` under identical filenames for clarity.
- Import CSS per page component (e.g., `import "../styles/my-acc.css"`) to keep styles scoped by convention.
- Keep the existing class names so no design work is needed; treat images as `/images/...` and icons as `/icons/...` from Vite’s public directory.

## Component Structure
- `Navbar`: upper/middle/lower header sections with search bar and profile items; convert navigation items to router links; keep the filter button as a non-functional or stub.
- `Footer`: company info, quick links, customer service, contact/newsletter, payment methods; newsletter form can be a stub.
- Pages: copy semantic sections from each HTML into JSX, adding small comments to mark major regions (banner, grids, filters, product cards, etc.).

## Light Interactivity (Optional)
- Add non-breaking stubs where the HTML implies actions (e.g., quantity +/- in cart, “Add to Cart”, “Checkout”, “Check pincode”) with simple `onClick` handlers that currently just log or toast. Real integration can later use the existing placeholders in `features/` and `api/`.
- Preserve accessibility via proper `alt` text and button semantics.

## Assets
- Update all relative asset paths from `../images/...` and `../icons/...` to Vite public paths like `/images/logo.png`, `/icons/search_24dp_...svg`.
- Keep remote CDN images unchanged.

## Verification
- Run the dev server and validate navigation and visual parity across pages.
- Spot-check routes for `/mobiles`, `/mobiles/all`, a sample `/mobiles/pixel-9a`, `/account/*`, `/payment/*`.
- Ensure `Navbar`/`Footer` appear on all pages and links navigate correctly.

## Notes
- The repo does not include Tailwind; we will rely on the provided CSS files and plain class names.
- Comments will be added in components as requested, focused on sectioning and logic, not verbose blocks.

## Deliverables
- Implemented React components and pages mirroring the HTML structure.
- Updated routing in `App.jsx`.
- Imported CSS ensuring faithful styling.
- Asset path normalization to `public/`.
- Basic stubs for interactive controls to be wired to Redux/API later.