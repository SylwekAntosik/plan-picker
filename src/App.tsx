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
      title="Wybierz plany"
      description="Dodaj tyle planów, ile potrzebujesz. Podsumowanie aktualizuje się na bieżąco."
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
