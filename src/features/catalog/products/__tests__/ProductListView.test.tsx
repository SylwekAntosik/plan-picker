import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MOCK_PRODUCTS } from '@/api/products/products'
import { ProductListView } from '@/features/catalog/products/ProductList'

describe('ProductListView', () => {
  it('shows skeletons while loading', () => {
    render(
      <ProductListView
        products={[]}
        isLoading
        isError={false}
        error={null}
      />,
    )

    expect(screen.getByLabelText('Loading plans')).toBeInTheDocument()
  })

  it('shows an error message when loading fails', () => {
    render(
      <ProductListView
        products={[]}
        isLoading={false}
        isError
        error="Network error"
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Network error')
  })

  it('shows a default error message when error is missing', () => {
    render(
      <ProductListView
        products={[]}
        isLoading={false}
        isError
        error={null}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load plans.')
  })

  it('renders products when loaded', () => {
    render(
      <ProductListView
        products={MOCK_PRODUCTS}
        isLoading={false}
        isError={false}
        error={null}
      />,
    )

    expect(screen.getByText('Standard')).toBeInTheDocument()
  })
})
