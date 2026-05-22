import type { CheckoutPageData } from '@/types/checkout'
import type { PaymentMethod } from '@/types/payment'
import type { SummaryItem } from '@/types/product'

export const SUBMIT_ORDER_DELAY_MS = 600

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit or debit card',
    description: 'Visa, Mastercard, Amex',
    badge: 'Popular',
  },
  {
    id: 'blik',
    name: 'BLIK',
    description: 'Pay with a code from your banking app',
    badge: 'Instant',
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    description: 'One-tap checkout on Apple devices',
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    description: 'Fast checkout with Google Wallet',
  },
]

export async function submitOrder(
  items: SummaryItem[],
  delayMs: number = SUBMIT_ORDER_DELAY_MS,
): Promise<CheckoutPageData> {
  if (items.length === 0) {
    throw new Error('Cart is empty')
  }

  await new Promise((resolve) => {
    setTimeout(resolve, delayMs)
  })

  const total = items.reduce((sum, item) => sum + item.lineTotal, 0)

  return {
    session: {
      orderId: `ord_${crypto.randomUUID().slice(0, 8)}`,
      redirectPath: '/checkout',
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    },
    items: structuredClone(items),
    total,
    paymentMethods: structuredClone(PAYMENT_METHODS),
  }
}
