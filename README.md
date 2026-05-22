# Plan Picker

A React app for selecting subscription plans with a live cost summary.

## Features

- plan list with quantity controls (`+` / `−`)
- summary of selected plans and monthly total
- mock API with simulated network delay
- loading, error, and empty states

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Vitest + React Testing Library

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

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
├── api/          # data layer (mock fetch)
├── hooks/        # React logic (fetch, cart)
├── lib/          # pure functions (cart, formatting)
├── components/   # UI
└── types/        # domain types
```

## Testing

The project includes unit, component, and app-level smoke tests. CI runs lint, tests, and build on every push.
