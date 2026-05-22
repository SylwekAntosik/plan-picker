import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartSummary } from '@/components/CartSummary/CartSummary'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { PageLayout } from '@/components/layout/PageLayout'
import { ProductList } from '@/components/ProductList/ProductList'
import { useCartSummary, useHasSelectedPlans } from '@/hooks/useCartSummary'
import {
  useCartStore,
} from '@/store/cartStore'

export function ProductsPage() {
  const navigate = useNavigate()
  const products = useCartStore((state) => state.products)
  const quantities = useCartStore((state) => state.quantities)
  const productsStatus = useCartStore((state) => state.productsStatus)
  const productsError = useCartStore((state) => state.productsError)
  const submitStatus = useCartStore((state) => state.submitStatus)
  const submitError = useCartStore((state) => state.submitError)
  const loadProducts = useCartStore((state) => state.loadProducts)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)
  const submitOrder = useCartStore((state) => state.submitOrder)
  const hasSelectedPlans = useHasSelectedPlans()
  const { summaryItems, total } = useCartSummary()

  useEffect(() => {
    if (productsStatus === 'idle') {
      void loadProducts()
    }
  }, [loadProducts, productsStatus])

  const isLoading =
    productsStatus === 'loading' || productsStatus === 'idle'
  const isCheckoutLoading = submitStatus === 'loading'

  const handleCheckout = async () => {
    try {
      const checkoutData = await submitOrder()
      navigate(checkoutData.session.redirectPath)
    } catch {
      // Error state is stored in the cart store.
    }
  }

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
          isError={productsStatus === 'error'}
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
          onCheckout={handleCheckout}
          isCheckoutDisabled={!hasSelectedPlans}
          isCheckoutLoading={isCheckoutLoading}
          checkoutError={submitError}
        />
      }
    />
  )
}
