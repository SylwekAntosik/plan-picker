export type ProductId = 'standard' | 'pro' | 'pro-plus' | 'ultimate'

export type Product = {
  id: ProductId
  name: string
  description: string
  priceMonthly: number
}

export type SummaryItem = {
  product: Product
  quantity: number
  lineTotal: number
}
