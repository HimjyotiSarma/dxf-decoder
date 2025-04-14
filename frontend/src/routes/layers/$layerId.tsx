import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchLayerDetails } from '../../utils/fetchFunctions'
import '../../styles/LayerDetailsPage.css'
import LoaderComponent from '../../components/LoaderComponent'

export const Route = createFileRoute('/layers/$layerId')({
  loader: async ({ params }) => {
    const { layerId } = params
    if (!layerId) throw new Error('Layer ID is required')
    const response = await fetchLayerDetails(layerId)
    return response.data!
  },
  component: RouteComponent,
  pendingComponent: () => <LoaderComponent />,
  errorComponent: ({ error }) => (
    <div className="error-page">
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  ),
})

function RouteComponent() {
  const layer = Route.useLoaderData()

  return (
    <div className="layer-details-container">
      <header className="layer-header">
        <h1 className="layer-title">Layer: {layer.name}</h1>
        <Link
          to="/files/$fileId"
          params={{ fileId: layer.file_id }}
          className="back-link"
        >
          ← Back to File
        </Link>
      </header>

      <section className="layer-meta">
        <div>
          <strong>ID:</strong> {layer.id}
        </div>
        <div>
          <strong>Color:</strong> {layer.color}
        </div>
        <div>
          <strong>Visible:</strong> {layer.visible ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Created At:</strong>{' '}
          {new Date(layer.createdAt).toLocaleString()}
        </div>
        <div>
          <strong>Updated At:</strong>{' '}
          {new Date(layer.updatedAt).toLocaleString()}
        </div>
        <div>
          <strong>File:</strong>{' '}
          <Link to="/files/$fileId" params={{ fileId: layer.File.id }}>
            {layer.File.file_name}
          </Link>
        </div>
      </section>

      <section className="blocks-section">
        <h2>Blocks ({layer.Blocks.length})</h2>
        {layer.Blocks.length > 0 ? (
          <ul>
            {layer.Blocks.map((block) => (
              <li key={block.id} className="block-item">
                <Link
                  to="/blocks/$blockId"
                  params={{ blockId: block.id }}
                  className="block-link"
                >
                  {block.name}
                </Link>
                <span className="block-info">
                  type: {block.type ?? '—'} | handle: {block.handle ?? '—'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No blocks associated with this layer.</p>
        )}
      </section>
    </div>
  )
}
