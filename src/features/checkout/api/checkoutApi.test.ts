import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setupStore } from '@/app/store'
import { checkoutApi } from '@/features/checkout/api/checkoutApi'
import * as checkoutService from '@/shared/api/checkout'

const summaryItem = {
  product: {
    id: 'pro' as const,
    name: 'Pro',
    description: 'Pro plan',
    priceMonthly: 40,
  },
  quantity: 1,
  lineTotal: 40,
}

describe('checkoutApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns an error message when submitOrder throws an Error', async () => {
    vi.spyOn(checkoutService, 'submitOrder').mockRejectedValue(
      new Error('Checkout unavailable'),
    )

    const store = setupStore()
    const result = await store.dispatch(
      checkoutApi.endpoints.submitOrder.initiate([summaryItem]),
    )

    expect(result.error).toEqual({ message: 'Checkout unavailable' })
  })

  it('returns a generic error message for non-Error failures', async () => {
    vi.spyOn(checkoutService, 'submitOrder').mockRejectedValue('timeout')

    const store = setupStore()
    const result = await store.dispatch(
      checkoutApi.endpoints.submitOrder.initiate([summaryItem]),
    )

    expect(result.error).toEqual({ message: 'Checkout failed. Try again.' })
  })
})
