import { API_DELAYS, delay } from '@/api/config'
import type { Product } from '@/api/products/types'

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
  delayMs: number = API_DELAYS.products,
): Promise<Product[]> {
  await delay(delayMs)

  return structuredClone(MOCK_PRODUCTS)
}
