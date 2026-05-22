import { ArrowLeft, Loader2, ShieldCheck } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  CheckoutStepper,
  OrderSummaryPanel,
  PaymentMethodSelector,
} from '@/features/checkout'
import { cn } from '@/lib/utils'
import { useCheckoutPage } from '@/pages/useCheckoutPage'

export function CheckoutPage() {
  const {
    checkoutData,
    selectedPaymentMethodId,
    selectedMethod,
    selectPayment,
  } = useCheckoutPage()

  if (!checkoutData) {
    return <Navigate to="/products" replace />
  }

  return (
    <PageLayout
      stepper={<CheckoutStepper currentStep="payment" />}
      title="Complete your purchase"
      description="Choose a payment method to finalize your subscription."
      products={
        <div className="space-y-6">
          <Link
            to="/products"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              '-ml-2 w-fit px-2',
            )}
          >
            <ArrowLeft aria-hidden="true" />
            Back to plans
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Payment method</CardTitle>
              <CardDescription>
                Select how you would like to pay each month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentMethodSelector
                methods={checkoutData.paymentMethods}
                selectedMethodId={selectedPaymentMethodId}
                onSelect={selectPayment}
              />
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardContent className="flex items-start gap-3 pt-6">
              <ShieldCheck
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <p className="text-sm font-medium">Secure checkout</p>
                <p className="text-sm text-muted-foreground">
                  Payments are encrypted. You can change or cancel your plans at
                  any time.
                </p>
              </div>
            </CardContent>
          </Card>

          <Button type="button" size="lg" className="w-full sm:w-auto" disabled>
            {selectedMethod ? (
              <>Pay with {selectedMethod.name}</>
            ) : (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Loading payment options...
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Payment processing is mocked for this demo.
          </p>
        </div>
      }
      summary={
        <OrderSummaryPanel
          items={checkoutData.items}
          total={checkoutData.total}
          orderId={checkoutData.session.orderId}
        />
      }
    />
  )
}
