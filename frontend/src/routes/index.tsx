import { createFileRoute } from '@tanstack/react-router'
import NavbarHome from '../components/NavbarHome'
import App from '../App'
import Footer from '../components/Footer'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <NavbarHome />
      <App />
      <Footer />
    </>
  )
}
