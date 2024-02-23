import { Sequelize } from "sequelize"
import * as dotenv from "dotenv"
import cls from "cls-hooked"
dotenv.config()

const namespace = cls.createNamespace("recruiter-db")
Sequelize.useCLS(namespace)

/**
 * Retrieves an environment variable by key and throws an error if it is not found or empty.
 * This function is used to ensure that necessary environment variables are present before initializing the database connection.
 *
 * @param {string} key - The key of the environment variable to retrieve.
 * @returns {string} The value of the environment variable.
 * @throws {Error} Throws an error if the environment variable is not set or is empty.
 */
function getEnvVariable(key: string): string {
  const value = process.env[key]
  if (value === undefined || value === "") {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value
}
/* Retrieve necessary database configuration from environment variables.*/
const dbName = getEnvVariable("DB_DATABASE") // Ensures it's a string
const dbUsername = getEnvVariable("DB_USERNAME") // Ensures it's a string
const dbPassword = getEnvVariable("DB_PASSWORD") // This can be undefined, as passwords are optional in Sequelize if your DB doesn't require one
const dbHost = getEnvVariable("DB_HOST") // Ensures it's a string

/* Optionally retrieve DB port, default to 5432 if not provided or if provided value is not a number.*/
const dbPortString = process.env.DB_PORT
const dbPort =
  dbPortString !== undefined && dbPortString !== ""
    ? parseInt(dbPortString, 10)
    : 5432

if (isNaN(dbPort)) {
  throw new Error("Invalid DB_PORT value. It must be a valid integer.")
}

/**
 * The Sequelize database instance configured with environment variables.
 * It is set up to connect to a PostgreSQL database using the provided credentials and connection details.
 *
 * @type {Sequelize}
 */
const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  port: dbPort,
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // You can also specify the path to the CA cert file
      // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
    },
  },
})
export default db
