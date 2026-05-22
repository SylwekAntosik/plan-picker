import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import type { ProductId } from '@/api/products/types'
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
import { getErrorMessage } from '@/lib/getErrorMessage'

export function useProductsPage() {
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

  const increment = (productId: ProductId) => {
    dispatch(incrementQuantity(productId))
  }

  const decrement = (productId: ProductId) => {
    dispatch(decrementQuantity(productId))
  }

  const checkout = async () => {
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

  return {
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
  }
}
