import { useAppSelector } from '@/app/store/hooks'
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from '@/features/cart'
import { useGetProductsQuery } from '@/features/catalog/api/catalogApi'

export function useProductList() {
  const { isError } = useGetProductsQuery()

  const products = useAppSelector(selectProducts)
  const isLoading = useAppSelector(selectProductsLoading)
  const error = useAppSelector(selectProductsError)

  return {
    products,
    isLoading,
    isError,
    error,
  }
}
