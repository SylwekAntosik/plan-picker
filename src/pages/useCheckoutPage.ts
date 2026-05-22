import { useAppSelector } from '@/app/store/hooks'
import {
  selectCheckoutData,
  selectSelectedPaymentMethodId,
} from '@/features/checkout'

export function useCheckoutPage() {
  const checkoutData = useAppSelector(selectCheckoutData)
  const selectedPaymentMethodId = useAppSelector(selectSelectedPaymentMethodId)

  const selectedMethod = checkoutData?.paymentMethods.find(
    (method) => method.id === selectedPaymentMethodId,
  )

  return {
    checkoutData,
    selectedMethod,
  }
}
