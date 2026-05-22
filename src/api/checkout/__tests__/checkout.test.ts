import { describe, expect, it } from 'vitest'
import { submitOrder } from '@/api/checkout/checkout'

describe('submitOrder', () => {
  it('returns checkout page data for non-empty carts', async () => {
    const result = await submitOrder(
      [
        {
          product: {
            id: 'pro',
            name: 'Pro',
            description: 'Pro plan',
            priceMonthly: 40,
          },
          quantity: 2,
          lineTotal: 80,
        },
      ],
      0,
    )

    expect(result.session.redirectPath).toBe('/checkout')
    expect(result.total).toBe(80)
    expect(result.paymentMethods.length).toBeGreaterThan(0)
    expect(result.paymentMethods.some((method) => method.id === 'blik')).toBe(
      true,
    )
  })

  it('rejects empty carts', async () => {
    await expect(submitOrder([], 0)).rejects.toThrow('Cart is empty')
  })
})
