import { useEffect, useReducer, useMemo } from 'react'
import {
  buildSummaryItems,
  calculateTotal,
  cartReducer,
} from '@/lib/cart'
import type { Product, ProductId } from '@/types/product'

export function useCart(products: Product[]) {
  const [quantities, dispatch] = useReducer(cartReducer, {})

  useEffect(() => {
    if (products.length > 0) {
      dispatch({ type: 'SYNC_PRODUCTS', products })
    }
  }, [products])

  const summaryItems = useMemo(
    () => buildSummaryItems(products, quantities),
    [products, quantities],
  )

  const total = useMemo(() => calculateTotal(summaryItems), [summaryItems])

  return {
    quantities,
    summaryItems,
    total,
    increment: (productId: ProductId) =>
      dispatch({ type: 'INCREMENT', productId }),
    decrement: (productId: ProductId) =>
      dispatch({ type: 'DECREMENT', productId }),
  }
}
