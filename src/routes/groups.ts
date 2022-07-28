import express from 'express';

import groupsController from '../controllers/groupsController';

import userGroupsController from '../controllers/userGroupsController';

const router = express.Router({ mergeParams: true });

router.get('/', groupsController.groups_get_all);
router.get('/:groupId', groupsController.groups_get_group);
router.post('/', groupsController.groups_create_group);
router.patch('/:groupId', groupsController.groups_update_group);
router.delete('/:groupId', groupsController.groups_delete_group);

router.get('/:groupId/users', userGroupsController.users_get_all);
router.put('/:groupId/users', userGroupsController.users_update_users_in_group);
router.delete('/:groupId/users', userGroupsController.users_delete_users_from_group);

export default router;
