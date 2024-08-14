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

router.post(
  '/login',
  validateRequest(UserValidations.loginUserSchemaValidation),
  UserController.loginUser,
);

export const UserRoutes = router;