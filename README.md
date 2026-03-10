# UNICEF Crisis Intelligence Platform

Design-first Next.js prototype for an AI-powered humanitarian monitoring dashboard.

## Run

1. Install dependencies with `npm install`
2. Start the dev server with `npm run dev`
3. Open `http://localhost:3000`

## Deploy

### Vercel

1. Install Node.js 20 or use the version in [.nvmrc](/Users/eoinreddy/Documents/New%20project/.nvmrc)
2. Push this folder to a Git repository
3. Import the repository into Vercel
4. Vercel should detect `Next.js` automatically
5. Build command: `npm run build`
6. Output setting: default Next.js output

### Manual production run

1. Install dependencies with `npm install`
2. Build with `npm run build`
3. Start with `npm run start`

## Stack

- Next.js 14
- React 18
- Tailwind CSS

## Notes

- All crisis content is simulated.
- No backend is required.
- The app includes a landing page at `/` and a dashboard at `/dashboard`.
- `next.config.mjs` is set to `standalone` output for easier container or platform deployment.
