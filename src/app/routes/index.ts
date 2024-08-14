import express from 'express';
import { ProductRoutes } from '../modules/Products/Products.route';
import { UserRoutes } from '../modules/User/User.route';

const router = express.Router();

const moduleRouter = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
