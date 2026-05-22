import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import type { PaymentMethodId } from '@/api/checkout/types'
import {
  selectCheckoutData,
  selectPaymentMethod,
  selectSelectedPaymentMethodId,
} from '@/features/checkout'

export function usePaymentMethodSelector() {
  const dispatch = useAppDispatch()
  const checkoutData = useAppSelector(selectCheckoutData)
  const selectedMethodId = useAppSelector(selectSelectedPaymentMethodId)

  return {
    methods: checkoutData?.paymentMethods ?? [],
    selectedMethodId,
    selectPayment: (methodId: PaymentMethodId) => {
      dispatch(selectPaymentMethod(methodId))
    },
  }
}
