export const API_DELAYS = {
  products: 400,
  checkout: 600,
} as const

export async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
