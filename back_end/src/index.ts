import express, { Express, Response, Request } from "express";

import db from "./integration/DAO";

async function testDatabaseConnection() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection();

const app: Express = express();

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("hahhaa!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
