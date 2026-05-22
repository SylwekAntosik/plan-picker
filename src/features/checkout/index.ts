export { checkoutApi, useSubmitOrderMutation } from './api/checkoutApi'
export {
  checkoutReducer,
  checkoutSlice,
  clearCheckout,
  selectCheckoutData,
  selectPaymentMethod,
  selectSelectedPaymentMethodId,
} from './model/checkoutSlice'
export type { CheckoutState } from './model/checkoutSlice'
