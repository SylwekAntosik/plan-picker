import { MIN_QUANTITY } from '@/lib/constants'
import type {
  CartQuantities,
  Product,
  ProductId,
  SummaryItem,
} from '@/types/product'

export type CartAction =
  | { type: 'SYNC_PRODUCTS'; products: Product[] }
  | { type: 'INCREMENT'; productId: ProductId }
  | { type: 'DECREMENT'; productId: ProductId }

export function clampQuantity(quantity: number): number {
  return Math.max(MIN_QUANTITY, quantity)
}

export function createInitialQuantities(products: Product[]): CartQuantities {
  return Object.fromEntries(products.map((product) => [product.id, MIN_QUANTITY]))
}

export function buildSummaryItems(
  products: Product[],
  quantities: CartQuantities,
): SummaryItem[] {
  return products.flatMap((product) => {
    const quantity = quantities[product.id] ?? MIN_QUANTITY

    if (quantity <= MIN_QUANTITY) {
      return []
    }

    return [
      {
        product,
        quantity,
        lineTotal: product.priceMonthly * quantity,
      },
    ]
  })
}

export function calculateTotal(items: SummaryItem[]): number {
  return items.reduce((total, item) => total + item.lineTotal, 0)
}

export function cartReducer(
  state: CartQuantities,
  action: CartAction,
): CartQuantities {
  switch (action.type) {
    case 'SYNC_PRODUCTS':
      return action.products.reduce<CartQuantities>((next, product) => {
        next[product.id] = state[product.id] ?? MIN_QUANTITY
        return next
      }, {})
    case 'INCREMENT':
      return {
        ...state,
        [action.productId]: (state[action.productId] ?? MIN_QUANTITY) + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        [action.productId]: clampQuantity(
          (state[action.productId] ?? MIN_QUANTITY) - 1,
        ),
      }
    default:
      return state
  }
}
