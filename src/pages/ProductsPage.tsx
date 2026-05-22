import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { CartSummary } from '@/components/CartSummary/CartSummary'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { PageLayout } from '@/components/layout/PageLayout'
import { ProductList } from '@/components/ProductList/ProductList'
import {
  decrementQuantity,
  incrementQuantity,
  selectCartTotal,
  selectHasSelectedPlans,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectSummaryItems,
} from '@/features/cart'
import { useGetProductsQuery } from '@/features/catalog'
import { useSubmitOrderMutation } from '@/features/checkout'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'

export function ProductsPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isError } = useGetProductsQuery()

  const products = useAppSelector(selectProducts)
  const quantities = useAppSelector((state) => state.cart.quantities)
  const isLoading = useAppSelector(selectProductsLoading)
  const productsError = useAppSelector(selectProductsError)
  const summaryItems = useAppSelector(selectSummaryItems)
  const total = useAppSelector(selectCartTotal)
  const hasSelectedPlans = useAppSelector(selectHasSelectedPlans)

  const [submitOrder, { isLoading: isCheckoutLoading, error: submitError }] =
    useSubmitOrderMutation()

  const handleCheckout = async () => {
    try {
      const checkoutData = await submitOrder(summaryItems).unwrap()
      navigate(checkoutData.session.redirectPath)
    } catch {
      // Mutation error is exposed via submitError.
    }
  }

  const checkoutErrorMessage = getErrorMessage(
    submitError,
    'Checkout failed. Try again.',
  )

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
          onIncrement={(productId) => dispatch(incrementQuantity(productId))}
          onDecrement={(productId) => dispatch(decrementQuantity(productId))}
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
          checkoutError={checkoutErrorMessage}
        />
      }
    />
  )
}
