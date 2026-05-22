import type { PaymentMethod } from '@/types/payment'
import type { SummaryItem } from '@/types/product'

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
