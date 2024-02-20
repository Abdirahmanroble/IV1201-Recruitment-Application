import { Model, DataTypes } from 'sequelize'
import db from '../integration/dbConfig'

/**
 * Interface for CompetenceProfile attributes to ensure type safety.
 */
interface CompetenceProfileAttributes {
  competence_profile_id: number
  years_of_experience: number
  competence_id: number
  person_id: number
}

/**
 * Sequelize model representing a CompetenceProfile entity in the database.
 */
class CompetenceProfile extends Model<CompetenceProfileAttributes> {
  public competence_profile_id!: number
  public years_of_experience!: number
  public competence_id!: number
  public person_id!: number
}

CompetenceProfile.init(
  {
    competence_profile_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    years_of_experience: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false
    },
    competence_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Competence', // This should match the table name for the Competence model
        key: 'competence_id'
      }
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Person', // This should match the table name for the Person model
        key: 'person_id'
      }
    }
  },
  {
    sequelize: db,
    modelName: 'CompetenceProfile',
    tableName: 'competence_profile',
    timestamps: false
  }
)

export default CompetenceProfile
