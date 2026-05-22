import { Skeleton } from '@/components/ui/skeleton'

export function PageLoader() {
  return (
    <div
      className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8"
      aria-label="Loading page"
    >
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96 max-w-full" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  )
}
