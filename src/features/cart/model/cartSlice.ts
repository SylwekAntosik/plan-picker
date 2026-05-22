import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { catalogApi } from '@/features/catalog/api/catalogApi'
import { cartReducer as applyCartAction } from '@/lib/cart'
import type { CartQuantities, Product, ProductId } from '@/types/product'

export type CartState = {
  quantities: CartQuantities
}

const initialState: CartState = {
  quantities: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    syncProducts(state, action: PayloadAction<Product[]>) {
      state.quantities = applyCartAction(state.quantities, {
        type: 'SYNC_PRODUCTS',
        products: action.payload,
      })
    },
    incrementQuantity(state, action: PayloadAction<ProductId>) {
      state.quantities = applyCartAction(state.quantities, {
        type: 'INCREMENT',
        productId: action.payload,
      })
    },
    decrementQuantity(state, action: PayloadAction<ProductId>) {
      state.quantities = applyCartAction(state.quantities, {
        type: 'DECREMENT',
        productId: action.payload,
      })
    },
    resetCart(state) {
      state.quantities = initialState.quantities
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      catalogApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        state.quantities = applyCartAction(state.quantities, {
          type: 'SYNC_PRODUCTS',
          products: action.payload,
        })
      },
    )
  },
})

export const {
  syncProducts,
  incrementQuantity,
  decrementQuantity,
  resetCart,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer
