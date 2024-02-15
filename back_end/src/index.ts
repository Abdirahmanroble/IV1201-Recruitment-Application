import express, { type Express, type Response, type Request } from 'express'
import db from './integration/dbConfig'
import { getUser } from './controller/login'
import userRoutes from './routes/userRoutes'
import cors from 'cors'

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
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:4000'
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('Sever is up and running!')
})

app.post('/user', getUser)

app.post("/user", getUser);


//Login
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

// app.get("/users", (req: Request, res: Response) => {
//   // res.send("Sever is up and running!");
//   res.json(Person);
// });

/* app.get("/tables", async (req: Request, res: Response) => {
  try {
    const [results] = await db.query(
      "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';"
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).send("Internal Server Error");
  }
}); */
