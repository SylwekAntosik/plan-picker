import type { Product } from '@/types/product'

export const FETCH_DELAY_MS = 400

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Podstawowy plan dla indywidualnych użytkowników.',
    priceMonthly: 20,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Więcej mocy i wyższe limity dla regularnej pracy.',
    priceMonthly: 40,
  },
  {
    id: 'pro-plus',
    name: 'Pro+',
    description: 'Rozszerzone możliwości dla wymagających projektów.',
    priceMonthly: 60,
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    description: 'Pełen dostęp bez kompromisów dla zespołów i firm.',
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
