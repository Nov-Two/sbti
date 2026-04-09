# Nuxt Landing Template

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Use this template to build your own landing page with [Nuxt UI](https://ui.nuxt.com) quickly.

- [Live demo](https://landing-template.nuxt.dev/)
- [Documentation](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

<a href="https://landing-template.nuxt.dev/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ui.nuxt.com/assets/templates/nuxt/landing-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="https://ui.nuxt.com/assets/templates/nuxt/landing-light.png">
    <img alt="Nuxt Landing Template" src="https://ui.nuxt.com/assets/templates/nuxt/landing-light.png">
  </picture>
</a>

## Quick Start

```bash [Terminal]
npm create nuxt@latest -- -t ui/landing
```

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-name=sbti&repository-url=https%3A%2F%2Fgithub.com%2FNov-Two%2Fsbti.git&demo-image=https%3A%2F%2Fui.nuxt.com%2Fassets%2Ftemplates%2Fnuxt%2Flanding-dark.png&demo-url=https%3A%2F%2Flanding-template.nuxt.dev%2F&demo-title=Nuxt%20Landing%20Template&demo-description=A%20modern%20landing%20page%20template%20powered%20by%20Nuxt%20Content.)

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Code Quality (ESLint + Prettier)

This project uses:

- ESLint (Nuxt flat config + Airbnb base) for code quality
- Prettier for formatting (including Tailwind class sorting)
- Husky + lint-staged for pre-commit checks

### One-liners

```bash
pnpm format
pnpm lint
pnpm lint:fix
pnpm check
```

### VS Code (format on save)

The repo includes [.vscode/settings.json](./.vscode/settings.json) so formatting runs on save:

- Prettier formats files
- ESLint applies non-format fixes via `source.fixAll.eslint`

Recommended extensions:

- `dbaeumer.vscode-eslint`
- `esbenp.prettier-vscode`

### Pre-commit

After `pnpm install`, Husky installs Git hooks and `lint-staged` runs on every commit to:

- format staged files with Prettier
- fix & check staged files with ESLint

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.
