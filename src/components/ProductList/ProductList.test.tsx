import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductList } from '@/components/ProductList/ProductList'

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
})
