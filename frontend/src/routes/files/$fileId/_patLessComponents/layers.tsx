import { createFileRoute, Link } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { fetchFileLayers } from '../../../../utils/fetchFunctions'
import NavbarDashboard from '../../../../components/NavBarComponents'
import '../../../../styles/BlocksListPage.css'
import { Layer } from '../../../../utils/types'

export const Route = createFileRoute(
  '/files/$fileId/_patLessComponents/layers'
)({
  component: RouteComponent,
  loader: async ({ params }) => params.fileId,
})

function RouteComponent() {
  const fileId = Route.useLoaderData()
  const [search, setSearch] = useState('')
  const [layers, setLayers] = useState<Layer[] | []>([])
  const [loading, setLoading] = useState(true)

  const loadLayers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetchFileLayers({ fileId, search })
      setLayers(response.data.layers || [])
    } catch (err) {
      console.error('Failed to fetch layers:', err)
    } finally {
      setLoading(false)
    }
  }, [fileId, search])

  useEffect(() => {
    loadLayers()
  }, [loadLayers])

  return (
    <div>
      <NavbarDashboard
        navbarType="layers"
        searchValue={search}
        setSearchValue={setSearch}
        onSearchSubmit={loadLayers}
      />

      <div className="blocks-list-container">
        <h2 className="blocks-heading">Layers</h2>
        {loading ? (
          <p className="loading-text">Loading layers...</p>
        ) : layers.length === 0 ? (
          <p className="no-results">No layers found.</p>
        ) : (
          <ul className="blocks-list">
            {layers.map((layer) => (
              <li key={layer.id} className="block-card">
                <Link
                  to="/layers/$layerId"
                  params={{ layerId: layer.id }}
                  className="block-link"
                >
                  <h3>{layer.name}</h3>
                  <p>
                    <strong>Color:</strong> #{layer.color.toString(16)}
                  </p>
                  <p>
                    <strong>Visible:</strong> {layer.visible ? 'Yes' : 'No'}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
export default RouteComponent
