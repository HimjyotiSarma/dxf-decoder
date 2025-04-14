import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import './App.css'
import { uploadFile } from './utils/fetchFunctions'
import { FileUploadResponse } from './utils/types'
function App() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate({ from: '/' })
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files?.[0]
    if (fileInput) {
      setFile(fileInput)
    }
  }
  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProcessing(true)
    if (!file) {
      setError('Please select a file to upload')
      return
    }
    if (file.name.includes('.dxf') === false) {
      console.log('File:', file)
      setError('Please upload a valid DXF file')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit')
      return
    }
    try {
      const response: FileUploadResponse = await uploadFile(file)
      if (response.data == null || response.statusCode >= 400) {
        console.error('Error uploading file:', response)
        setError(response.message || 'No data received from server')
        setProcessing(false)
        return
      }
      console.log('File uploaded successfully:', response.data)
      setProcessing(false)
      setError(null)
      setFile(null)
      navigate({
        to: '/files/$fileId',
        params: { fileId: response.data?.file_id },
      })
    } catch (error) {
      setProcessing(false)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Error uploading file. Please try again.')
      }
    }
  }
  return (
    <div className="intro-page">
      <div className="intro-container">
        <h1 className="intro-heading">DXF File Viewer</h1>
        <p className="intro-description">
          Upload a <strong>DXF</strong> file to visualize and explore its
          internal components including <strong>Blocks</strong>,{' '}
          <strong>Layers</strong>, and <strong>Entities</strong>. This tool
          helps you understand the structure of your CAD files easily.
        </p>

        <form
          className="upload-form"
          encType="multipart/form-data"
          onSubmit={async (event) => {
            await handleFileUpload(event)
          }}
        >
          <input
            type="file"
            name="dxfFile"
            accept=".dxf"
            className="file-input"
            onChange={handleFileChange}
            required
          />
          <button type="submit" className="upload-button">
            Upload DXF File
          </button>
        </form>
        {processing && (
          <div className="processing-message">
            Processing your file, please wait...
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  )
}

export default App
