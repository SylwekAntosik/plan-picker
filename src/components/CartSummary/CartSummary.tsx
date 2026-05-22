import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPriceMonthly } from '@/lib/format'
import type { SummaryItem } from '@/types/product'

type CartSummaryProps = {
  items: SummaryItem[]
  total: number
  isLoading?: boolean
}

function CartSummarySkeleton() {
  return (
    <div className="space-y-4" aria-label="Ładowanie podsumowania">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Separator />
      <Skeleton className="h-5 w-full" />
    </div>
  )
}

export function CartSummary({
  items,
  total,
  isLoading = false,
}: CartSummaryProps) {
  const isEmpty = items.length === 0

  return (
    <Card className="lg:sticky lg:top-8">
      <CardHeader>
        <CardTitle>Podsumowanie</CardTitle>
        <CardDescription>
          Wybrane plany i szacunkowy koszt miesięczny.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <CartSummarySkeleton />
        ) : (
          <>
            {isEmpty ? (
              <p className="text-sm text-muted-foreground">
                Nie wybrano żadnych planów.
              </p>
            ) : (
              <ul className="space-y-3" aria-label="Wybrane plany">
                {items.map(({ product, quantity, lineTotal }) => (
                  <li
                    key={product.id}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <span>
                      {product.name}{' '}
                      <span className="text-muted-foreground">× {quantity}</span>
                    </span>
                    <span className="shrink-0 tabular-nums font-medium">
                      {formatPriceMonthly(lineTotal)}/mies.
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Separator />

            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Razem</span>
              <span className="text-base font-semibold tabular-nums">
                {formatPriceMonthly(total)}/mies.
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
