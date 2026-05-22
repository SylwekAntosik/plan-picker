import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { fetchProducts } from '@/api/products/products'
import type { Product } from '@/api/products/types'

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        try {
          const data = await fetchProducts()
          return { data }
        } catch (cause: unknown) {
          return {
            error: {
              message:
                cause instanceof Error
                  ? cause.message
                  : 'Failed to load plans.',
            },
          }
        }
      },
      providesTags: ['Products'],
    }),
  }),
})

export const { useGetProductsQuery } = catalogApi
