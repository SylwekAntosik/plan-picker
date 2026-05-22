import { useEffect, useState } from 'react'
import { fetchProducts } from '@/api/products'
import type { Product } from '@/types/product'

type ProductsStatus = 'loading' | 'success' | 'error'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<ProductsStatus>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchProducts()
      .then((data) => {
        if (cancelled) {
          return
        }

        setProducts(data)
        setStatus('success')
      })
      .catch((cause: unknown) => {
        if (cancelled) {
          return
        }

        setError(
          cause instanceof Error
            ? cause.message
            : 'Failed to load plans.',
        )
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return {
    products,
    status,
    error,
    isLoading: status === 'loading',
    isError: status === 'error',
  }
}
