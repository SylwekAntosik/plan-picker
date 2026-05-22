import type { ReactNode } from 'react'

type PageLayoutProps = {
  title: string
  description: string
  products: ReactNode
  summary: ReactNode
}

export function PageLayout({
  title,
  description,
  products,
  summary,
}: PageLayoutProps) {
  return (
    <div className="mx-auto min-h-svh w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
        <section aria-label="Lista planów">{products}</section>
        <aside aria-label="Podsumowanie zamówienia">{summary}</aside>
      </div>
    </div>
  )
}
