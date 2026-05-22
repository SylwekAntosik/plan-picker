import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as checkoutApi from '@/api/checkout/checkout'
import * as productsApi from '@/api/products/products'
import { MOCK_PRODUCTS } from '@/api/products/products'
import { CartSummary } from '@/features/cart/components/CartSummary'
import { ProductList } from '@/features/catalog/products/ProductList'
import { renderWithProviders } from '@/test/utils/renderWithProviders'

describe('CartSummary', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)
  })

  it('shows loading skeleton while products are loading', () => {
    vi.spyOn(productsApi, 'fetchProducts').mockImplementation(
      () => new Promise(() => undefined),
    )

    renderWithProviders(<CartSummary />)

    expect(screen.getByLabelText('Loading summary')).toBeInTheDocument()
    expect(
      screen.queryByText('No plans selected yet.'),
    ).not.toBeInTheDocument()
  })

  it('shows empty state when nothing is selected', async () => {
    renderWithProviders(<CartSummary />)

    await waitFor(() => {
      expect(screen.getByText('No plans selected yet.')).toBeInTheDocument()
    })

    expect(screen.getByText('$0/mo')).toBeInTheDocument()
  })

  it('shows selected items and total', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <>
        <ProductList />
        <CartSummary />
      </>,
    )

    await waitFor(() => {
      expect(screen.getByText('Pro')).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('button', { name: 'Increase Pro quantity' }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Increase Pro quantity' }),
    )

    expect(screen.getByText('× 2')).toBeInTheDocument()
    expect(screen.getAllByText('$80/mo')).toHaveLength(2)
  })

  it('submits checkout when plans are selected', async () => {
    vi.spyOn(checkoutApi, 'submitOrder').mockResolvedValue({
      session: {
        orderId: 'ord_test',
        redirectPath: '/checkout',
        expiresAt: new Date().toISOString(),
      },
      items: [
        {
          product: MOCK_PRODUCTS[1],
          quantity: 1,
          lineTotal: 40,
        },
      ],
      total: 40,
      paymentMethods: [
        {
          id: 'card',
          name: 'Credit or debit card',
          description: 'Visa, Mastercard, Amex',
        },
      ],
    })

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
      expect(screen.getByText('Complete your purchase')).toBeInTheDocument()
    })
  })

  it('shows checkout error and loading states', async () => {
    vi.spyOn(checkoutApi, 'submitOrder').mockRejectedValue(
      new Error('Checkout unavailable'),
    )

    const user = userEvent.setup()

    renderWithProviders(
      <>
        <ProductList />
        <CartSummary />
      </>,
    )

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
})
