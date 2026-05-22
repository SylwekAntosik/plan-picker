import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import * as checkoutApi from '@/api/checkout'
import * as productsApi from '@/api/products'
import { MOCK_PRODUCTS } from '@/api/products'
import { AppRouter } from '@/routes/AppRouter'
import { useCartStore } from '@/store/cartStore'

function resetStore() {
  useCartStore.setState({
    products: [],
    productsStatus: 'idle',
    productsError: null,
    quantities: {},
    checkoutData: null,
    submitStatus: 'idle',
    submitError: null,
    selectedPaymentMethodId: null,
  })
}

describe('App routing', () => {
  beforeEach(() => {
    resetStore()
    vi.restoreAllMocks()
  })

  it('redirects root to products', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('Choose your plans')).toBeInTheDocument()
    })
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

    render(
      <MemoryRouter initialEntries={['/products']}>
        <AppRouter />
      </MemoryRouter>,
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
    await user.click(
      screen.getByRole('button', { name: 'Continue to checkout' }),
    )

    await waitFor(() => {
      expect(screen.getByText('Complete your purchase')).toBeInTheDocument()
    })

    expect(screen.getByRole('radio', { name: /Credit or debit card/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /BLIK/i })).toBeInTheDocument()
  })
})
