import { describe, expect, it } from 'vitest'
import { fetchProducts, MOCK_PRODUCTS } from '@/api/products/products'

describe('fetchProducts', () => {
  it('returns mocked products', async () => {
    const products = await fetchProducts(0)

    expect(products).toHaveLength(MOCK_PRODUCTS.length)
    expect(products[0]).toMatchObject({
      id: 'standard',
      name: 'Standard',
      priceMonthly: 20,
    })
    expect(products).not.toBe(MOCK_PRODUCTS)
  })
})
