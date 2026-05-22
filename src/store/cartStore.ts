import { create } from 'zustand'
import { submitOrder as submitOrderRequest } from '@/api/checkout'
import { fetchProducts } from '@/api/products'
import {
  buildSummaryItems,
  calculateTotal,
  cartReducer,
} from '@/lib/cart'
import type { CheckoutPageData } from '@/types/checkout'
import type { PaymentMethodId } from '@/types/payment'
import type { CartQuantities, Product, ProductId } from '@/types/product'

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

type CartStore = {
  products: Product[]
  productsStatus: AsyncStatus
  productsError: string | null
  quantities: CartQuantities
  checkoutData: CheckoutPageData | null
  submitStatus: AsyncStatus
  submitError: string | null
  selectedPaymentMethodId: PaymentMethodId | null
  loadProducts: () => Promise<void>
  increment: (productId: ProductId) => void
  decrement: (productId: ProductId) => void
  submitOrder: () => Promise<CheckoutPageData>
  selectPaymentMethod: (paymentMethodId: PaymentMethodId) => void
  resetCheckout: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],
  productsStatus: 'idle',
  productsError: null,
  quantities: {},
  checkoutData: null,
  submitStatus: 'idle',
  submitError: null,
  selectedPaymentMethodId: null,

  loadProducts: async () => {
    set({ productsStatus: 'loading', productsError: null })

    try {
      const products = await fetchProducts()
      set({
        products,
        productsStatus: 'success',
        quantities: cartReducer(get().quantities, {
          type: 'SYNC_PRODUCTS',
          products,
        }),
      })
    } catch (cause: unknown) {
      set({
        productsStatus: 'error',
        productsError:
          cause instanceof Error ? cause.message : 'Failed to load plans.',
      })
    }
  },

  increment: (productId) => {
    set((state) => ({
      quantities: cartReducer(state.quantities, {
        type: 'INCREMENT',
        productId,
      }),
    }))
  },

  decrement: (productId) => {
    set((state) => ({
      quantities: cartReducer(state.quantities, {
        type: 'DECREMENT',
        productId,
      }),
    }))
  },

  submitOrder: async () => {
    const { products, quantities } = get()
    const items = buildSummaryItems(products, quantities)

    if (items.length === 0) {
      const error = new Error('Add at least one plan before checkout.')
      set({ submitStatus: 'error', submitError: error.message })
      throw error
    }

    set({ submitStatus: 'loading', submitError: null })

    try {
      const checkoutData = await submitOrderRequest(items)
      set({
        checkoutData,
        submitStatus: 'success',
        selectedPaymentMethodId: checkoutData.paymentMethods[0]?.id ?? null,
      })
      return checkoutData
    } catch (cause: unknown) {
      const message =
        cause instanceof Error ? cause.message : 'Checkout failed. Try again.'
      set({ submitStatus: 'error', submitError: message })
      throw cause
    }
  },

  selectPaymentMethod: (paymentMethodId) => {
    set({ selectedPaymentMethodId: paymentMethodId })
  },

  resetCheckout: () => {
    set({
      checkoutData: null,
      submitStatus: 'idle',
      submitError: null,
      selectedPaymentMethodId: null,
    })
  },
}))

export function selectSummaryItems(state: CartStore) {
  return buildSummaryItems(state.products, state.quantities)
}

export function selectCartTotal(state: CartStore) {
  return calculateTotal(selectSummaryItems(state))
}

export function selectHasSelectedPlans(state: CartStore) {
  return selectSummaryItems(state).length > 0
}
