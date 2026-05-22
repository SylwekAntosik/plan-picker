import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OrderSummaryPanel, OrderSummaryPanelView } from '@/features/checkout/components/OrderSummaryPanel'
import { renderWithProviders } from '@/test/utils/renderWithProviders'

const product = {
  id: 'pro' as const,
  name: 'Pro',
  description: 'Pro plan',
  priceMonthly: 40,
}

describe('OrderSummaryPanel', () => {
  it('shows a generic description when order id is missing', () => {
    render(
      <OrderSummaryPanelView
        items={[{ product, quantity: 1, lineTotal: 40 }]}
        total={40}
      />,
    )

    expect(
      screen.getByText('Selected plans and estimated monthly cost.'),
    ).toBeInTheDocument()
  })

  it('shows order id in the description when provided', () => {
    render(
      <OrderSummaryPanelView
        items={[{ product, quantity: 1, lineTotal: 40 }]}
        total={40}
        orderId="ord_test"
      />,
    )

    expect(
      screen.getByText('Order ord_test · monthly billing'),
    ).toBeInTheDocument()
  })

  it('renders empty summary when checkout data is missing', () => {
    renderWithProviders(<OrderSummaryPanel />)

    expect(
      screen.getByText('Selected plans and estimated monthly cost.'),
    ).toBeInTheDocument()
    expect(screen.getByText('$0/mo')).toBeInTheDocument()
  })
})
