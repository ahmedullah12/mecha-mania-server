'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductRoutes = void 0;
const express_1 = require('express');
const validateRequest_1 = require('../../middlewares/validateRequest');
const Products_validation_1 = require('./Products.validation');
const Products_controller_1 = require('./Products.controller');
const router = (0, express_1.Router)();
router.post(
  '/create-product',
  (0, validateRequest_1.validateRequest)(
    Products_validation_1.ProductValidations.createProductSchemaValidation,
  ),
  Products_controller_1.ProductController.createProduct,
);
router.get('/', Products_controller_1.ProductController.getAllProducts);
router.get('/:id', Products_controller_1.ProductController.getSingleProduct);
router.put(
  '/:id',
  (0, validateRequest_1.validateRequest)(
    Products_validation_1.ProductValidations.updateProductSchemaValidation,
  ),
  Products_controller_1.ProductController.updateProduct,
);
router.delete('/:id', Products_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
