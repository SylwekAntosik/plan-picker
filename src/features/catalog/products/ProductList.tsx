import type { Product } from '@/api/products/types'
import { ProductCard, ProductCardView } from '@/features/catalog/products/ProductCard'
import { useProductList } from '@/features/catalog/products/useProductList'
import { Skeleton } from '@/components/ui/skeleton'

function ProductListSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading plans">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  )
}

export function ProductList() {
  const { products, isLoading, isError, error } = useProductList()

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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export type ProductListViewProps = {
  products: Product[]
  isLoading: boolean
  isError: boolean
  error: string | null
}

export function ProductListView({
  products,
  isLoading,
  isError,
  error,
}: ProductListViewProps) {
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
        <ProductCardView
          key={product.id}
          product={product}
          quantity={0}
          onIncrement={() => undefined}
          onDecrement={() => undefined}
        />
      ))}
    </div>
  )
}
