import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchFilesList } from '../../utils/fetchFunctions'
import '../../styles/FileListPage.css'
import type { FileItem } from '../../utils/types'
import LoaderComponent from '../../components/LoaderComponent'
import ErrorComponent from '../../components/ErrorComponent'
import NavbarHome from '../../components/NavbarHome'

export const Route = createFileRoute('/files/')({
  validateSearch: (search: Record<string, string | undefined>) => {
    const page = parseInt(search?.page ?? '1', 10)
    const limit = parseInt(search?.limit ?? '20', 10)
    return {
      page: isNaN(page) || page < 1 ? '1' : page.toString(),
      limit: isNaN(limit) || limit < 1 ? '20' : limit.toString(),
    }
  },
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),

  loader: async ({ deps: { page, limit } }) => {
    try {
      const response = await fetchFilesList({ page, limit })
      return {
        files: response.data.files,
        totalFiles: response.data.totalFiles,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
      }
    } catch (error) {
      console.error('Error fetching files:', error)
      throw new Error('Failed to fetch files')
    }
  },

  pendingComponent: () => <LoaderComponent />,
  errorComponent: ({ error }) => (
    <ErrorComponent errorMessage={error.message} />
  ),
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { files, totalPages, currentPage } = Route.useLoaderData()

  return (
    <div>
      <NavbarHome />

      <div className="files-list-container">
        <h2 className="files-heading">Uploaded Files</h2>

        {files.length === 0 ? (
          <p className="no-results">No files found.</p>
        ) : (
          <ul className="files-list">
            {files.map((file: FileItem) => (
              <li key={file.id} className="file-card">
                <Link
                  to="/files/$fileId"
                  params={{ fileId: file.id }}
                  className="file-link"
                >
                  <h3>{file.file_name}</h3>
                  <p>
                    <strong>Uploaded:</strong>{' '}
                    {new Date(file.createdAt).toLocaleString()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    page: (currentPage - 1).toString(),
                  }),
                })
              }
            >
              ⬅ Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    page: (currentPage + 1).toString(),
                  }),
                })
              }
            >
              Next ➡
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RouteComponent
