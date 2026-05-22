import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ProductCard, ProductCardView } from '@/features/catalog/products/ProductCard'
import { renderWithProviders } from '@/test/utils/renderWithProviders'

const product = {
  id: 'pro' as const,
  name: 'Pro',
  description: 'More power',
  priceMonthly: 40,
}

describe('ProductCard', () => {
  it('renders product details and quantity controls', async () => {
    const user = userEvent.setup()
    const onIncrement = vi.fn()

    render(
      <ProductCardView
        product={product}
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={vi.fn()}
      />,
    )

    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('$40/mo')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Increase Pro quantity' }),
    )

    expect(onIncrement).toHaveBeenCalledOnce()
  })

  it('starts with zero quantity when cart is empty', () => {
    renderWithProviders(<ProductCard product={product} />)

    expect(screen.getByLabelText('Pro quantity')).toHaveTextContent('0')
  })
})
