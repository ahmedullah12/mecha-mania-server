'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductValidations = void 0;
const zod_1 = require('zod');
const createProductSchemaValidation = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string(),
    brand: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
    rating: zod_1.z.number(),
    imageUrl: zod_1.z.string(),
  }),
});
const updateProductSchemaValidation = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().optional(),
    brand: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    quantity: zod_1.z.number().optional(),
    rating: zod_1.z.number().optional(),
    imageUrl: zod_1.z.string().optional(),
  }),
});
exports.ProductValidations = {
  createProductSchemaValidation,
  updateProductSchemaValidation,
};
