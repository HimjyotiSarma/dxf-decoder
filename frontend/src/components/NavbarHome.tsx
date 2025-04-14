import icon from '../assets/icon.png'
import { MdEmail } from 'react-icons/md'
import { FaGithubAlt } from 'react-icons/fa'
import '../styles/NavbarHome.css'
import { Link } from '@tanstack/react-router'
const NavbarHome = () => {
  return (
    <nav className="navbar_home">
      <div className="site_logo">
        <Link to="/">
          <img src={icon} alt="Dxf Decoder Icon" className="logo_image" />
        </Link>
      </div>
      <div className="developer_details">
        <div className="email_section">
          <MdEmail
            style={{
              fontSize: '1.5rem',
              color: '#0a2d02',
            }}
          />
          <a href="mailto:himjyotisarma.dev@gmail.com">
            himjyotisarma.dev@gmail.com
          </a>
        </div>
        <div className="github_section">
          <FaGithubAlt
            style={{
              fontSize: '1.5rem',
              color: '#0a2d02',
            }}
          />
          <a href="https://github.com/HimjyotiSarma/dxf-decoder">Github Repo</a>
        </div>
      </div>
    </nav>
  )
}
export default NavbarHome
