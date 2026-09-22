# First4Tapes

> **🔗 View on GitHub: [https://github.com/sakibmalek09/first4tapes](https://github.com/sakibmalek09/first4tapes)**

A fully static e-commerce style website for **First4Tapes** — packaging tapes,
stretch films and accessories. Built with HTML, CSS and vanilla JS on top of
Bootstrap 5, Owl Carousel and AOS — no build step, no frameworks to install.

## 📄 Pages

| File | Page |
|------|------|
| `index.html` | Home — banner, categories, stats |
| `shop.html` | Shop — product grid |
| `product-details.html` … `product5-details.html` | Product detail pages (5 products) |
| `addtocart.html` | Cart |
| `blog.html` / `blog-details.html` | Blog listing and article |
| `about.html` | About us |
| `contact.html` | Contact |

## 🗂 Project structure

```
├── index.html          # Home page (plus 11 more pages)
├── responsive.css      # Responsive overrides
└── assets/
    ├── css/            # Bootstrap, Owl Carousel, Font Awesome, custom styles
    ├── js/             # jQuery, Bootstrap, Owl Carousel, WOW, custom scripts
    ├── fonts/          # Metropolis + icon fonts
    └── img/            # Product, blog and banner imagery
```

## 🖥 Run locally

Any static server works:

```bash
python -m http.server 8080
# → http://localhost:8080
```

…or just open `index.html` directly in a browser.

## 🚀 Deploy

### GitHub Pages

1. In this repo: **Settings → Pages → Build and deployment → Source:
   "Deploy from a branch"** → branch `main`, folder `/ (root)` → Save.
2. The site goes live at `https://sakibmalek09.github.io/first4tapes/` in ~1 minute.

### Netlify

Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drop this folder — done.
