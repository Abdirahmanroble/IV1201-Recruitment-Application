
import Person from './model/person';
import Availability from './model/availability';
import CompetenceProfile from './model/competenceProfile';
import Competence from './model/competence';
import Role from './model/role'; 
import Application from './model/application'; 



Person.hasMany(Availability, { foreignKey: 'person_id' });
Availability.belongsTo(Person, { foreignKey: 'person_id' });

Person.hasMany(CompetenceProfile, { foreignKey: 'person_id' });
CompetenceProfile.belongsTo(Person, { foreignKey: 'person_id' });

Competence.hasMany(CompetenceProfile, { foreignKey: 'competence_id' });
CompetenceProfile.belongsTo(Competence, { foreignKey: 'competence_id' });

Person.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(Person, { foreignKey: 'role_id' });


Person.hasMany(Application, { foreignKey: 'person_id' });
Application.belongsTo(Person, { foreignKey: 'person_id' });


Availability.hasMany(Application, { foreignKey: 'availability_id' });
Application.belongsTo(Availability, { foreignKey: 'availability_id' });