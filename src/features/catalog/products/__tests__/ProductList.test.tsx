import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ProductList } from '@/features/catalog/products/ProductList'

const products = [
  {
    id: 'standard' as const,
    name: 'Standard',
    description: 'Basic',
    priceMonthly: 20,
  },
]

describe('ProductList', () => {
  it('shows skeletons while loading', () => {
    render(
      <ProductList
        products={[]}
        quantities={{}}
        isLoading
        isError={false}
        error={null}
        onIncrement={() => undefined}
        onDecrement={() => undefined}
      />,
    )

    expect(screen.getByLabelText('Loading plans')).toBeInTheDocument()
  })

  it('renders products when loaded', () => {
    render(
      <ProductList
        products={products}
        quantities={{}}
        isLoading={false}
        isError={false}
        error={null}
        onIncrement={() => undefined}
        onDecrement={() => undefined}
      />,
    )

    expect(screen.getByText('Standard')).toBeInTheDocument()
  })

  it('renders products when loaded with explicit zero quantity', () => {
    render(
      <ProductList
        products={products}
        quantities={{ standard: 0 }}
        isLoading={false}
        isError={false}
        error={null}
        onIncrement={() => undefined}
        onDecrement={() => undefined}
      />,
    )

    expect(screen.getByText('Standard')).toBeInTheDocument()
  })

  it('shows an error message when loading fails', () => {
    render(
      <ProductList
        products={[]}
        quantities={{}}
        isLoading={false}
        isError
        error="Network error"
        onIncrement={() => undefined}
        onDecrement={() => undefined}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Network error')
  })

  it('shows a fallback error message when none is provided', () => {
    render(
      <ProductList
        products={[]}
        quantities={{}}
        isLoading={false}
        isError
        error={null}
        onIncrement={() => undefined}
        onDecrement={() => undefined}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load plans.')
  })

  it('calls quantity handlers from product cards', async () => {
    const user = userEvent.setup()
    const onIncrement = vi.fn()
    const onDecrement = vi.fn()

    render(
      <ProductList
        products={products}
        quantities={{ standard: 1 }}
        isLoading={false}
        isError={false}
        error={null}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />,
    )

    await user.click(
      screen.getByRole('button', { name: 'Increase Standard quantity' }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Decrease Standard quantity' }),
    )

    expect(onIncrement).toHaveBeenCalledWith('standard')
    expect(onDecrement).toHaveBeenCalledWith('standard')
  })
})
