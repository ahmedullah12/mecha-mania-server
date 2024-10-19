/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TProduct = {
  title: string;
  brand: string;
  description: string;
  quantity: number;
  price: number;
  rating: number;
  imageUrl: string;
};

export interface ProductModel extends Model<TProduct> {
  isProductExists(id: string): Promise<TProduct | null>;
}
