import { configureStore } from '@reduxjs/toolkit'
import { catalogApi } from '@/features/catalog/api/catalogApi'
import { checkoutApi } from '@/features/checkout/api/checkoutApi'
import { rootReducer, type RootState } from '@/app/store/rootReducer'

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        catalogApi.middleware,
        checkoutApi.middleware,
      ),
    preloadedState,
  })
}

export const store = setupStore()

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export type { RootState } from '@/app/store/rootReducer'
