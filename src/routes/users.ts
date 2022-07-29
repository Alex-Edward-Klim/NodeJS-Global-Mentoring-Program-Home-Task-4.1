import express from 'express';

import usersController from '../controllers/usersController';

const router = express.Router();

router.get('/', usersController.users_get_all);
router.get('/:userId', usersController.users_get_user);
router.post('/', usersController.users_create_user);
router.patch('/:userId', usersController.users_update_user);
router.delete('/:userId', usersController.users_delete_user);

export default router;
