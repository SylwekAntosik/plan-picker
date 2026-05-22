import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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
})
