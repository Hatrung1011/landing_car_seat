# Nhật Hạ Store — Landing

Landing page ghế ô tô trẻ em cao cấp, xây dựng với **React 19 + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui + [Joly UI](https://www.jolyui.dev/docs/introduction)**.

## Tech stack

- React 19, React Router 7
- TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- shadcn/ui + Joly UI components (highlight-text, rainbow-button, bento-grid, number-counter, vercel-tabs)
- Motion (animations)

## Development

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build
npm run preview
```

Docker (production):

```bash
docker build -t landing-car-seat .
```

Environment: copy `.env.example` → `.env` and set `VITE_API_BASE` if needed.

## Branch

Feature work: `feat/joly-ui-redesign`
