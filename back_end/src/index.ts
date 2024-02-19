/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Express, type Response, type Request } from "express";
import db from "./integration/dbConfig";
import { getUser } from "./controller/login";
import userRoutes from "./routes/userRoutes";
import cors, { type CorsOptions } from "cors";

/**
 * Tests the database connection.
 * Logs a success message if connection is established,
 * otherwise logs the error.
 */
async function testDatabaseConnection(): Promise<void> {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Immediately invoke the testDatabaseConnection function and catch any errors.
testDatabaseConnection().catch((error) => {
  console.error("Database connection failed:", error);
});

// Initialize express app
const app: Express = express();

// Define the port number
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define allowed origins for CORS
const allowedOrigins = ["http://localhost:4000"]; // Add more origins as needed

// CORS options configuration
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin == null || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Your origin is not allowed by CORS"), false);
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware with the configured options
app.use(cors(corsOptions));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send('Server is up and running!')
});

// Route to handle user actions
app.use(userRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
