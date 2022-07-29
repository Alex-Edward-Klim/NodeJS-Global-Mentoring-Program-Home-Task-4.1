import removeUsersFromGroupInDataBase from '../data-access/removeUsersFromGroup';

const removeUsersFromGroup = async (groupId: string) => {
  const UsersRemovedFromGroup = await removeUsersFromGroupInDataBase(groupId);
  return UsersRemovedFromGroup;
};

const removeUsersFromGroupService = {
  removeUsersFromGroup,
};

export default removeUsersFromGroupService;
