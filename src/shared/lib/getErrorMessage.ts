export function getErrorMessage(
  error: unknown,
  fallback: string,
): string | null {
  if (!error) {
    return null
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = error.message
    if (typeof message === 'string') {
      return message
    }
  }

  return fallback
}
