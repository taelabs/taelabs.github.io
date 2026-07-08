# Tae Lab's — Portfolio

Premium, dark-themed portfolio for **Tae Lab's** — a FiveM development brand focused on scripts, UI/NUI systems, admin tools and custom, framework-ready resources.

Built with **React + Vite + TypeScript + Tailwind CSS v4** and strong animations powered by **GSAP**. Features a **liquid-glass** UI (black + volt yellow), **view-based navigation** (not one long scroll page) and a **coverflow carousel** for projects. Optimized for performance, SEO and GitHub Pages.

---

## ✨ Features

- 🦋 **Liquid-glass UI** — frosted refractive panels, animated volt blobs, film grain, black + yellow
- 🎬 **Strong GSAP animations** — split-text reveals, magnetic buttons, view transitions, coverflow
- 🧭 **View-based navigation** — each section is its own screen with animated transitions (no endless scroll)
- 🎠 **Coverflow project carousel** — drag, swipe, wheel, keyboard and dot navigation
- 📱 **Fully responsive** — desktop rail + mobile bottom dock
- 🧩 **Config-driven content** — edit projects, tech, services and links from simple data files
- 🔍 **SEO-ready** — meta tags, Open Graph, Twitter cards, canonical URL
- ♿ **Accessible** — focus states, reduced-motion support, semantic markup
- 🚀 **GitHub Pages ready** — one-click deploy via GitHub Actions or `npm run deploy`

---

## 📦 Getting started

Requires **Node.js 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (http://localhost:5173)
npm run dev

# 3. Build for production (output in /dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 🗂️ Project structure

```
src/
├─ components/
│  ├─ layout/       # TopBar, Dock (desktop rail + mobile bar)
│  ├─ views/        # HomeView, AboutView, StackView, WorkView, ServicesView, ContactView
│  └─ ui/           # Button (magnetic), Badge, Logo, Icons, Background, ViewHeader
├─ lib/
│  ├─ gsap.ts       # GSAP + useGSAP setup and easing tokens
│  └─ view.ts       # View list + navigation context
├─ data/            # ← Edit your content here
│  ├─ site.ts       # Brand name, tagline, hero/about copy
│  ├─ projects.ts   # Projects (rendered in the carousel)
│  ├─ technologies.ts
│  ├─ services.ts
│  └─ links.ts      # Contact & social links
├─ styles/
│  └─ index.css     # Tailwind v4 theme tokens + liquid-glass system
├─ App.tsx          # View router + GSAP transitions
└─ main.tsx
public/             # favicon, og-image, .nojekyll
```

---

## ✏️ Editing content

All content lives in [`src/data`](src/data) — no need to touch components.

### Brand & hero — `src/data/site.ts`
Change the brand name, tagline, hero headline and subtitle.

### Projects — `src/data/projects.ts`
Add a new object to the `projects` array:

```ts
{
  title: 'My New Resource',
  description: 'What it does and why it matters.',
  category: 'FiveM Resource',          // FiveM Resource | UI System | Admin Tool | Gameplay System | Framework Bridge | Web Interface
  tech: ['Lua', 'React', 'ox_lib'],
  status: 'Released',                  // Released | In Development | Private | Planned
  featured: true,
  image: '/previews/my-resource.png',  // optional — omit for a branded placeholder
  links: [                             // optional — only links with a url are shown
    { label: 'GitHub', url: 'https://github.com/...' },
    { label: 'Tebex', url: 'https://tebex...' },
  ],
}
```

Projects are shown in the coverflow carousel in the order defined here.

### Technologies — `src/data/technologies.ts`
Add/remove items inside each `TechGroup`, or add a new group.

### Services — `src/data/services.ts`
Each service has a `title`, `description` and an `icon` key (see available icons in the file).

### Contact links — `src/data/links.ts`
Fill in the `url` for each link. **Leave `url` empty (`''`) to hide a link** — it will show as "Coming soon" until configured.

---

## 🚀 Deploying to GitHub Pages

This repo is set up for **`https://taelabs.github.io`** (a user/org page), so `base` is `'/'` in [`vite.config.ts`](vite.config.ts).

> If you deploy to a **project repo** (e.g. `https://user.github.io/my-repo`), change `base` to `'/my-repo/'` in `vite.config.ts`.

### Option A — GitHub Actions (recommended)

1. Push this project to a repository named `taelabs.github.io`.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push to `main`. The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys automatically.

### Option B — Manual deploy with `gh-pages`

```bash
npm run deploy
```

This builds the site and pushes `/dist` to the `gh-pages` branch. Then set **Settings → Pages → Source → `gh-pages` branch**.

> The `public/.nojekyll` file is included so GitHub Pages serves Vite's `assets/` folder correctly.

---

## 🎨 Customizing the theme

Colors, fonts, radii and animations are defined as tokens in [`src/styles/index.css`](src/styles/index.css) under `@theme`. Adjust the volt/yellow accent scale (`--color-volt-*`) or the black surfaces (`--color-void-*`) to reskin the whole site.

---

## 📄 License

Personal portfolio project for **Tae Lab's**. Feel free to use it as a reference.
