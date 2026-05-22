import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as productsApi from '@/api/products/products'
import { MOCK_PRODUCTS } from '@/api/products/products'
import { ProductList } from '@/features/catalog/products/ProductList'
import { renderWithProviders } from '@/test/utils/renderWithProviders'

describe('ProductList', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows skeletons while loading', () => {
    vi.spyOn(productsApi, 'fetchProducts').mockImplementation(
      () => new Promise(() => undefined),
    )

    renderWithProviders(<ProductList />)

    expect(screen.getByLabelText('Loading plans')).toBeInTheDocument()
  })

  it('renders products when loaded', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)

    renderWithProviders(<ProductList />)

    await waitFor(() => {
      expect(screen.getByText('Standard')).toBeInTheDocument()
    })
  })

  it('shows an error message when loading fails', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockRejectedValue(
      new Error('Network error'),
    )

    renderWithProviders(<ProductList />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Network error')
    })
  })

  it('updates quantity through product card controls', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)

    const user = userEvent.setup()

    renderWithProviders(<ProductList />)

    await waitFor(() => {
      expect(screen.getByText('Standard')).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('button', { name: 'Increase Standard quantity' }),
    )

    expect(screen.getByLabelText('Standard quantity')).toHaveTextContent('1')

    await user.click(
      screen.getByRole('button', { name: 'Decrease Standard quantity' }),
    )

    expect(screen.getByLabelText('Standard quantity')).toHaveTextContent('0')
  })
})
