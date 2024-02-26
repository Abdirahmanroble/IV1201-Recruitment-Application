import { Model, DataTypes } from 'sequelize'
import db from '../integration/dbConfig'

/**
 * Interface for Role attributes to ensure type safety.
 */
interface RoleAttributes {
  role_id: number
  name: string
}

/**
 * Sequelize model representing a Role entity in the database.
 */
class Role extends Model<RoleAttributes> {
  public role_id!: number
  public name!: string
}
/**
 * Initializes the Role model, defining its schema and configuration.
 */
Role.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
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
    modelName: 'Role',
    tableName: 'role',
    timestamps: false
  }
)

export default Role
