import type { Product } from '@/api/products/types'
import { QuantityStepper } from '@/features/catalog/products/QuantityStepper'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatPriceMonthly } from '@/lib/format'

type ProductCardProps = {
  product: Product
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
}

export function ProductCard({
  product,
  quantity,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-sm">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0 tabular-nums">
            {formatPriceMonthly(product.priceMonthly)}/mo
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="justify-end border-t-0 bg-transparent">
        <QuantityStepper
          productName={product.name}
          quantity={quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </CardFooter>
    </Card>
  )
}
