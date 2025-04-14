import { FaGithub } from 'react-icons/fa'
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Developed by Himjyoti Sarma
        </p>
        <a
          href="https://github.com/HimjyotiSarma/himjyotisarma"
          className="github-link"
        >
          <FaGithub className="github-icon" />
        </a>
      </div>
    </footer>
  )
}

/* footer.css */

export default Footer
