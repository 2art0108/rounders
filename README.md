# Rounders Pay by Bank

Static single-page checkout (bank selection → QR payment → result states).
No framework or bundler; `build.js` stages the page into `dist/` and bakes the
deployment settings into `<html data-*>` attributes.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Serves the source on http://localhost:3100 (mock payments on, dev panel visible) |
| `npm run build` | Production build → `dist/` (settings from env vars below) |
| `npm run build:demo` | Same, with `ROUNDERS_DEMO=1` |
| `npm run preview` | Serves `dist/` on http://localhost:3200 |

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Effect |
|---|---|
| `ROUNDERS_DEMO=1` | Demo deployment: mock payments + "Mock payments · dev" panel on the deployed URL. Never use for real payments. |
| `ROUNDERS_API_BASE` | `https://…` base URL of the payment backend. Real sessions; disables the mock (overrides `ROUNDERS_DEMO`). |
| `ROUNDERS_RETURN_URL` | `https://…` where "Done" sends the customer after a successful payment. |

With none set, the deployed page has no backend and shows "Couldn't start the payment" after Continue
(the mock only runs on localhost / `.test` hosts).

Backend contract (placeholder, see `HttpAPI` in `index.html`):
`POST /v1/payment_sessions` (with `Idempotency-Key`) → `{ id, qr_data, auth_url, expires_at }`,
`GET /v1/payment_sessions/:id` → `{ status }`.

## Vercel project settings

`vercel.json` already sets: Framework **Other**, Build `npm run build`, Output `dist`, no install step,
security headers and asset caching. The repo root is the project root — no Root Directory setting needed.

## Project layout

- `index.html`, `assets/` — the deployed page (only these go into `dist/`)
- `docs/DESIGN_REFERENCE.md` — Rounders design system reference (from rounders.solutions)
- `design/illustrations-src/` — original PNG illustrations (source for the WebP assets)

## External dependencies (CDN, pinned)

Google Fonts (Inter, Space Grotesk), `flag-icons@7.2.3` (jsDelivr), `qrcode-generator@1.4.4` (cdnjs).
