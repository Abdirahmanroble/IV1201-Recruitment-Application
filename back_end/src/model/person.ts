import { Model, DataTypes } from "sequelize";
import db from "../integration/DAO";

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
        model: "roles",
        key: "id",
      },
    },
  },
  {
    sequelize: db,
    modelName: "person",
    tableName: "person",
    timestamps: false,
  }
);

export default Person;
