import { describe, expect, it } from 'vitest'
import { formatPriceMonthly } from '@/lib/format'

describe('formatPriceMonthly', () => {
  it('formats whole-dollar USD amounts', () => {
    expect(formatPriceMonthly(20)).toBe('$20')
    expect(formatPriceMonthly(140)).toBe('$140')
  })
})
