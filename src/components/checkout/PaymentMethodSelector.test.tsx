import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector'

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
      <PaymentMethodSelector
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
      <PaymentMethodSelector
        methods={methods}
        selectedMethodId="blik"
        onSelect={() => undefined}
      />,
    )

    expect(screen.getByText('Popular')).toBeInTheDocument()
  })
})
