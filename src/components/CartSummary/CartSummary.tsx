import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { formatPriceMonthly } from '@/lib/format'
import type { SummaryItem } from '@/types/product'

type CartSummaryProps = {
  items: SummaryItem[]
  total: number
  isLoading?: boolean
  onCheckout?: () => void
  isCheckoutDisabled?: boolean
  isCheckoutLoading?: boolean
  checkoutError?: string | null
}

function CartSummarySkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading summary">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Separator />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export function CartSummary({
  items,
  total,
  isLoading = false,
  onCheckout,
  isCheckoutDisabled = false,
  isCheckoutLoading = false,
  checkoutError = null,
}: CartSummaryProps) {
  const isEmpty = items.length === 0

  return (
    <Card className="lg:sticky lg:top-8">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <CardDescription>
          Selected plans and estimated monthly cost.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <CartSummarySkeleton />
        ) : (
          <>
            {isEmpty ? (
              <p className="text-sm text-muted-foreground">
                No plans selected yet.
              </p>
            ) : (
              <ul className="space-y-3" aria-label="Selected plans">
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
                      {formatPriceMonthly(lineTotal)}/mo
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Separator />

            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Total</span>
              <span className="text-base font-semibold tabular-nums">
                {formatPriceMonthly(total)}/mo
              </span>
            </div>
          </>
        )}
      </CardContent>

      {!isLoading && onCheckout ? (
        <CardFooter className="flex-col items-stretch gap-2 border-t bg-muted/30">
          {checkoutError ? (
            <p className="text-sm text-destructive" role="alert">
              {checkoutError}
            </p>
          ) : null}
          <Button
            type="button"
            size="lg"
            className="w-full"
            disabled={isCheckoutDisabled || isCheckoutLoading}
            onClick={onCheckout}
          >
            {isCheckoutLoading ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Processing...
              </>
            ) : (
              'Continue to checkout'
            )}
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}
