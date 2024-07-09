import { TProduct } from "./Products.interface";
import { Product } from "./Products.model";

const createProductIntoDB = async(payload: TProduct) => {
    const result = await Product.create(payload);

    return result;
};

const getAllProducts = async() => {

}


export const ProductServices = {
    createProductIntoDB,
    getAllProducts,
}