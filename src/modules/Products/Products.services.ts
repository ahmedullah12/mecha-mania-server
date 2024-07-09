import QueryBuilder from "../../builder/QueryBuilder";
import { ProductsSearchableFields } from "./Products.constant";
import { TProduct } from "./Products.interface";
import { Product } from "./Products.model";

const createProductIntoDB = async(payload: TProduct) => {
    const result = await Product.create(payload);

    return result;
};

const getAllProductsFromDb = async(query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Product.find(),
        query,
      )
        .search(ProductsSearchableFields)
        .filter()
        .sort();


    const result = await courseQuery.modelQuery;
    return result;
}


export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDb,
}