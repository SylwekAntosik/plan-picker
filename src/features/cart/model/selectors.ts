import { createSelector } from '@reduxjs/toolkit'
import { catalogApi } from '@/features/catalog/api/catalogApi'
import { buildSummaryItems, calculateTotal } from '@/features/cart/lib/cart'
import { getErrorMessage } from '@/lib/getErrorMessage'
import type { RootState } from '@/app/store/rootReducer'

const selectCartQuantities = (state: RootState) => state.cart.quantities

const selectGetProductsResult = catalogApi.endpoints.getProducts.select()

export const selectProducts = createSelector(
  [(state: RootState) => selectGetProductsResult(state).data],
  (data) => data ?? [],
)

export const selectProductsLoading = createSelector(
  [selectGetProductsResult],
  (result) => result.isLoading || result.isUninitialized,
)

export const selectProductsError = createSelector(
  [selectGetProductsResult],
  (result) =>
    getErrorMessage(result.error, 'Failed to load plans.'),
)

export const selectSummaryItems = createSelector(
  [selectProducts, selectCartQuantities],
  (products, quantities) => buildSummaryItems(products, quantities),
)

export const selectCartTotal = createSelector([selectSummaryItems], (items) =>
  calculateTotal(items),
)

export const selectHasSelectedPlans = createSelector(
  [selectSummaryItems],
  (items) => items.length > 0,
)
