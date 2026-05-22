import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as checkoutApi from '@/api/checkout/checkout'
import * as productsApi from '@/api/products/products'
import { MOCK_PRODUCTS } from '@/api/products/products'
import { renderWithProviders } from '@/test/utils/renderWithProviders'

describe('ProductsPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows a product loading error from the API', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockRejectedValue(
      new Error('Network down'),
    )

    renderWithProviders(null, { route: '/products' })

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Network down')
    })
  })

  it('shows a checkout error when submit fails', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)
    vi.spyOn(checkoutApi, 'submitOrder').mockRejectedValue(
      new Error('Checkout unavailable'),
    )

    const user = userEvent.setup()

    renderWithProviders(null, { route: '/products' })

    await waitFor(() => {
      expect(screen.getByText('Pro')).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('button', { name: 'Increase Pro quantity' }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Continue to checkout' }),
    )

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Checkout unavailable',
      )
    })
  })

  it('decrements product quantity from the products page', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)

    const user = userEvent.setup()

    renderWithProviders(null, { route: '/products' })

    await waitFor(() => {
      expect(screen.getByText('Pro')).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('button', { name: 'Increase Pro quantity' }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Decrease Pro quantity' }),
    )

    expect(screen.queryByText('× 1')).not.toBeInTheDocument()
  })
})
