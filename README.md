# vision-products

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Official products and documentation site for **machina.gg**.

**Live Site**: [https://machina-gg.github.io/vision-products/](https://machina-gg.github.io/vision-products/)

## About

This site hosts:

- Product pages for machina.gg products (VisionFocus, etc.)
- Documentation and user guides
- Legal pages (Privacy Policy, Terms of Service)
- Blog and updates

## Tech Stack

- **Framework**: [Astro](https://astro.build) v5
- **Theme**: [Starlight](https://starlight.astro.build) v0.37
- **Package Manager**: pnpm
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images and media
│   ├── content/
│   │   └── docs/               # Markdown/MDX content
│   │       ├── index.mdx       # Homepage
│   │       ├── vision-focus.mdx # VisionFocus product page
│   │       ├── legal/          # Legal documents
│   │       │   ├── privacy.md
│   │       │   └── terms.md
│   │       └── docs/
│   │           └── vision-focus/ # VisionFocus documentation
│   ├── styles/
│   │   └── custom.css          # Custom styles
│   └── content.config.ts
├── astro.config.mjs            # Astro configuration
├── package.json
└── tsconfig.json
```

## Development

### Prerequisites

- Node.js 20+
- pnpm 9+

### Setup

```bash
# Clone the repository
git clone git@github.com:machina-gg/vision-products.git
cd vision-products

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

The site will be available at `http://localhost:4321/vision-products/`

### Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start local dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm astro ...` | Run Astro CLI commands |

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

**Deployment workflow**:
1. Push to `main` branch
2. GitHub Actions builds the site (`pnpm build`)
3. Deploys to GitHub Pages
4. Site is live at [https://machina-gg.github.io/vision-products/](https://machina-gg.github.io/vision-products/)

## Content Management

### Adding a New Page

1. Create a new `.md` or `.mdx` file in `src/content/docs/`
2. Add frontmatter:
   ```yaml
   ---
   title: Page Title
   description: Page description
   ---
   ```
3. Write content in Markdown
4. Update sidebar in `astro.config.mjs` if needed

### Adding a New Product

1. Create a product page: `src/content/docs/product-name.mdx`
2. Create documentation directory: `src/content/docs/docs/product-name/`
3. Update sidebar configuration in `astro.config.mjs`
4. Add product card to homepage

## Brand Colors (VisionFocus)

CSS variables defined in `src/styles/custom.css`:

- Primary: `#14B8A6` (Teal)
- Success: `#06B6D4` (Cyan)
- Danger: `#F43F5E` (Rose)
- Premium: `#8B5CF6` (Purple)

## Contributing

This repository is managed by machina.gg. External contributions are not currently accepted.

## License

© 2026 machina.gg. All rights reserved.

## Links

- GitHub: [machina-gg](https://github.com/machina-gg)
- VisionFocus: [machina-gg/vision-focus](https://github.com/machina-gg/vision-focus)
- Starlight Documentation: [starlight.astro.build](https://starlight.astro.build/)

