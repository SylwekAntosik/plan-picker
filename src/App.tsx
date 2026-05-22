import { CartSummary } from '@/components/CartSummary/CartSummary'
import { PageLayout } from '@/components/layout/PageLayout'
import { ProductList } from '@/components/ProductList/ProductList'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'

export default function App() {
  const { products, isLoading, isError, error } = useProducts()
  const { quantities, summaryItems, total, increment, decrement } =
    useCart(products)

  return (
    <PageLayout
      title="Choose your plans"
      description="Add as many plans as you need. The summary updates in real time."
      products={
        <ProductList
          products={products}
          quantities={quantities}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onIncrement={increment}
          onDecrement={decrement}
        />
      }
      summary={<CartSummary items={summaryItems} total={total} isLoading={isLoading} />}
    />
  )
}
