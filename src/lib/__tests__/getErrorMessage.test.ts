import { describe, expect, it } from 'vitest'
import { getErrorMessage } from '@/lib/getErrorMessage'

describe('getErrorMessage', () => {
  it('returns null for falsy errors', () => {
    expect(getErrorMessage(null, 'fallback')).toBeNull()
    expect(getErrorMessage(undefined, 'fallback')).toBeNull()
  })

  it('returns string messages from Error objects', () => {
    expect(getErrorMessage(new Error('Network down'), 'fallback')).toBe(
      'Network down',
    )
  })

  it('returns string messages from plain objects', () => {
    expect(getErrorMessage({ message: 'Invalid payload' }, 'fallback')).toBe(
      'Invalid payload',
    )
  })

  it('returns fallback for non-string message values', () => {
    expect(getErrorMessage({ message: 404 }, 'fallback')).toBe('fallback')
  })

  it('returns fallback for unsupported error shapes', () => {
    expect(getErrorMessage('plain string', 'fallback')).toBe('fallback')
  })
})
