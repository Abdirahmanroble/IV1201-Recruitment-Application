import { Model, DataTypes } from 'sequelize'
import db from '../integration/dbConfig'

/**
 * Interface for Application model attributes to ensure type safety.
 * @interface ApplicationAttributes
 * @property {number} application_id - The primary key of the application.
 * @property {number} person_id - Foreign key linking to the User model.
 * @property {number} availability_id - Foreign key linking to the Availability model.
 * @property {string} status - The status of the application (accepted, rejected, unhandled).
 * @property {Date} applicationdate - The date when the application was submitted.
 * @property {boolean} openapplicationstatus - Indicates if the application is still being considered (true) or not (false).
 */
export interface ApplicationAttributes {
  application_id: number
  person_id: number
  availability_id: number
  status: string
  applicationdate: Date
  openapplicationstatus: boolean
}
/**
 * Sequelize model class for Application.
 * Represents applications made by users within the system, tracking their status,
 * related user and availability, and other relevant information.
 * @extends Model<ApplicationAttributes>
 */
class Application
  extends Model<ApplicationAttributes>
  implements ApplicationAttributes {
  public application_id!: number
  public person_id!: number
  public availability_id!: number
  public status!: string
  public applicationdate!: Date
  public openapplicationstatus!: boolean
}
/**
 * Initializes the Application model, defining its schema and configuration.
 * This includes setting up fields with their data types, constraints, and relationships to other models.
 */
Application.init(
  {
    application_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'person_id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['accepted', 'rejected', 'unhandled']]
      }
    },
    applicationdate: {
      type: DataTypes.DATE,
      allowNull: false
    },

    availability_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Availability',
        key: 'availability_id'
      }
    },
    openapplicationstatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: db,
    modelName: 'Application',
    tableName: 'application',
    timestamps: false
  }
)

export default Application
