import type { SummaryItem } from '@/api/products/types'

export type PaymentMethodId = 'card' | 'blik' | 'apple-pay' | 'google-pay'

export type PaymentMethod = {
  id: PaymentMethodId
  name: string
  description: string
  badge?: string
}

export type CheckoutSession = {
  orderId: string
  redirectPath: '/checkout'
  expiresAt: string
}

export type CheckoutPageData = {
  session: CheckoutSession
  items: SummaryItem[]
  total: number
  paymentMethods: PaymentMethod[]
}
