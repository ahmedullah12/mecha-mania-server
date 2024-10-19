import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { ProductsSearchableFields } from './Products.constant';
import { TProduct } from './Products.interface';
import { Product } from './Products.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);

  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Product.find(), query)
    .search(ProductsSearchableFields)
    .filter();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const isProductExists = await Product.isProductExists(id);
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const result = await Product.findById(id);

  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const isProductExists = await Product.isProductExists(id);
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const isProductExists = await Product.isProductExists(id);
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const result = await Product.findByIdAndDelete(id);

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
