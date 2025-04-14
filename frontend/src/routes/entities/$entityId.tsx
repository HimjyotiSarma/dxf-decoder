import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchEntityDetails } from '../../utils/fetchFunctions'
import '../../styles/EntityDetailsPage.css'
import LoaderComponent from '../../components/LoaderComponent'

export const Route = createFileRoute('/entities/$entityId')({
  loader: async ({ params }) => {
    const { entityId } = params
    if (!entityId) throw new Error('Entity ID is required')
    const response = await fetchEntityDetails(entityId)
    return response.data!
  },
  pendingComponent: () => <LoaderComponent />,
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <div className="error-page">
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  ),
})

function RouteComponent() {
  const entity = Route.useLoaderData()

  return (
    <div className="entity-details-container">
      <header className="entity-header">
        <h1 className="entity-title">{entity.type} Entity</h1>
        <Link
          to="/blocks/$blockId"
          params={{ blockId: entity.block_id }}
          className="back-link"
        >
          ← Back to Block
        </Link>
      </header>

      <section className="entity-meta">
        <div>
          <strong>Entity ID:</strong> {entity.id}
        </div>
        <div>
          <strong>Handle:</strong> {entity.handle}
        </div>
        <div>
          <strong>Owner Handle:</strong> {entity.owner_handle || '—'}
        </div>
        <div>
          <strong>Type:</strong> {entity.type}
        </div>
        <div>
          <strong>Layer:</strong>{' '}
          {entity.layer ? (
            <Link to="/layers/$layerId" params={{ layerId: entity.layer.id }}>
              {entity.layer.name}
            </Link>
          ) : (
            'N/A'
          )}
        </div>
        <div>
          <strong>Created:</strong>{' '}
          {new Date(entity.createdAt).toLocaleString()}
        </div>
        <div>
          <strong>Updated:</strong>{' '}
          {new Date(entity.updatedAt).toLocaleString()}
        </div>
      </section>

      <section className="entity-properties">
        <h2>Raw Properties</h2>
        <pre>{JSON.stringify(entity.properties, null, 2)}</pre>
      </section>
    </div>
  )
}
