import { model, Schema } from 'mongoose';
import { ProductModel, TProduct } from './Products.interface';

const productSchema = new Schema<TProduct>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
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
}, {
  timestamps: true,
});

productSchema.statics.isProductExists = async function (id: string) {
  const product = await Product.findById(id);
  return !!product;
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
