export type PaymentMethodId = 'card' | 'blik' | 'apple-pay' | 'google-pay'

export type PaymentMethod = {
  id: PaymentMethodId
  name: string
  description: string
  badge?: string
}
