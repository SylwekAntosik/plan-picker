import { PageLayout } from '@/components/layout/PageLayout'
import { CartSummary } from '@/features/cart/components/CartSummary'
import { ProductList } from '@/features/catalog/products/ProductList'
import { CheckoutStepper } from '@/features/checkout/components/CheckoutStepper'

export function ProductsPage() {
  return (
    <PageLayout
      stepper={<CheckoutStepper currentStep="plans" />}
      title="Choose your plans"
      description="Add as many plans as you need. The summary updates in real time."
      products={<ProductList />}
      summary={<CartSummary />}
    />
  )
}
