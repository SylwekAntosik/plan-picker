import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ProductCard } from '@/components/ProductCard/ProductCard'

const product = {
  id: 'pro' as const,
  name: 'Pro',
  description: 'Więcej mocy',
  priceMonthly: 40,
}

describe('ProductCard', () => {
  it('renders product details and quantity controls', async () => {
    const user = userEvent.setup()
    const onIncrement = vi.fn()

    render(
      <ProductCard
        product={product}
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={vi.fn()}
      />,
    )

    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('$40/mies.')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Zwiększ ilość planu Pro' }),
    )

    expect(onIncrement).toHaveBeenCalledOnce()
  })
})
