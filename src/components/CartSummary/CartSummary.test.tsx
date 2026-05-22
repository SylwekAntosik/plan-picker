import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CartSummary } from '@/components/CartSummary/CartSummary'

const product = {
  id: 'pro' as const,
  name: 'Pro',
  description: 'More power',
  priceMonthly: 40,
}

describe('CartSummary', () => {
  it('shows loading skeleton while products are loading', () => {
    render(<CartSummary items={[]} total={0} isLoading />)

    expect(screen.getByLabelText('Loading summary')).toBeInTheDocument()
    expect(
      screen.queryByText('No plans selected yet.'),
    ).not.toBeInTheDocument()
  })

  it('shows empty state when nothing is selected', () => {
    render(<CartSummary items={[]} total={0} />)

    expect(screen.getByText('No plans selected yet.')).toBeInTheDocument()
    expect(screen.getByText('$0/mo')).toBeInTheDocument()
  })

  it('shows selected items and total', () => {
    render(
      <CartSummary
        items={[
          {
            product,
            quantity: 2,
            lineTotal: 80,
          },
        ]}
        total={80}
      />,
    )

    expect(screen.getByText(/Pro/)).toBeInTheDocument()
    expect(screen.getByText('× 2')).toBeInTheDocument()
    expect(screen.getAllByText('$80/mo')).toHaveLength(2)
  })

  it('renders checkout action when handler is provided', async () => {
    const user = userEvent.setup()
    const onCheckout = vi.fn()

    render(
      <CartSummary
        items={[
          {
            product,
            quantity: 1,
            lineTotal: 40,
          },
        ]}
        total={40}
        onCheckout={onCheckout}
      />,
    )

    await user.click(
      screen.getByRole('button', { name: 'Continue to checkout' }),
    )

    expect(onCheckout).toHaveBeenCalledOnce()
  })

  it('shows checkout error and loading states', () => {
    render(
      <CartSummary
        items={[
          {
            product,
            quantity: 1,
            lineTotal: 40,
          },
        ]}
        total={40}
        onCheckout={() => undefined}
        checkoutError="Checkout unavailable"
        isCheckoutLoading
        isCheckoutDisabled
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Checkout unavailable')
    expect(
      screen.getByRole('button', { name: 'Processing...' }),
    ).toBeDisabled()
  })
})
