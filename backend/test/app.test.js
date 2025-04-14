// tests/app.test.js
import { jest } from '@jest/globals'
import request from 'supertest'

jest.setTimeout(30000) // allow up to 30s for any async

// 1️⃣ Mock out our DB connection so connectDB() never hits Postgres
await jest.unstable_mockModule('../src/db/index.js', () => ({
  connectDB: jest.fn().mockResolvedValue(),
}))

// 2️⃣ Stub each Sequelize model (files, layers, blocks, entities)
const makeModelMock = () => ({
  default: {
    findAll: jest.fn().mockResolvedValue([]),
    count: jest.fn().mockResolvedValue(0),
    findByPk: jest.fn().mockResolvedValue(null),
  },
})

await jest.unstable_mockModule('../src/db/models/files.js', () =>
  makeModelMock()
)
await jest.unstable_mockModule('../src/db/models/layers.js', () =>
  makeModelMock()
)
await jest.unstable_mockModule('../src/db/models/blocks.js', () =>
  makeModelMock()
)
await jest.unstable_mockModule('../src/db/models/entities.js', () =>
  makeModelMock()
)

// 3️⃣ Now import your Express app — it will pick up the above mocks
const { default: app } = await import('../src/app.js')

describe('📁 File API Endpoints (with mocks)', () => {
  it('GET /api/v1/files → 200 + empty array', async () => {
    const res = await request(app).get('/api/v1/files')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('data.files')
    expect(Array.isArray(res.body.data.files)).toBe(true)
    expect(res.body.data.files).toHaveLength(0)
  })

  it('POST /api/v1/files without upload → 400', async () => {
    const res = await request(app).post('/api/v1/files')
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('message', 'No file uploaded')
  })

  it('GET /api/v1/files/invalid-id → 404', async () => {
    const res = await request(app).get('/api/v1/files/invalid-id')
    expect(res.status).toBe(404)
  })
})

describe('🔗 Other Endpoints (404)', () => {
  it('GET /api/v1/files/invalid-id/layers → 404', async () => {
    const res = await request(app).get('/api/v1/files/invalid-id/layers')
    expect(res.status).toBe(404)
  })

  it('GET /api/v1/files/invalid-id/blocks → 404', async () => {
    const res = await request(app).get('/api/v1/files/invalid-id/blocks')
    expect(res.status).toBe(404)
  })

  it('GET /api/v1/blocks/invalid-id → 404', async () => {
    const res = await request(app).get('/api/v1/blocks/invalid-id')
    expect(res.status).toBe(404)
  })

  it('GET /api/v1/entities/invalid-id → 404', async () => {
    const res = await request(app).get('/api/v1/entities/invalid-id')
    expect(res.status).toBe(404)
  })

  it('GET /api/v1/layers/invalid-id → 404', async () => {
    const res = await request(app).get('/api/v1/layers/invalid-id')
    expect(res.status).toBe(404)
  })
})
