import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from '@/App'
import * as productsApi from '@/api/products'
import { MOCK_PRODUCTS } from '@/api/products'

describe('App', () => {
  it('loads products and updates summary after increment', async () => {
    vi.spyOn(productsApi, 'fetchProducts').mockResolvedValue(MOCK_PRODUCTS)
    const user = userEvent.setup()

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Pro')).toBeInTheDocument()
    })

    expect(screen.getByText('Nie wybrano żadnych planów.')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Zwiększ ilość planu Pro' }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Zwiększ ilość planu Pro' }),
    )

    expect(screen.getByText('× 2')).toBeInTheDocument()
    expect(screen.getAllByText('$80/mies.')).toHaveLength(2)
  })
})
