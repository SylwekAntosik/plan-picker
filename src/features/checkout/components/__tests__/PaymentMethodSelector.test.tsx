import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { PaymentMethodSelector, PaymentMethodSelectorView } from '@/features/checkout/components/PaymentMethodSelector'
import { renderWithProviders } from '@/test/utils/renderWithProviders'

const methods = [
  {
    id: 'card' as const,
    name: 'Credit or debit card',
    description: 'Visa, Mastercard, Amex',
  },
  {
    id: 'blik' as const,
    name: 'BLIK',
    description: 'Pay with a code from your banking app',
    badge: 'Popular',
  },
]

describe('PaymentMethodSelector', () => {
  it('selects a payment method on click', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <PaymentMethodSelectorView
        methods={methods}
        selectedMethodId="card"
        onSelect={onSelect}
      />,
    )

    await user.click(screen.getByRole('radio', { name: /BLIK/i }))

    expect(onSelect).toHaveBeenCalledWith('blik')
  })

  it('renders optional badges', () => {
    render(
      <PaymentMethodSelectorView
        methods={methods}
        selectedMethodId="blik"
        onSelect={() => undefined}
      />,
    )

    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('renders an empty list when checkout data is missing', () => {
    renderWithProviders(<PaymentMethodSelector />)

    expect(
      screen.getByRole('radiogroup', { name: 'Payment methods' }),
    ).toBeEmptyDOMElement()
  })
})
