import { PageLayout } from '@/components/layout/PageLayout'
import { CartSummary } from '@/features/cart'
import { ProductList } from '@/features/catalog'
import { CheckoutStepper } from '@/features/checkout'
import { useProductsPage } from '@/pages/useProductsPage'

export function ProductsPage() {
  const {
    products,
    quantities,
    isLoading,
    isError,
    productsError,
    summaryItems,
    total,
    hasSelectedPlans,
    isCheckoutLoading,
    checkoutErrorMessage,
    increment,
    decrement,
    checkout,
  } = useProductsPage()

  return (
    <PageLayout
      stepper={<CheckoutStepper currentStep="plans" />}
      title="Choose your plans"
      description="Add as many plans as you need. The summary updates in real time."
      products={
        <ProductList
          products={products}
          quantities={quantities}
          isLoading={isLoading}
          isError={isError}
          error={productsError}
          onIncrement={increment}
          onDecrement={decrement}
        />
      }
      summary={
        <CartSummary
          items={summaryItems}
          total={total}
          isLoading={isLoading}
          onCheckout={checkout}
          isCheckoutDisabled={!hasSelectedPlans}
          isCheckoutLoading={isCheckoutLoading}
          checkoutError={checkoutErrorMessage}
        />
      }
    />
  )
}
