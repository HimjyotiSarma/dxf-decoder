import { Link } from '@tanstack/react-router'
import '../styles/ErrorComponent.css'
const ErrorComponent = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="error-container">
      <h1 className="error-title">Error</h1>
      <p className="error-message">{errorMessage}</p>
      <Link to="/">
        <button className="error-button">Go back to home</button>
      </Link>
    </div>
  )
}
export default ErrorComponent
