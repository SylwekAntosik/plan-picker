import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi, beforeEach } from 'vitest'
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

describe('CheckoutPage', () => {
  beforeEach(() => {
    resetStore()
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)
  })

  it('redirects to products when checkout data is missing', async () => {
    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <AppRouter />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('Choose your plans')).toBeInTheDocument()
    })
  })

  it('renders payment methods from checkout data', () => {
    useCartStore.setState({
      checkoutData: {
        session: {
          orderId: 'ord_test',
          redirectPath: '/checkout',
          expiresAt: new Date().toISOString(),
        },
        items: [
          {
            product: {
              id: 'pro',
              name: 'Pro',
              description: 'Pro plan',
              priceMonthly: 40,
            },
            quantity: 1,
            lineTotal: 40,
          },
        ],
        total: 40,
        paymentMethods: [
          {
            id: 'blik',
            name: 'BLIK',
            description: 'Pay with a code from your banking app',
          },
        ],
      },
      selectedPaymentMethodId: 'blik',
    })

    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <AppRouter />
      </MemoryRouter>,
    )

    expect(screen.getByText('Complete your purchase')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /BLIK/i })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    expect(screen.getByText('Order ord_test · monthly billing')).toBeInTheDocument()
  })
})
