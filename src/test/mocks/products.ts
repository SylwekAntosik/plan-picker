import { MOCK_PRODUCTS } from '@/api/products/products'

export { MOCK_PRODUCTS }

export const mockProProduct = MOCK_PRODUCTS[1]

export const mockCheckoutSession = {
  orderId: 'ord_test',
  redirectPath: '/checkout' as const,
  expiresAt: new Date().toISOString(),
}

export const mockPaymentMethods = [
  {
    id: 'card' as const,
    name: 'Credit or debit card',
    description: 'Visa, Mastercard, Amex',
  },
  {
    id: 'blik' as const,
    name: 'BLIK',
    description: 'Pay with a code from your banking app',
  },
]
