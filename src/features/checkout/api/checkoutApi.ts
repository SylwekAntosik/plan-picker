import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { submitOrder as submitOrderRequest } from '@/api/checkout/checkout'
import type { CheckoutPageData } from '@/api/checkout/types'
import type { SummaryItem } from '@/api/products/types'

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    submitOrder: builder.mutation<CheckoutPageData, SummaryItem[]>({
      queryFn: async (items) => {
        try {
          const data = await submitOrderRequest(items)
          return { data }
        } catch (cause: unknown) {
          return {
            error: {
              message:
                cause instanceof Error
                  ? cause.message
                  : 'Checkout failed. Try again.',
            },
          }
        }
      },
    }),
  }),
})

export const { useSubmitOrderMutation } = checkoutApi
