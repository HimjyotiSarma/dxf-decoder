// src/components/NavbarDashboard.tsx
import { Link } from '@tanstack/react-router'
import icon from '../assets/icon.png'
import '../styles/NavbarDashboard.css'

type Props = {
  navbarType: string
  searchValue: string
  setSearchValue: (val: string) => void
  onSearchSubmit: () => void
}

const NavbarDashboard = ({
  navbarType,
  searchValue,
  setSearchValue,
  onSearchSubmit,
}: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearchSubmit()
  }

  return (
    <nav className="navbar_dashboard">
      <div className="site_logo">
        <Link to="/">
          <img src={icon} alt="DXF Icon" className="logo_image" />
        </Link>
      </div>

      <form className="search_section" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={`Search ${navbarType ?? ''}...`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}

export default NavbarDashboard
