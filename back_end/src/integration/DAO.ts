import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DB_DATABASE!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD !== "" ? process.env.DB_PASSWORD : undefined,
  {
    host: process.env.DB_HOST!,
    dialect: "postgres",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    logging: console.log,
  }
);

export default db;
