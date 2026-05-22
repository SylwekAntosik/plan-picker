import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as checkoutService from '@/shared/api/checkout'
import { setupStore } from '@/app/store'
import { checkoutApi } from '@/features/checkout/api/checkoutApi'
import {
  selectCheckoutData,
  selectSelectedPaymentMethodId,
} from '@/features/checkout/model/checkoutSlice'

const product = {
  id: 'pro' as const,
  name: 'Pro',
  description: 'Pro plan',
  priceMonthly: 40,
}

describe('checkout slice', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('stores checkout data after submitOrder succeeds', async () => {
    vi.spyOn(checkoutService, 'submitOrder').mockResolvedValue({
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

    const store = setupStore()

    await store.dispatch(
      checkoutApi.endpoints.submitOrder.initiate([
        {
          product,
          quantity: 1,
          lineTotal: 40,
        },
      ]),
    )

    const state = store.getState()
    expect(selectCheckoutData(state)?.session.orderId).toBe('ord_test')
    expect(selectSelectedPaymentMethodId(state)).toBe('card')
  })
})
