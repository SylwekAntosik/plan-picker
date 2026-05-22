import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import App from '@/App'
import { AppProviders } from '@/app/providers/AppProviders'
import * as checkoutApi from '@/api/checkout/checkout'
import * as productsApi from '@/api/products/products'
import { MOCK_PRODUCTS } from '@/api/products/products'
import { renderWithProviders } from '@/test/utils/renderWithProviders'

describe('App routing', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('redirects root to products', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)

    renderWithProviders(null, { route: '/' })

    await waitFor(() => {
      expect(screen.getByText('Choose your plans')).toBeInTheDocument()
    })
  })

  it('renders the default App entrypoint', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Choose your plans')).toBeInTheDocument()
    })
  })

  it('renders the app shell from AppProviders', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)

    render(<AppProviders />)

    await waitFor(() => {
      expect(screen.getByText('Choose your plans')).toBeInTheDocument()
    })

    cleanup()
  })

  it('navigates to checkout after submitting selected plans', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)
    vi.spyOn(checkoutApi, 'submitOrder').mockResolvedValue({
      session: {
        orderId: 'ord_test',
        redirectPath: '/checkout',
        expiresAt: new Date().toISOString(),
      },
      items: [
        {
          product: MOCK_PRODUCTS[1],
          quantity: 2,
          lineTotal: 80,
        },
      ],
      total: 80,
      paymentMethods: [
        {
          id: 'card',
          name: 'Credit or debit card',
          description: 'Visa, Mastercard, Amex',
        },
        {
          id: 'blik',
          name: 'BLIK',
          description: 'Pay with a code from your banking app',
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
      screen.getByRole('button', { name: 'Increase Pro quantity' }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Continue to checkout' }),
    )

    await waitFor(() => {
      expect(screen.getByText('Complete your purchase')).toBeInTheDocument()
    })

    expect(
      screen.getByRole('radio', { name: /Credit or debit card/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /BLIK/i })).toBeInTheDocument()
  })
})
