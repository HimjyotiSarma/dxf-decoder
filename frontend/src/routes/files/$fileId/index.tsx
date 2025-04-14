import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchFileDetails } from '../../../utils/fetchFunctions'
import '../../../styles/FileDetailsPage.css'
import LoaderComponent from '../../../components/LoaderComponent'

export const Route = createFileRoute('/files/$fileId/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { fileId } = params
    if (!fileId) {
      throw new Error('File ID is required')
    }
    const fileDetails = await fetchFileDetails(fileId)
    console.log('File details:', fileDetails.data?.Blocks)
    return fileDetails
  },
  pendingComponent: () => <LoaderComponent />,
  errorComponent: ({ error }) => (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  ),
})

function RouteComponent() {
  const { data: file } = Route.useLoaderData()
  if (!file) return <div>Something went wrong when fetching data...</div>

  // Flatten all entities from every block
  const allEntities =
    file.Blocks?.flatMap((block) => block.entities || []) || []

  return (
    <div className="file-details-container">
      <h1 className="file-title">{file.file_name}</h1>

      <section className="file-meta">
        <p>
          <strong>File ID:</strong> {file.id}
        </p>
        <p>
          <strong>Hash:</strong> {file.file_hash}
        </p>
        <p>
          <strong>Uploaded:</strong> {new Date(file.createdAt).toLocaleString()}
        </p>
      </section>

      <section className="summary-counters">
        <div>
          <Link to="/files/$fileId/layers" params={{ fileId: file.id }}>
            <strong>Layers:</strong>
          </Link>{' '}
          {file.counts?.layerCount ?? 0}
        </div>
        <div>
          <Link to="/files/$fileId/blocks" params={{ fileId: file.id }}>
            <strong>Blocks:</strong>
          </Link>{' '}
          {file.counts?.blockCount ?? 0}
        </div>
        <div>
          <strong>Entities:</strong> {file.counts?.entityCount ?? 0}
        </div>
      </section>

      <section className="layer-section">
        <h2>Layers</h2>
        <ul>
          {file.layers?.map((layer) => (
            <li key={layer.id}>
              <Link to="/layers/$layerId" params={{ layerId: layer.id }}>
                {layer.name}
              </Link>
              <span className="layer-info">
                color: {layer.color}, visible: {layer.visible ? 'yes' : 'no'}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="block-section">
        <h2>Blocks</h2>
        <ul>
          {file.Blocks?.map((block) => (
            <li key={block.id}>
              <Link to="/blocks/$blockId" params={{ blockId: block.id }}>
                {block.name}
              </Link>
              <span className="block-info">
                type: {block.type ?? 'N/A'}, layer: {block.layer?.name ?? 'N/A'}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="entity-section">
        <h2>Entities</h2>
        <ul>
          {allEntities.map((entity) => (
            <li key={entity.id}>
              <Link to="/entities/$entityId" params={{ entityId: entity.id }}>
                {entity.type}
              </Link>
              <span className="entity-info">
                handle: {entity.handle}, layer: {entity.layer?.name ?? 'N/A'}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
