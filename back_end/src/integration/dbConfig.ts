import { Sequelize } from "sequelize";

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (value === undefined || value === "") {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

const dbName = getEnvVariable("DB_DATABASE");
const dbUsername = getEnvVariable("DB_USERNAME");
const dbPassword = process.env.DB_PASSWORD;
const dbHost = getEnvVariable("DB_HOST");

const dbPortString = process.env.DB_PORT;
const dbPort =
  dbPortString !== undefined && dbPortString !== ""
    ? parseInt(dbPortString, 10)
    : 5432;

if (isNaN(dbPort)) {
  throw new Error("Invalid DB_PORT value. It must be a valid integer.");
}

const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  port: dbPort,
  logging: console.log,
});

export default db;
