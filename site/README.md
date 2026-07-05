# NexTex AI — Digital Flagship

Scroll-cinematic marketing site for **NexTex AI** — machine intelligence for
sustainable textile manufacturing. Next.js 15 · TypeScript · Tailwind CSS v4 ·
Lenis smooth scroll · Framer Motion. All imagery and footage generated
specifically for NexTex AI with Higgsfield (no stock, no placeholders), sliced
into canvas scroll sequences with ffmpeg.

## Run locally

```bash
export PATH="$HOME/.local/node/bin:$PATH"   # portable Node 22 installed at ~/.local/node
cd ~/Desktop/nextex-ai/site
npm run dev                                  # → http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

## Deploy

Vercel-ready: `vercel deploy` from this directory (static-prerendered single route).

## Structure

- `src/app` — layout (SEO, fonts), page assembly, global design tokens
- `src/components` — `ScrollScrub` canvas frame-sequence engine, Lenis provider, Nav, Footer, Reveal
- `src/sections` — one file per site section
- `src/lib/assets.ts` — generated frame-sequence manifest
- `public/frames/{hero,twin}` — Higgsfield clips sliced to JPEG sequences
- `public/img` — generated stills (production stages, macro fabric, dashboards, report)

Source generations (PNG masters + MP4 clips) live in `../assets`.
