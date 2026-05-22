import { useMemo } from 'react'
import { buildSummaryItems, calculateTotal } from '@/lib/cart'
import { useCartStore } from '@/store/cartStore'

export function useCartSummary() {
  const products = useCartStore((state) => state.products)
  const quantities = useCartStore((state) => state.quantities)

  return useMemo(() => {
    const summaryItems = buildSummaryItems(products, quantities)

    return {
      summaryItems,
      total: calculateTotal(summaryItems),
    }
  }, [products, quantities])
}

export function useHasSelectedPlans() {
  const products = useCartStore((state) => state.products)
  const quantities = useCartStore((state) => state.quantities)

  return useMemo(
    () => buildSummaryItems(products, quantities).length > 0,
    [products, quantities],
  )
}
