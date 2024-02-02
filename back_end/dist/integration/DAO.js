"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD !== "" ? process.env.DB_PASSWORD : undefined, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    logging: console.log,
});
exports.default = db;
