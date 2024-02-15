import express, { type Express, type Response, type Request } from "express";
import db from "./integration/dbConfig";
import { getUser } from "./controller/login";
import personRoutes from "./routes/personRoutes";
import cors, { CorsOptions } from "cors";

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
app.use(express.json());

const allowedOrigins = ["http://localhost:4000"]; // Add more origins as needed

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Your origin is not allowed by CORS"), false);
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Sever is up and running!");
});

app.post("/user", getUser);

//Login
app.use(personRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
