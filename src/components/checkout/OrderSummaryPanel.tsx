import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPriceMonthly } from '@/lib/format'
import type { SummaryItem } from '@/types/product'

type OrderSummaryPanelProps = {
  items: SummaryItem[]
  total: number
  orderId?: string
}

export function OrderSummaryPanel({
  items,
  total,
  orderId,
}: OrderSummaryPanelProps) {
  return (
    <Card className="lg:sticky lg:top-8">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
        <CardDescription>
          {orderId
            ? `Order ${orderId} · monthly billing`
            : 'Selected plans and estimated monthly cost.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <Separator />

        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Total</span>
          <span className="text-base font-semibold tabular-nums">
            {formatPriceMonthly(total)}/mo
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
