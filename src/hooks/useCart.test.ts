import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useCart } from '@/hooks/useCart'
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
]

describe('useCart', () => {
  it('builds summary and total from selected quantities', async () => {
    const { result } = renderHook(() => useCart(products))

    await waitFor(() => {
      expect(result.current.quantities.standard).toBe(0)
    })

    act(() => {
      result.current.increment('pro')
      result.current.increment('pro')
    })

    expect(result.current.summaryItems).toHaveLength(1)
    expect(result.current.summaryItems[0]).toMatchObject({
      quantity: 2,
      lineTotal: 80,
    })
    expect(result.current.total).toBe(80)
  })
})
