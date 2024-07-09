'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const Products_route_1 = require('../modules/Products/Products.route');
const router = express_1.default.Router();
const moduleRouter = [
  {
    path: '/products',
    route: Products_route_1.ProductRoutes,
  },
];
moduleRouter.forEach((route) => router.use(route.path, route.route));
exports.default = router;
