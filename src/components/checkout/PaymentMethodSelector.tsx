import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { PaymentMethod, PaymentMethodId } from '@/types/payment'

type PaymentMethodSelectorProps = {
  methods: PaymentMethod[]
  selectedMethodId: PaymentMethodId | null
  onSelect: (methodId: PaymentMethodId) => void
}

export function PaymentMethodSelector({
  methods,
  selectedMethodId,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="grid gap-3" role="radiogroup" aria-label="Payment methods">
      {methods.map((method) => {
        const isSelected = method.id === selectedMethodId

        return (
          <button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(method.id)}
            className={cn(
              'rounded-xl border bg-card p-4 text-left transition-all outline-none',
              'hover:border-primary/40 hover:shadow-sm',
              'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
              isSelected && 'border-primary ring-1 ring-primary/20 shadow-sm',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{method.name}</span>
                  {method.badge ? (
                    <Badge variant="secondary">{method.badge}</Badge>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
              <span
                className={cn(
                  'mt-1 size-4 shrink-0 rounded-full border',
                  isSelected
                    ? 'border-primary bg-primary shadow-[inset_0_0_0_3px_var(--background)]'
                    : 'border-border',
                )}
                aria-hidden="true"
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}
