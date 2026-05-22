import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { submitOrder as submitOrderRequest } from '@/shared/api/checkout'
import type { CheckoutPageData } from '@/types/checkout'
import type { SummaryItem } from '@/types/product'

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
