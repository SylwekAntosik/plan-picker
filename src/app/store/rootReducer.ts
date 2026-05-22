import { combineReducers } from '@reduxjs/toolkit'
import { cartReducer } from '@/features/cart/model/cartSlice'
import { catalogApi } from '@/features/catalog/api/catalogApi'
import { checkoutApi } from '@/features/checkout/api/checkoutApi'
import { checkoutReducer } from '@/features/checkout/model/checkoutSlice'

export const rootReducer = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
  [catalogApi.reducerPath]: catalogApi.reducer,
  [checkoutApi.reducerPath]: checkoutApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
