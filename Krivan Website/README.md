# Krivan Industries Pvt. Ltd. - Official Corporate Website

Welcome to the official, production-ready corporate website for **Krivan Industries Pvt. Ltd.** — an established Indian agro and fertilizer manufacturing company.

---

## 🌿 Project Overview

This website serves farmers, fertilizer dealers, agricultural distributors, and corporate partners by presenting:
- **Core Product Formulations**: Organic Manure (KRIV-VASUNDHARA), Potash Derived From Molasses (KRIV-NATURA), PROM (KRIV-MRUDA), Diatomite Silicon Granules (KRIV-SILICA), Chelated Micronutrients (KRIV-LUSTER Grade-II), and Bone Meal (KRIV-BONETON).
- **Straight Micronutrients & NPK Water Solubles**: Complete specification lists for 10 straight micronutrient grades and 10 water-soluble NPK ratio grades.
- **Farmer & Dealer Focus**: Direct product discovery, interactive inquiry forms, and instant WhatsApp communication.
- **Modern 3D Visual Design**: Subtle CSS perspective tilt effects, scroll animations, and clean responsive layouts.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic tags, accessible structure, Open Graph metadata.
- **CSS3**: Custom CSS system (`style.css`), responsive media queries (`responsive.css`), 3D tilt keyframes & scroll animations (`animations.css`).
- **Bootstrap 5 (CDN)**: Grid containers, responsive navbar, buttons, forms, modals.
- **Vanilla JavaScript**: Modular scripts (`main.js`, `products.js`, `animations.js`) with zero dependencies on React, Vue, or heavy WebGL engines.

---

## 📂 Project Structure

```text
Krivan Website/
│
├── index.html              # Homepage with Hero 3D Card, Stats, Features, & Products Preview
├── about.html              # Company Profile, Mission, Vision, & Soil Philosophy
├── products.html           # Full Product Catalogue with Search & Category Filters
├── product-details.html    # Dynamic Product Detail View powered by URL query params (?id=...)
├── gallery.html            # Visual Assets, Package Imagery & Brochure Lightbox Gallery
├── contact.html            # Interactive Enquiry Form, Contact Info & Maps Embed
│
├── css/
│   ├── style.css           # Core Design Tokens, Color Palette, Buttons & Layouts
│   ├── responsive.css      # Breakpoints for Mobile, Tablet, & Desktop Screens
│   └── animations.css      # 3D Tilt Transforms, Keyframes & Scroll Reveal Rules
│
├── js/
│   ├── main.js             # Sticky Nav, Active Links, Contact Validation & WhatsApp Payload
│   ├── products.js         # Verified Product Database & Dynamic Card Renderer
│   └── animations.js       # Mouse Tracking 3D Tilt & IntersectionObserver Scroll Triggers
│
├── assets/
│   └── images/
│       ├── company/        # Logo and Facility Imagery
│       ├── products/       # Extracted Clean Product Packaging Bags
│       ├── banners/        # High-res Hero Farmland & Farmer Banners
│       └── gallery/        # Official Product Catalogue Brochure Pages
│
└── README.md               # Maintainer & Deployment Documentation
```

---

## 🚀 How to Run the Website

### Option 1: Direct File Opening
Simply double-click on `index.html` in your file explorer to open the website directly in any web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Local Web Server (Recommended)
Using Python built-in HTTP server:
```bash
# Navigate to project directory
cd "/Applications/movies/Krivan Website"

# Start HTTP server on port 8000
python3 -m http.server 8000
```
Then open your browser and navigate to: `http://localhost:8000`

---

## ⚙️ Maintenance & Customization Guide

### 1. How to Modify Company Information
- Contact details, working hours, and address can be updated in `index.html`, `about.html`, `contact.html`, and the common footer.
- The company logo is stored at `assets/images/company/krivan-logo.png`.

### 2. How to Add or Edit Products
Open `js/products.js`. Add a new object to the `KrivanProducts` array:
```javascript
{
  id: "kriv-new-product",
  name: "KRIV - NEW PRODUCT",
  subtitle: "Product Subtitle",
  category: "organic", // "organic", "potash", or "micronutrient"
  categoryName: "Category Label",
  image: "assets/images/products/new-product.png",
  packing: "40 kg",
  targetCrop: "All Crops",
  shortDesc: "Product summary...",
  composition: [
    { label: "Active Element", value: "10%" }
  ],
  benefits: [
    "Benefit 1...",
    "Benefit 2..."
  ],
  usage: "Application guidelines..."
}
```
The products page (`products.html`), homepage grid (`index.html`), and details view (`product-details.html`) will automatically render the new product!

### 3. How to Change Color Palette
Open `css/style.css` and edit the CSS CSS custom properties under `:root`:
```css
:root {
  --primary: #143d23;       /* Deep Forest Green */
  --accent-green: #22c55e;  /* Fresh Leaf Green */
  --accent-gold: #ca8a04;   /* Earth Golden Accent */
}
```

### 4. How to Connect Contact Form to Backend
Open `js/main.js` and locate `initContactForm()`.
Replace the demo modal trigger with your backend API `fetch` call:
```javascript
fetch('https://your-api-domain.com/api/enquiry', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, phone, role, product, message })
})
.then(res => res.json())
.then(data => {
  // Handle success
});
```

---

## 🔒 Content Accuracy & Integrity

All compositions, dosage recommendations, packing sizes (40 kg / 2 kg), and product benefits presented on this website are extracted strictly from the official **Krivan Industries Pvt. Ltd.** product packaging and catalogue materials.
