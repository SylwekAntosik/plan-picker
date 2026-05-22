import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import type { PaymentMethodId } from '@/api/checkout/types'
import {
  selectCheckoutData,
  selectPaymentMethod,
  selectSelectedPaymentMethodId,
} from '@/features/checkout'

export function useCheckoutPage() {
  const dispatch = useAppDispatch()
  const checkoutData = useAppSelector(selectCheckoutData)
  const selectedPaymentMethodId = useAppSelector(selectSelectedPaymentMethodId)

  const selectedMethod = checkoutData?.paymentMethods.find(
    (method) => method.id === selectedPaymentMethodId,
  )

  const selectPayment = (methodId: PaymentMethodId) => {
    dispatch(selectPaymentMethod(methodId))
  }

  return {
    checkoutData,
    selectedPaymentMethodId,
    selectedMethod,
    selectPayment,
  }
}
