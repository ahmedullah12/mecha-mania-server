import express from 'express';

const router = express.Router();

const moduleRouter = [
  {
    path: '/auth',
    route: "",
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
