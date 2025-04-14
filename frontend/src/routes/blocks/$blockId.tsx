import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchBlockDetails } from '../../utils/fetchFunctions'
import '../../styles/BlockDetailPage.css'
import LoaderComponent from '../../components/LoaderComponent'

export const Route = createFileRoute('/blocks/$blockId')({
  loader: async ({ params }) => {
    const { blockId } = params
    if (!blockId) throw new Error('Block ID is required')
    const resp = await fetchBlockDetails(blockId)
    return resp.data!
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
  const block = Route.useLoaderData()

  return (
    <div className="block-details-container">
      <header className="block-header">
        <h1 className="block-title">{block.name}</h1>
        <Link
          to="/files/$fileId"
          params={{ fileId: block.file_id }}
          className="back-link"
        >
          ← Back to File
        </Link>
      </header>

      <section className="block-meta">
        <div>
          <strong>ID:</strong> {block.id}
        </div>
        <div>
          <strong>Type:</strong> {block.type ?? 'N/A'}
        </div>
        <div>
          <strong>Position:</strong> ({block.pos_x.toFixed(2)},{' '}
          {block.pos_y.toFixed(2)}, {block.pos_z.toFixed(2)})
        </div>
        <div>
          <strong>Handle:</strong> {block.handle ?? '—'}
        </div>
        <div>
          <strong>Owner Handle:</strong> {block.owner_handle ?? '—'}
        </div>
        <div>
          <strong>Layer:</strong>{' '}
          {block.layer ? (
            <Link to="/layers/$layerId" params={{ layerId: block.layer.id }}>
              {block.layer.name}
            </Link>
          ) : (
            'N/A'
          )}
        </div>
      </section>

      <section className="entities-section">
        <h2>Entities ({block.entities?.length ?? 0})</h2>
        {block.entities && block.entities.length > 0 ? (
          <ul>
            {block.entities.map((ent) => (
              <li key={ent.id} className="entity-item">
                <Link
                  to="/entities/$entityId"
                  params={{ entityId: ent.id }}
                  className="entity-link"
                >
                  {ent.type}
                </Link>
                <span className="entity-info">
                  <strong>Handle:</strong> {ent.handle}
                  <br />
                  <strong>Layer:</strong>{' '}
                  {ent.layer ? (
                    <Link
                      to="/layers/$layerId"
                      params={{ layerId: ent.layer.id }}
                    >
                      {ent.layer.name}
                    </Link>
                  ) : (
                    'N/A'
                  )}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No entities defined in this block.</p>
        )}
      </section>
    </div>
  )
}
