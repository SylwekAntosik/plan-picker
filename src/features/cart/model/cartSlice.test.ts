import { describe, expect, it, vi, beforeEach } from 'vitest'
import { setupStore } from '@/app/store'
import { catalogApi } from '@/features/catalog/api/catalogApi'
import * as productsService from '@/shared/api/products'
import {
  decrementQuantity,
  incrementQuantity,
  syncProducts,
} from '@/features/cart/model/cartSlice'
import {
  selectCartTotal,
  selectHasSelectedPlans,
  selectSummaryItems,
} from '@/features/cart/model/selectors'

const product = {
  id: 'pro' as const,
  name: 'Pro',
  description: 'Pro plan',
  priceMonthly: 40,
}

describe('cart slice and selectors', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('syncs product quantities and updates totals', async () => {
    vi.spyOn(productsService, 'fetchProducts').mockResolvedValue([product])

    const store = setupStore()
    await store.dispatch(catalogApi.endpoints.getProducts.initiate())
    store.dispatch(syncProducts([product]))
    store.dispatch(incrementQuantity('pro'))
    store.dispatch(incrementQuantity('pro'))

    const state = store.getState()
    expect(state.cart.quantities.pro).toBe(2)
    expect(selectSummaryItems(state)).toHaveLength(1)
    expect(selectCartTotal(state)).toBe(80)
    expect(selectHasSelectedPlans(state)).toBe(true)
  })

  it('does not decrement below zero', () => {
    const store = setupStore()

    store.dispatch(syncProducts([product]))
    store.dispatch(decrementQuantity('pro'))

    expect(store.getState().cart.quantities.pro ?? 0).toBe(0)
  })
})
