import dataBase from './dataBase';

import { Group } from '../models/index';

const removeUsersFromGroup = async (groupId: any) => {
  const t = await dataBase.transaction();

  try {
    const group: any = await Group.findOne({
      where: {
        id: groupId,
      },
    });

    if (group) {
      const usersToRemove = await group.getUsers();
      const UsersRemovedFromGroup = await group.removeUsers(usersToRemove);
      await t.commit();
      return UsersRemovedFromGroup;
    }
    throw new Error('Incorrect request data');
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export default removeUsersFromGroup;
