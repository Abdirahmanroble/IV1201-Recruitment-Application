import express, { type Express, type Response, type Request } from 'express';
import db from './integration/dbConfig';


import './model/person'; 
import './model/availability';
import './model/competence'; 
import './model/competenceProfile'; 
import './model/role'; 
import './model/application';
import './setupAssociations'; // This imports and runs the associations setup

import cors from 'cors';
import loginRoute from './routes/loginRoute';
import listApplicationRoute from './routes/listApplicationRoute';
import createApplicationRoute from './routes/createApplicationRoute';

async function testDatabaseConnection(): Promise<void> {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDatabaseConnection().catch((error) => {
  console.error('Database connection failed:', error);
});

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4000' }));

app.get('/', (req: Request, res: Response) => {
  res.send('Server is up and running!');
});

// Setup routes
app.use(loginRoute);
app.use(listApplicationRoute);
app.use(createApplicationRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
