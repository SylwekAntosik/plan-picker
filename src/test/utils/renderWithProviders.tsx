import type { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render, type RenderOptions } from '@testing-library/react'
import { setupStore, type RootState } from '@/app/store'
import { AppRouter } from '@/app/router/AppRouter'

type ExtendedRenderOptions = {
  preloadedState?: Partial<RootState>
  route?: string
} & Omit<RenderOptions, 'wrapper'>

export function renderWithProviders(
  ui: ReactElement | null = null,
  {
    preloadedState,
    route = '/products',
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  const store = setupStore(preloadedState)

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    )
  }

  return {
    store,
    ...render(ui ?? <AppRouter />, { wrapper: Wrapper, ...renderOptions }),
  }
}
