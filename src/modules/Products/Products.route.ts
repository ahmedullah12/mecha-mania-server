import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ProductValidations } from './Products.validation';
import { ProductController } from './Products.controller';

const router = Router();

router.post(
  '/create-product',
  validateRequest(ProductValidations.createProductSchemaValidation),
  ProductController.createProduct,
);

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getSingleProduct);

router.put(
  '/:id',
  validateRequest(ProductValidations.updateProductSchemaValidation),
  ProductController.updateProduct,
);
export const ProductRoutes = router;
