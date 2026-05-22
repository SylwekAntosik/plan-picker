import type { Product } from '@/types/product'

export const FETCH_DELAY_MS = 400

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Essential plan for individual users.',
    priceMonthly: 20,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'More power and higher limits for everyday work.',
    priceMonthly: 40,
  },
  {
    id: 'pro-plus',
    name: 'Pro+',
    description: 'Expanded capabilities for demanding projects.',
    priceMonthly: 60,
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    description: 'Full access with no compromises for teams and companies.',
    priceMonthly: 200,
  },
]

export async function fetchProducts(
  delayMs: number = FETCH_DELAY_MS,
): Promise<Product[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, delayMs)
  })

  return structuredClone(MOCK_PRODUCTS)
}
