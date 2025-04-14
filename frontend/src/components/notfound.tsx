import NotFoundImage from '../assets/notfoundImage.jpg'
const notfound = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
        backgroundColor: '#ffffff',
        color: '#ccffcc',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <img
        src={NotFoundImage}
        alt="Not Found"
        style={{
          width: '100%',
          maxWidth: '750px',
          height: 'auto',
          marginBottom: '20px',
          borderRadius: '5px',
        }}
      />
      <h1 style={{ fontSize: '1.5rem', color: '#333' }}>Page Not Found</h1>
      <p style={{ fontSize: '1rem', color: '#666' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <a
        href="/"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
        }}
      >
        Go to Home
      </a>
    </div>
  )
}
export default notfound
