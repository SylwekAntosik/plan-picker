import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import * as productsApi from '@/api/products'
import { useProducts } from '@/hooks/useProducts'

describe('useProducts', () => {
  it('loads products from the api', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue([
      {
        id: 'standard',
        name: 'Standard',
        description: 'Basic',
        priceMonthly: 20,
      },
    ])

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.products).toHaveLength(1)
    expect(result.current.isError).toBe(false)
  })

  it('surfaces api failures', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockRejectedValue(
      new Error('Network error'),
    )

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBe('Network error')
    expect(result.current.products).toHaveLength(0)
  })
})
