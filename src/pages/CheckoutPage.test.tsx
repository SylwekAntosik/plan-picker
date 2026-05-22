import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import * as productsApi from '@/shared/api/products'
import { MOCK_PRODUCTS } from '@/shared/api/products'
import { renderWithProviders } from '@/test/utils/renderWithProviders'

describe('CheckoutPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)
  })

  it('redirects to products when checkout data is missing', async () => {
    renderWithProviders(null, { route: '/checkout' })

    await waitFor(() => {
      expect(screen.getByText('Choose your plans')).toBeInTheDocument()
    })
  })

  it('renders payment methods from checkout data', () => {
    renderWithProviders(null, {
      route: '/checkout',
      preloadedState: {
        checkout: {
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
        },
      },
    })

    expect(screen.getByText('Complete your purchase')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /BLIK/i })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    expect(
      screen.getByText('Order ord_test · monthly billing'),
    ).toBeInTheDocument()
  })
})
