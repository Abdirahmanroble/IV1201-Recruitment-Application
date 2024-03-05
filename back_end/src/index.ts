/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Express, type Response, type Request } from 'express'
import db from './integration/dbConfig'

import User from './model/user'
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
import updateUserRoute from './routes/updateUserRoute'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
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
const allowedOrigins = [
  'http://localhost:4000',
  'http://localhost:4001',
  'http://localhost:5173',
  'https://iv1201-recruitment-application.onrender.com'
]

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
app.use(updateUserRoute)

app.post('/send-confirmation', async (req: Request, res: Response) => {
  console.log('the  email is ', req.body.email)

  const user = await User.findOne({ where: { email: req.body.email } })
  // Generate test SMTP service account from ethereal.email
  const testAccount = await nodemailer.createTestAccount()

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  })

  const token = jwt.sign({ id: user?.person_id }, 'Secret', { expiresIn: '1h' })
  const id = user?.person_id


  const url = `http://localhost:4000/update-password/${token}`

  // Send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Confirmation Email', // Subject line
    text: 'Hello world?', // plain text body
    html: `The link: <a href="${url}">${url}</a>` // html body
  })

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', url)

  res.send({ message: 'Email sent!', url, id, info })
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
