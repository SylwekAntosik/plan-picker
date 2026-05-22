import type { Product, ProductId } from '@/api/products/types'
import { ProductCard } from '@/features/catalog/products/ProductCard'
import type { CartQuantities } from '@/features/cart/types'
import { Skeleton } from '@/components/ui/skeleton'

type ProductListProps = {
  products: Product[]
  quantities: CartQuantities
  isLoading: boolean
  isError: boolean
  error: string | null
  onIncrement: (productId: ProductId) => void
  onDecrement: (productId: ProductId) => void
}

function ProductListSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading plans">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  )
}

export function ProductList({
  products,
  quantities,
  isLoading,
  isError,
  error,
  onIncrement,
  onDecrement,
}: ProductListProps) {
  if (isLoading) {
    return <ProductListSkeleton />
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
      >
        {error ?? 'Failed to load plans.'}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={quantities[product.id] ?? 0}
          onIncrement={() => onIncrement(product.id)}
          onDecrement={() => onDecrement(product.id)}
        />
      ))}
    </div>
  )
}
