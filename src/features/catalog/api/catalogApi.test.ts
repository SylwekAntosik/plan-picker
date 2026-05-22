import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setupStore } from '@/app/store'
import { catalogApi } from '@/features/catalog/api/catalogApi'
import * as productsService from '@/shared/api/products'

describe('catalogApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns an error message when fetchProducts throws an Error', async () => {
    vi.spyOn(productsService, 'fetchProducts').mockRejectedValue(
      new Error('Network down'),
    )

    const store = setupStore()
    const result = await store.dispatch(
      catalogApi.endpoints.getProducts.initiate(),
    )

    expect(result.error).toEqual({ message: 'Network down' })
  })

  it('returns a generic error message for non-Error failures', async () => {
    vi.spyOn(productsService, 'fetchProducts').mockRejectedValue('offline')

    const store = setupStore()
    const result = await store.dispatch(
      catalogApi.endpoints.getProducts.initiate(),
    )

    expect(result.error).toEqual({ message: 'Failed to load plans.' })
  })
})
