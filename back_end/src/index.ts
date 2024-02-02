import express, { type Express, type Response, type Request } from 'express'

import db from './integration/DAO'

async function testDatabaseConnection (): Promise<void> {
  try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testDatabaseConnection().catch((error) => {
  console.error('Database connection failed:', error)
})

const app: Express = express()

const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('hahhaa!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
