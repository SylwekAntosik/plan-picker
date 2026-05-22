import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CartSummary } from '@/components/CartSummary/CartSummary'

const product = {
  id: 'pro' as const,
  name: 'Pro',
  description: 'Więcej mocy',
  priceMonthly: 40,
}

describe('CartSummary', () => {
  it('shows empty state when nothing is selected', () => {
    render(<CartSummary items={[]} total={0} />)

    expect(screen.getByText('Nie wybrano żadnych planów.')).toBeInTheDocument()
    expect(screen.getByText('$0/mies.')).toBeInTheDocument()
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
    expect(screen.getAllByText('$80/mies.')).toHaveLength(2)
  })
})
