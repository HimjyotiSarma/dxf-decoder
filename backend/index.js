import dotenv from 'dotenv'
dotenv.config({
  path: './.env',
})

import app from './src/app.js'
import { connectDB } from './src/db/index.js'

app.listen(process.env.PORT, () => {
  try {
    connectDB()
    console.log(`Server is running on port ${process.env.PORT}`)
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
})
