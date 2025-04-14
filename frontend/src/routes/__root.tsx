import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import notfound from '../components/notfound'
import ErrorComponent from '../components/ErrorComponent'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: notfound,
  errorComponent: ({ error }) => (
    <ErrorComponent errorMessage={error.message} />
  ),
})

function RootComponent() {
  return (
    <div className="main">
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
    </div>
  )
}
