import { describe, expect, it } from 'vitest'
import {
  buildSummaryItems,
  calculateTotal,
  cartReducer,
  clampQuantity,
  type CartAction,
} from '@/lib/cart'
import type { Product } from '@/types/product'

const products: Product[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Basic',
    priceMonthly: 20,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Pro plan',
    priceMonthly: 40,
  },
  {
    id: 'pro-plus',
    name: 'Pro+',
    description: 'Pro plus',
    priceMonthly: 60,
  },
]

describe('clampQuantity', () => {
  it('does not go below zero', () => {
    expect(clampQuantity(-1)).toBe(0)
    expect(clampQuantity(0)).toBe(0)
    expect(clampQuantity(3)).toBe(3)
  })
})

describe('buildSummaryItems', () => {
  it('treats missing quantities as zero', () => {
    const items = buildSummaryItems(products, {})

    expect(items).toHaveLength(0)
  })

  it('includes only products with quantity greater than zero', () => {
    const items = buildSummaryItems(products, {
      standard: 0,
      pro: 2,
      'pro-plus': 1,
    })

    expect(items).toHaveLength(2)
    expect(items[0]).toMatchObject({
      product: products[1],
      quantity: 2,
      lineTotal: 80,
    })
    expect(items[1]).toMatchObject({
      product: products[2],
      quantity: 1,
      lineTotal: 60,
    })
  })
})

describe('calculateTotal', () => {
  it('sums line totals', () => {
    const total = calculateTotal([
      {
        product: products[1],
        quantity: 2,
        lineTotal: 80,
      },
      {
        product: products[2],
        quantity: 1,
        lineTotal: 60,
      },
    ])

    expect(total).toBe(140)
  })
})

describe('cartReducer', () => {
  it('initializes quantities for synced products', () => {
    const state = cartReducer({}, { type: 'SYNC_PRODUCTS', products })

    expect(state).toEqual({
      standard: 0,
      pro: 0,
      'pro-plus': 0,
    })
  })

  it('preserves existing quantities when products resync', () => {
    let state = cartReducer({}, { type: 'SYNC_PRODUCTS', products })
    state = cartReducer(state, { type: 'INCREMENT', productId: 'pro' })

    state = cartReducer(state, { type: 'SYNC_PRODUCTS', products })

    expect(state.pro).toBe(1)
  })

  it('increments and decrements quantities without going below zero', () => {
    let state = cartReducer({}, { type: 'SYNC_PRODUCTS', products })

    state = cartReducer(state, { type: 'INCREMENT', productId: 'pro' })
    state = cartReducer(state, { type: 'INCREMENT', productId: 'pro' })
    expect(state.pro).toBe(2)

    state = cartReducer(state, { type: 'DECREMENT', productId: 'pro' })
    state = cartReducer(state, { type: 'DECREMENT', productId: 'pro' })
    state = cartReducer(state, { type: 'DECREMENT', productId: 'pro' })
    expect(state.pro).toBe(0)
  })

  it('handles quantity changes for products not yet synced', () => {
    let state = cartReducer({}, { type: 'INCREMENT', productId: 'pro' })
    expect(state.pro).toBe(1)

    state = cartReducer(state, { type: 'DECREMENT', productId: 'pro' })
    expect(state.pro).toBe(0)
  })

  it('does not decrement below zero for unknown products', () => {
    const state = cartReducer({}, { type: 'DECREMENT', productId: 'pro' })

    expect(state.pro).toBe(0)
  })

  it('throws for unsupported actions', () => {
    expect(() =>
      cartReducer({}, { type: 'UNKNOWN' } as CartAction),
    ).toThrow('Unhandled cart action')
  })
})
