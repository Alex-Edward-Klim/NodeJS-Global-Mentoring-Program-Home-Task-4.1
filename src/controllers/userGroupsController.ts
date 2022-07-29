import { Request, Response } from 'express';

import groupService from '../services/groupService';

import addUsersToGroupService from '../services/addUsersToGroupService';
import removeUsersFromGroupService from '../services/removeUsersFromGroupService';

const users_get_all = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  if (groupId) {
    const group: any = await groupService.getGroupById(groupId);

    if (group) {
      return res.send(group?.users || []);
    }
  }
  return res.status(400).send('Group not found');
};

const users_update_users_in_group = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  if (groupId) {
    const group: any = await groupService.getGroupById(groupId);
    if (group) {
      const { userIds } = req.body;
      if (Array.isArray(userIds)) {
        const UsersAddedToGroup = await addUsersToGroupService.addUsersToGroup(groupId, userIds);
        if (!UsersAddedToGroup) {
          throw new Error('Incorrect request data');
        } else {
          return res.sendStatus(204);
        }
      }
    }
  }
  return res.status(404).send('Group not found');
};

const users_delete_users_from_group = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  if (groupId) {
    const group: any = await groupService.getGroupById(groupId);
    if (group) {
      const UsersRemovedFromGroup = await removeUsersFromGroupService.removeUsersFromGroup(groupId);
      if (!UsersRemovedFromGroup) {
        throw new Error('Incorrect request data');
      } else {
        return res.status(200).send('Users Removed From Group');
      }
    }
  }
  return res.status(404).send('Group not found');
};

const userGroupsController = {
  users_get_all,
  users_update_users_in_group,
  users_delete_users_from_group,
};

export default userGroupsController;
