import { Model, DataTypes } from "sequelize";
import db from "../integration/dbConfig";

/**
 * Interface for Person attributes to ensure type safety.
 */
interface PersonAttributes {
  person_id: number;
  name: string;
  surname: string;
  pnr: string;
  email: string;
  password: string;
  username: string;
  role_id: number;
}
/**
 * Sequelize model representing a Person entity in the database.
 * This class extends Model from Sequelize, ensuring ORM capabilities for the Person entity,
 * such as automatic table creation (if not exist) and easy querying.
 */
class Person extends Model<PersonAttributes> {
  public person_id!: number;
  public name!: string;
  public surname!: string;
  public pnr!: string;
  public email!: string;
  public password!: string;
  public username!: string;
  public role_id!: number;

  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;
}
/**
 * Initializes the Person model with its schema defined in the database.
 * Each field is mapped to a corresponding database column with data types and constraints.
 */
Person.init(
  {
    person_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    surname: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    pnr: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Role",
        key: "role_id",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Person",
    tableName: "person",
    timestamps: false,
  }
);
export default Person;
