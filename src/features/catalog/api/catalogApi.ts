import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { fetchProducts } from '@/shared/api/products'
import type { Product } from '@/types/product'

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
