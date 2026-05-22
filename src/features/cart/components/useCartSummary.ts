import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/app/store/hooks'
import {
  selectCartTotal,
  selectHasSelectedPlans,
  selectProductsLoading,
  selectSummaryItems,
} from '@/features/cart'
import { useGetProductsQuery } from '@/features/catalog/api/catalogApi'
import { useSubmitOrderMutation } from '@/features/checkout'
import { getErrorMessage } from '@/lib/getErrorMessage'

export function useCartSummary() {
  const navigate = useNavigate()
  useGetProductsQuery()

  const items = useAppSelector(selectSummaryItems)
  const total = useAppSelector(selectCartTotal)
  const isLoading = useAppSelector(selectProductsLoading)
  const hasSelectedPlans = useAppSelector(selectHasSelectedPlans)

  const [submitOrder, { isLoading: isCheckoutLoading, error: submitError }] =
    useSubmitOrderMutation()

  const checkout = async () => {
    try {
      const checkoutData = await submitOrder(items).unwrap()
      navigate(checkoutData.session.redirectPath)
    } catch {
      // Mutation error is exposed via checkoutError.
    }
  }

  const checkoutError = getErrorMessage(
    submitError,
    'Checkout failed. Try again.',
  )

  return {
    items,
    total,
    isLoading,
    isCheckoutDisabled: !hasSelectedPlans,
    isCheckoutLoading,
    checkoutError,
    checkout,
  }
}
