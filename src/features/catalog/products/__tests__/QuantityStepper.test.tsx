import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { QuantityStepper } from '@/features/catalog/products/QuantityStepper'

describe('QuantityStepper', () => {
  it('calls handlers and disables decrement at zero', async () => {
    const user = userEvent.setup()
    const onIncrement = vi.fn()
    const onDecrement = vi.fn()

    render(
      <QuantityStepper
        productName="Pro"
        quantity={0}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />,
    )

    expect(
      screen.getByRole('button', { name: 'Decrease Pro quantity' }),
    ).toBeDisabled()

    await user.click(
      screen.getByRole('button', { name: 'Increase Pro quantity' }),
    )

    expect(onIncrement).toHaveBeenCalledOnce()
    expect(onDecrement).not.toHaveBeenCalled()
  })
})
