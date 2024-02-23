import { Model, DataTypes } from 'sequelize'
import db from '../integration/dbConfig'

/**
 * Interface for Availability attributes to ensure type safety.
 */
interface AvailabilityAttributes {
  availability_id: number
  from_date: Date
  to_date: Date
  person_id: number
}

/**
 * Sequelize model representing an Availability entity in the database.
 */
class Availability extends Model<AvailabilityAttributes> {
  public availability_id!: number
  public from_date!: Date
  public to_date!: Date
  public person_id!: number
}

Availability.init(
  {
    availability_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    from_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    to_date: {
      type: DataTypes.DATE,
      allowNull: false
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
    modelName: 'Availability',
    tableName: 'availability',
    timestamps: false
  }
)

export default Availability
