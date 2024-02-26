import User from './model/user'
import Availability from './model/availability'
import CompetenceProfile from './model/competenceProfile'
import Competence from './model/competence'
import Role from './model/role'
import Application from './model/application'

User.hasMany(Availability, { foreignKey: 'person_id' })
Availability.belongsTo(User, { foreignKey: 'person_id' })

User.hasMany(CompetenceProfile, { foreignKey: 'person_id' })
CompetenceProfile.belongsTo(User, { foreignKey: 'person_id' })

Competence.hasMany(CompetenceProfile, { foreignKey: 'competence_id' })
CompetenceProfile.belongsTo(Competence, { foreignKey: 'competence_id' })

User.belongsTo(Role, { foreignKey: 'role_id' })
Role.hasMany(User, { foreignKey: 'role_id' })

User.hasMany(Application, { foreignKey: 'person_id' })
Application.belongsTo(User, { foreignKey: 'person_id' })

Availability.hasMany(Application, { foreignKey: 'availability_id' })
Application.belongsTo(Availability, { foreignKey: 'availability_id' })
