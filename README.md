# Plan Picker

A React SPA for selecting subscription plans, reviewing an order summary, and completing checkout with payment method selection.

## Features

- `/products` — plan list with quantity controls (`+` / `−`)
- live order summary with monthly total
- checkout submit via mock API
- `/checkout` — payment method selection (card, BLIK, Apple Pay, Google Pay)
- loading, error, and empty states
- client-side routing with shared cart state

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Zustand
- Tailwind CSS + shadcn/ui
- Vitest + React Testing Library

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` and redirects to `/products`.

## Routes

| Route | Description |
|-------|-------------|
| `/` | redirects to `/products` |
| `/products` | choose plans and continue to checkout |
| `/checkout` | select a payment method for the current order |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | start the dev server |
| `npm run build` | production build |
| `npm run preview` | preview the production build |
| `npm run test` | run tests in watch mode |
| `npm run test:run` | run tests once |
| `npm run test:coverage` | run tests with coverage |
| `npm run lint` | run ESLint |

## Architecture

```
src/
├── api/          # products + checkout mock APIs
├── store/        # Zustand cart/checkout state
├── pages/        # route-level views
├── routes/       # React Router setup
├── lib/          # pure functions (cart, formatting)
├── components/   # UI building blocks
└── types/        # domain types
```

## Testing

The project includes unit, store, component, routing, and checkout flow tests. CI runs lint, tests, and build on every push.
