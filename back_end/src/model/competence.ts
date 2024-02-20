import { Model, DataTypes } from 'sequelize'
import db from '../integration/dbConfig'
// import CompetenceProfile from "./competenceProfile";

/**
 * Interface for Competence attributes to ensure type safety.
 */
interface CompetenceAttributes {
  competence_id: number
  name: string
}

/**
 * Sequelize model representing a Competence entity in the database.
 * This class extends Model from Sequelize, ensuring ORM capabilities for the Competence entity,
 * such as automatic table creation (if not exist) and easy querying.
 */
class Competence extends Model<CompetenceAttributes> {
  public competence_id!: number
  public name!: string
}

/**
 * Initializes the Competence model with its schema defined in the database.
 * Each field is mapped to a corresponding database column with data types and constraints.
 */
Competence.init(
  {
    competence_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Competence', // This modelName should be in PascalCase and singular as per Sequelize convention
    tableName: 'competence', // Ensure this matches the actual table name in the database, which is typically plural
    timestamps: false // Assuming you don't have created_at and updated_at columns
  }
)

// Competence.hasMany(CompetenceProfile, { foreignKey: "competence_id" });

export default Competence
