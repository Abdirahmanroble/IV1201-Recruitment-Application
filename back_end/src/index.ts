import express, {
  type Express,
  type Response,
  type Request
} from 'express'
import db from './integration/dbConfig'

import './model/user'
import './model/availability'
import './model/competence'
import './model/competenceProfile'
import './model/role'
import './model/application'
import './setupAssociations'

import userRoutes from './routes/userRoutes'
import listApplicationRoute from './routes/listApplicationRoute'
import cors, { type CorsOptions } from 'cors'
import ErrorHandling from './errors/errorHandler'
import path from 'path'

/**
 * Tests the database connection.
 * Logs a success message if connection is established,
 * otherwise logs the error.
 */

async function testDatabaseConnection (): Promise<void> {
  try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
/** Immediately invoke the testDatabaseConnection function to ensure database connectivity at startup. */
testDatabaseConnection().catch((error) => {
  console.error('Database connection failed:', error)
})

/** Initialize the Express application. */
const app: Express = express()

/** Define the port number on which the server will listen. */
const port = 3000

/** Use middleware to parse JSON request bodies. */
app.use(express.json())

/** Define an array of allowed origins for CORS. */
const allowedOrigins = ['http://localhost:4000', 'http://localhost:5173', 'https://iv1201-recruitment-application.onrender.com']

/**
 * Configure CORS options, including allowed origins and HTTP methods,
 * to control access to the server from different domains.
 */
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin == null || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Your origin is not allowed by CORS'), false)
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

/** Apply CORS middleware to the Express app with the specified options. */
app.use(cors(corsOptions))

/** Define the root route of the application. */
app.get('/', (req: Request, res: Response) => {
  res.send('Server is up and running!')
})

/** Setup application routes by registering route handlers. */
app.use(userRoutes)
app.use(listApplicationRoute)

// Serve static files from the frontend's build output directory
// This assumes that the frontend's build output directory is `front_end/dist`
// and is placed at the same level as the backend directory in the final deployment package
app.use(express.static(path.join(__dirname, '../../front_end/dist')))

// Catch-all handler to serve index.html from the frontend build for any other routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../front_end/dist', 'index.html'))
})

/**
 * Initialize and register the error handling middleware as the last middleware
 * to catch any unhandled errors.
 */
const errorHandling = new ErrorHandling()
errorHandling.register(app)

/** Start the server and listen on the specified port, logging a message on successful launch. */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
