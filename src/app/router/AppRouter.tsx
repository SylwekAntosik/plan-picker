import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PageLoader } from '@/components/layout/PageLoader'

const ProductsPage = lazy(() =>
  import('@/pages/ProductsPage').then((module) => ({
    default: module.ProductsPage,
  })),
)

const CheckoutPage = lazy(() =>
  import('@/pages/CheckoutPage').then((module) => ({
    default: module.CheckoutPage,
  })),
)

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </Suspense>
  )
}
