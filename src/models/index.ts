import Group from './group';
import User from './user';
import UserGroup from './userGroup';

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

export {
  Group,
  User,
};
