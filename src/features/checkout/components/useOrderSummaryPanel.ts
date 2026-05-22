import { useAppSelector } from '@/app/store/hooks'
import { selectCheckoutData } from '@/features/checkout'

export function useOrderSummaryPanel() {
  const checkoutData = useAppSelector(selectCheckoutData)

  return {
    items: checkoutData?.items ?? [],
    total: checkoutData?.total ?? 0,
    orderId: checkoutData?.session.orderId,
  }
}
