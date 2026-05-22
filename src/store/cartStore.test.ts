import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as checkoutApi from '@/api/checkout'
import * as productsApi from '@/api/products'
import {
  selectCartTotal,
  selectHasSelectedPlans,
  selectSummaryItems,
  useCartStore,
} from '@/store/cartStore'

const product = {
  id: 'pro' as const,
  name: 'Pro',
  description: 'Pro plan',
  priceMonthly: 40,
}

function resetStore() {
  useCartStore.setState({
    products: [],
    productsStatus: 'idle',
    productsError: null,
    quantities: {},
    checkoutData: null,
    submitStatus: 'idle',
    submitError: null,
    selectedPaymentMethodId: null,
  })
}

describe('cartStore', () => {
  beforeEach(() => {
    resetStore()
    vi.restoreAllMocks()
  })

  it('loads products into the store', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue([product])

    await useCartStore.getState().loadProducts()

    const state = useCartStore.getState()
    expect(state.products).toHaveLength(1)
    expect(state.productsStatus).toBe('success')
    expect(state.quantities.pro).toBe(0)
  })

  it('derives summary totals from selected quantities', () => {
    useCartStore.setState({
      products: [product],
      quantities: { pro: 2 },
    })

    const state = useCartStore.getState()
    expect(selectSummaryItems(state)).toHaveLength(1)
    expect(selectCartTotal(state)).toBe(80)
    expect(selectHasSelectedPlans(state)).toBe(true)
  })

  it('submits checkout data for selected plans', async () => {
    vi.spyOn(checkoutApi, 'submitOrder').mockResolvedValue({
      session: {
        orderId: 'ord_test',
        redirectPath: '/checkout',
        expiresAt: new Date().toISOString(),
      },
      items: [
        {
          product,
          quantity: 1,
          lineTotal: 40,
        },
      ],
      total: 40,
      paymentMethods: [
        {
          id: 'card',
          name: 'Credit or debit card',
          description: 'Visa, Mastercard, Amex',
        },
      ],
    })

    useCartStore.setState({
      products: [product],
      quantities: { pro: 1 },
    })

    const checkoutData = await useCartStore.getState().submitOrder()

    expect(checkoutData.session.orderId).toBe('ord_test')
    expect(useCartStore.getState().checkoutData?.total).toBe(40)
    expect(useCartStore.getState().selectedPaymentMethodId).toBe('card')
  })
})
