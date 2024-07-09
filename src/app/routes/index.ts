import express from 'express';
import { ProductRoutes } from '../modules/Products/Products.route';

const router = express.Router();

const moduleRouter = [
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
