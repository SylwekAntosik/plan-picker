import type { ProductId } from '@/api/products/types'

export type CartQuantities = Partial<Record<ProductId, number>>
