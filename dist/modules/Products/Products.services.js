'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductServices = void 0;
const QueryBuilder_1 = __importDefault(require('../../builder/QueryBuilder'));
const Products_constant_1 = require('./Products.constant');
const Products_model_1 = require('./Products.model');
const createProductIntoDB = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Products_model_1.Product.create(payload);
    return result;
  });
const getAllProductsFromDB = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(
      Products_model_1.Product.find(),
      query,
    )
      .search(Products_constant_1.ProductsSearchableFields)
      .filter()
      .sort();
    const result = yield courseQuery.modelQuery;
    return result;
  });
const getSingleProductFromDB = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Products_model_1.Product.findById(id);
    return result;
  });
const updateProductIntoDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Products_model_1.Product.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      },
    );
    return result;
  });
const deleteProductFromDB = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Products_model_1.Product.findByIdAndDelete(id);
    return result;
  });
exports.ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
