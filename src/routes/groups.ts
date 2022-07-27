import express from 'express';

import usersRoutes from './users';

import groupsController from '../controllers/groupsController';

const router = express.Router();

router.get('/', groupsController.groups_get_all);
router.get('/:groupId', groupsController.groups_get_group);
router.post('/', groupsController.groups_create_group);
router.patch('/:groupId', groupsController.groups_update_group);
router.delete('/:groupId', groupsController.groups_delete_group);

router.use('/:groupId/users', usersRoutes);

export default router;
