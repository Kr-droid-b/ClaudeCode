# CLAUDE.md

This file provides guidance for AI assistants working with this repository.

## Project Overview

**Revis 2015 EOOD** — A modern, multilingual (BG/EN/DE) static website for an electric motor repair & rewinding company based in Ruse, Bulgaria. The site targets both local and international (EU) customers, allowing them to browse services, view pricing, order repairs, purchase spare parts, and sign maintenance contracts.

## Repository Structure

```
ClaudeCode/
  index.html              # Single-page application (all sections)
  css/
    style.css             # All styles — CSS custom properties, responsive, animations
  js/
    translations.js       # i18n translations object (BG / EN / DE)
    app.js                # Main application logic (language switching, forms, modals, animations)
  img/                    # Image assets directory (placeholder — add product/service photos)
  CLAUDE.md               # This file — AI assistant guidance
```

## Tech Stack

- **Language**: Pure HTML5 / CSS3 / Vanilla JavaScript (ES5 compatible)
- **Build system**: None — zero dependencies, no build step
- **Package manager**: None needed
- **Test framework**: None (static site)
- **Deployment**: GitHub Pages (serve `index.html` from repo root)

## Key Features

1. **Multilingual** — Bulgarian, English, German via `data-i18n` attributes + `js/translations.js`
2. **Service Catalog** — Motor rewinding, auto diagnostics, spare parts shop
3. **Pricing Tiers** — Small/Medium/Large/Industrial motor rewinding with EUR pricing
4. **Maintenance Contracts** — Bronze/Silver/Gold subscription plans for businesses
5. **International Shipping Flow** — Step-by-step "How It Works" for EU clients
6. **Order Modal** — Click-to-order for any service or part
7. **Contact Form** — With country selector, service picker, GDPR consent
8. **Responsive Design** — Mobile-first, works on all screen sizes
9. **Scroll Animations** — IntersectionObserver-based fade-in effects
10. **SEO** — Schema.org structured data, OpenGraph meta tags

## Development Workflow

No build commands needed. To develop:

1. Open `index.html` in a browser (or use any local server)
2. Edit HTML in `index.html`, styles in `css/style.css`, logic in `js/app.js`
3. Add/edit translations in `js/translations.js`

### Adding a new language

1. Add a new key (e.g., `fr`) to `TRANSLATIONS` in `js/translations.js`
2. Add corresponding entries to `SERVICE_NAMES`
3. Add a `<button class="lang-btn" data-lang="fr">FR</button>` in the navbar

### Adding a new service/product

1. Add HTML card in the relevant section of `index.html`
2. Add `data-i18n` keys and translations in all 3 languages
3. For orderable items, add `order-btn` class with `data-service` and `data-price` attributes

## Git Conventions

- **Default branch**: `master`
- **Remote**: `origin`
- **Commit style**: Imperative mood, concise subject lines (e.g., "Add motor rewinding pricing section")

## Guidelines for AI Assistants

1. **Read before editing** — Always read files before proposing changes.
2. **Minimal changes** — Only make changes that are directly requested.
3. **Keep this file updated** — When adding features or changing structure, update CLAUDE.md.
4. **No secrets** — Never commit `.env` files, credentials, API keys, or other sensitive data.
5. **Commit messages** — Use imperative mood, keep the subject line under 72 characters.
6. **No build tools** — This is intentionally a zero-dependency static site. Do not add npm, webpack, etc.
7. **Translations** — Any user-visible text must be translated in all 3 languages (BG/EN/DE).
8. **Accessibility** — Maintain ARIA labels, semantic HTML, and keyboard navigation.

## Production TODOs

- [ ] Replace placeholder phone number (+359 XX XXX XXXX) with real number
- [ ] Replace placeholder email (info@revis2015.bg) with real email
- [ ] Replace ЕИК: XXXXXXXXX with real company registration number
- [ ] Add real product/service photos to `img/` directory
- [ ] Connect contact & order forms to a backend (e.g., Formspree, EmailJS, or custom API)
- [ ] Set up custom domain and update CNAME file
- [ ] Add Google Analytics / Meta Pixel tracking
- [ ] Configure Stripe for online payments (optional)
