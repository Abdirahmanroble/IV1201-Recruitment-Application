import { Model, DataTypes } from 'sequelize'
import db from '../integration/dbConfig'

/**
 * Interface for Availability attributes to ensure type safety.
 * @interface AvailabilityAttributes
 * @property {number} availability_id - Unique identifier for the availability entry.
 * @property {Date} from_date - Start date of availability.
 * @property {Date} to_date - End date of availability.
 * @property {number} person_id - Identifier for the person to whom the availability belongs.
 */
interface AvailabilityAttributes {
  availability_id?: number
  from_date: Date
  to_date: Date
  person_id: number
}

/**
 * Sequelize model for the Availability entity.
 * Represents a person's availability period within the system.
 * @extends Model<AvailabilityAttributes>
 */

class Availability extends Model<AvailabilityAttributes> {
  public availability_id!: number
  public from_date!: Date
  public to_date!: Date
  public person_id!: number
}
/**
 * Initializes the Availability model, defining its schema and configuration.
 * Specifies the fields, their data types, constraints like primary key and auto-increment,
 * and establishes the foreign key relationship to the Person model.
 */
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
        model: 'Person',
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
