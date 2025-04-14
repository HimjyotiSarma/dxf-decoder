import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/files/$fileId/_patLessComponents')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}
