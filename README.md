# Plan Picker

A scalable React SPA for selecting subscription plans, reviewing an order summary, and completing checkout.

## Features

- `/products` — plan list with quantity controls (`+` / `−`)
- live order summary with monthly total
- checkout submit via mock API
- `/checkout` — payment method selection (card, BLIK, Apple Pay, Google Pay)
- loading, error, and empty states
- feature-based architecture ready for large-scale growth

## Stack

- React 19 + TypeScript
- Vite
- Redux Toolkit + RTK Query
- React Router
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

## Architecture

```
src/
├── app/                 # store, providers, router
├── features/
│   ├── cart/            # cart slice + memoized selectors
│   ├── catalog/         # products RTK Query API
│   └── checkout/        # checkout slice + submit mutation
├── pages/               # route-level screens
├── shared/api/          # mock service layer (swappable for real backend)
├── components/          # reusable UI building blocks
├── lib/                 # pure domain logic
└── types/               # shared TypeScript contracts
```

### State management

| Layer | Responsibility |
|-------|----------------|
| **RTK Query** | server state: products fetch, checkout submit |
| **Redux slices** | client state: cart quantities, checkout session |
| **lib/** | pure functions: cart math, formatting |
| **selectors** | memoized derived data (`createSelector`) |

Features expose a public API via `features/*/index.ts` so other modules depend on stable boundaries, not internal files.

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

## Testing

Tests cover pure logic, Redux slices/selectors, RTK Query endpoints, components, routing, and checkout flow. Coverage is enforced at **90%** minimum for statements, branches, functions, and lines via `npm run test:coverage`. CI runs lint, coverage tests, and build on every push.
