import { Sequelize } from 'sequelize'

/**
 * Retrieves an environment variable by key and throws an error if it is not found or empty.
 * This function is used to ensure that necessary environment variables are present before initializing the database connection.
 *
 * @param {string} key - The key of the environment variable to retrieve.
 * @returns {string} The value of the environment variable.
 * @throws {Error} Throws an error if the environment variable is not set or is empty.
 */
function getEnvVariable (key: string): string {
  const value = process.env[key]
  if (value === undefined || value === '') {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value
}
// Retrieve necessary database configuration from environment variables.
const dbName = getEnvVariable('DB_DATABASE')
const dbUsername = getEnvVariable('DB_USERNAME')
const dbPassword = process.env.DB_PASSWORD
const dbHost = getEnvVariable('DB_HOST')

// Optionally retrieve DB port, default to 5432 if not provided or if provided value is not a number.
const dbPortString = process.env.DB_PORT
const dbPort =
  dbPortString !== undefined && dbPortString !== ''
    ? parseInt(dbPortString, 10)
    : 5432

if (isNaN(dbPort)) {
  throw new Error('Invalid DB_PORT value. It must be a valid integer.')
}
/**
 * The Sequelize database instance configured with environment variables.
 * It is set up to connect to a PostgreSQL database using the provided credentials and connection details.
 *
 * @type {Sequelize}
 */
const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  port: dbPort,
  logging: console.log
})

export default db
