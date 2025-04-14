import express from 'express'
// import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public/uploads'))
// app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // or whatever your frontend origin is
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
)

// Routes Here
import fileRoutes from './routes/file.route.js'

app.use('/api/v1', fileRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    success: false,
    message: err.message || 'Internal Server Error',
    data: null,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })
})

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

export default app
