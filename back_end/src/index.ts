import express, { type Express, type Response, type Request } from "express";
import { QueryTypes } from "sequelize";
import db from "./integration/DAO";
import Person from "./model/person";

async function testDatabaseConnection(): Promise<void> {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection().catch((error) => {
  console.error("Database connection failed:", error);
});

const app: Express = express();

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Sever is up and running!");
});

app.get("/tables", async (req: Request, res: Response) => {
  try {
    const [results] = await db.query(
      "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';"
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/user", async (req: Request, res: Response) => {
  try {
    const user = await Person.findAll({
      where: {
        surname: "Smith", // Adjust the attribute name if necessary
      },
    });

    if (user) {
      res.json(user);
      console.log(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
