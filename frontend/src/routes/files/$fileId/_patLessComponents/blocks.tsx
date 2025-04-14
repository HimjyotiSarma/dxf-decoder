import { createFileRoute, Link } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { fetchFileBlocks } from '../../../../utils/fetchFunctions'
import NavbarDashboard from '../../../../components/NavBarComponents'
import '../../../../styles/BlocksListPage.css'
import { Block } from '../../../../utils/types'

export const Route = createFileRoute(
  '/files/$fileId/_patLessComponents/blocks'
)({
  component: RouteComponent,
  loader: async ({ params }) => params.fileId,
})

function RouteComponent() {
  const fileId = Route.useLoaderData()
  const [search, setSearch] = useState('')
  const [blocks, setBlocks] = useState<Block[] | []>([])
  const [loading, setLoading] = useState(true)

  const loadBlocks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetchFileBlocks({ file_id: fileId, search })
      setBlocks(response.data.blocks || [])
    } catch (err) {
      console.error('Failed to fetch blocks:', err)
    } finally {
      setLoading(false)
    }
  }, [fileId, search])

  useEffect(() => {
    loadBlocks()
  }, [loadBlocks])

  return (
    <div>
      <NavbarDashboard
        navbarType="blocks"
        searchValue={search}
        setSearchValue={setSearch}
        onSearchSubmit={loadBlocks}
      />

      <div className="blocks-list-container">
        <h2 className="blocks-heading">Blocks</h2>
        {loading ? (
          <p className="loading-text">Loading blocks...</p>
        ) : blocks.length === 0 ? (
          <p className="no-results">No blocks found.</p>
        ) : (
          <ul className="blocks-list">
            {blocks.map((block) => (
              <li key={block.id} className="block-card">
                <Link
                  to="/blocks/$blockId"
                  params={{ blockId: block.id }}
                  className="block-link"
                >
                  <h3>{block.name}</h3>
                  <p>
                    <strong>Type:</strong> {block.type ?? '—'}
                  </p>
                  <p>
                    <strong>Layer:</strong> {block.layer?.name || 'No Layer'}
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
