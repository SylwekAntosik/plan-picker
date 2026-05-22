import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MIN_QUANTITY } from '@/lib/constants'

type QuantityStepperProps = {
  productName: string
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
}

export function QuantityStepper({
  productName,
  quantity,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  const isDecrementDisabled = quantity <= MIN_QUANTITY

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label={`Decrease ${productName} quantity`}
        disabled={isDecrementDisabled}
        onClick={onDecrement}
      >
        <Minus aria-hidden="true" />
      </Button>
      <span
        className="min-w-8 text-center text-sm font-medium tabular-nums"
        role="status"
        aria-live="polite"
        aria-label={`${productName} quantity`}
      >
        {quantity}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label={`Increase ${productName} quantity`}
        onClick={onIncrement}
      >
        <Plus aria-hidden="true" />
      </Button>
    </div>
  )
}
