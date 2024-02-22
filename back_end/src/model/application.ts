import { Model, DataTypes } from 'sequelize'
import db from '../integration/dbConfig'
// import User from "./user";
export interface ApplicationAttributes {
  application_id: number
  person_id: number
  availability_id: number
  status: string
  applicationdate: Date
  openapplicationstatus: boolean
}

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

/* Application.belongsTo(User, { foreignKey: "person_id" });
User.hasMany(Application, { foreignKey: "person_id" }); */

export default Application
