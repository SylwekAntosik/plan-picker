import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { checkoutApi } from '@/features/checkout/api/checkoutApi'
import type { CheckoutPageData } from '@/types/checkout'
import type { PaymentMethodId } from '@/types/payment'

export type CheckoutState = {
  checkoutData: CheckoutPageData | null
  selectedPaymentMethodId: PaymentMethodId | null
}

const initialState: CheckoutState = {
  checkoutData: null,
  selectedPaymentMethodId: null,
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    selectPaymentMethod(state, action: PayloadAction<PaymentMethodId>) {
      state.selectedPaymentMethodId = action.payload
    },
    clearCheckout(state) {
      state.checkoutData = null
      state.selectedPaymentMethodId = null
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      checkoutApi.endpoints.submitOrder.matchFulfilled,
      (state, action) => {
        state.checkoutData = action.payload
        state.selectedPaymentMethodId =
          action.payload.paymentMethods[0]?.id ?? null
      },
    )
  },
})

export const { selectPaymentMethod, clearCheckout } = checkoutSlice.actions

export const checkoutReducer = checkoutSlice.reducer

export const selectCheckoutData = (state: { checkout: CheckoutState }) =>
  state.checkout.checkoutData

export const selectSelectedPaymentMethodId = (state: {
  checkout: CheckoutState
}) => state.checkout.selectedPaymentMethodId
