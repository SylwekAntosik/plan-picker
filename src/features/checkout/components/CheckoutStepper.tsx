import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type CheckoutStep = 'plans' | 'payment'

type CheckoutStepperProps = {
  currentStep: CheckoutStep
}

const steps = [
  { id: 'plans' as const, label: 'Plans' },
  { id: 'payment' as const, label: 'Payment' },
]

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <ol className="flex items-center gap-3" aria-label="Checkout progress">
      {steps.map((step, index) => {
        const isComplete = index < currentIndex
        const isCurrent = step.id === currentStep

        return (
          <li key={step.id} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex size-7 items-center justify-center rounded-full border text-xs font-semibold transition-colors',
                  isComplete && 'border-primary bg-primary text-primary-foreground',
                  isCurrent && 'border-primary text-primary',
                  !isComplete && !isCurrent && 'border-border text-muted-foreground',
                )}
              >
                {isComplete ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}
              </span>
              <span
                className={cn(
                  'text-sm font-medium',
                  isCurrent ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  'hidden h-px w-10 sm:block',
                  isComplete ? 'bg-primary' : 'bg-border',
                )}
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
