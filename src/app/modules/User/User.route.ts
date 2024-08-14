import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidations } from './User.validation';
import { UserController } from './User.controller';

export { Router } from 'express';

const router = Router();

router.post(
  '/create-user',
  validateRequest(UserValidations.createUserSchemaValidation),
  UserController.createUser,
);

export const UserRoutes = router;