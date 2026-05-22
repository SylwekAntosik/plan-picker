import { Navigate, Route, Routes } from 'react-router-dom'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { ProductsPage } from '@/pages/ProductsPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  )
}
