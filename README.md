# Plan Picker

Prosta aplikacja React do wyboru planów subskrypcyjnych z podsumowaniem kosztów.

## Funkcje

- lista planów z kontrolką ilości (`+` / `−`)
- podsumowanie wybranych planów i sumy miesięcznej
- mock API z opóźnieniem sieciowym
- stany loading / error / empty

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Vitest + React Testing Library

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja domyślnie startuje pod `http://localhost:5173`.

## Skrypty

| Komenda | Opis |
|---------|------|
| `npm run dev` | serwer developerski |
| `npm run build` | build produkcyjny |
| `npm run preview` | podgląd buildu |
| `npm run test` | testy w trybie watch |
| `npm run test:run` | testy jednorazowo |
| `npm run test:coverage` | testy z coverage |
| `npm run lint` | ESLint |

## Architektura

```
src/
├── api/          # warstwa danych (mock fetch)
├── hooks/        # logika React (fetch, koszyk)
├── lib/          # pure functions (koszyk, formatowanie)
├── components/   # UI
└── types/        # typy domenowe
```

## Testy

Projekt zawiera testy jednostkowe, komponentowe i smoke test całej aplikacji. CI uruchamia lint, testy i build przy każdym pushu.
