import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import type { ProductId } from '@/api/products/types'
import { decrementQuantity, incrementQuantity } from '@/features/cart'

export function useProductCard(productId: ProductId) {
  const dispatch = useAppDispatch()
  const quantity = useAppSelector(
    (state) => state.cart.quantities[productId] ?? 0,
  )

  return {
    quantity,
    increment: () => dispatch(incrementQuantity(productId)),
    decrement: () => dispatch(decrementQuantity(productId)),
  }
}
