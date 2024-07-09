import { ProductServices } from './Products.services';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  res
    .status(httpStatus.OK)
    .json({
      success: true,
      message: 'Product Created Successfully!',
      data: result,
    });
});

export const ProductController = {
  createProduct,
};
