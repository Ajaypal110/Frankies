# Frankie's Frontend

Production-ready React/Vite frontend for the Frankie's site.

## Environment variables

Copy `.env.example` to `.env.local` for local work.

```bash
cp .env.example .env.local
```

Required values:

- `VITE_WP_BASE_URL`: Public base URL of the WordPress backend, for example `https://cms.example.com`

Optional values:

- `VITE_ORDER_BASE_URL`: Override for the Toast ordering URL

## Local development

```bash
npm install
npm run dev
```

The app defaults to `http://localhost:8884` for WordPress only in local development. Production should always set `VITE_WP_BASE_URL`.

## Vercel deployment

Set the Vercel project root to `frontend/`.

Add these environment variables in Vercel:

- `VITE_WP_BASE_URL`
- `VITE_ORDER_BASE_URL` if you want to override the current Toast URL

Your WordPress API must also be publicly reachable from the Vercel domain and allow cross-origin requests if it is hosted on a different origin.

This repo already includes:

- `vercel.json` for SPA rewrites and asset caching
- a client config module that removes hardcoded localhost URLs
- a build path that does not depend on Tailwind/PostCSS integration

## Build

```bash
npm run build
```
