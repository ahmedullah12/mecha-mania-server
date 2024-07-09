import { model, Schema } from 'mongoose';
import { TProduct } from './Products.interface';

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Product = model<TProduct>("Product", productSchema);
