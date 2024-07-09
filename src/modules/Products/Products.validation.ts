import { z } from "zod"

const createProductSchemaValidation = z.object({
    body: z.object({
        title: z.string(),
        brand: z.string(),
        price: z.number(),
        quantity: z.number(),
        rating: z.number(),
        imageUrl: z.string()
    })
});

const updateProductSchemaValidation = z.object({
    body: z.object({
        title: z.string().optional(),
        brand: z.string().optional(),
        price: z.number().optional(),
        quantity: z.number().optional(),
        rating: z.number().optional(),
        imageUrl: z.string().optional()
    })
});

export const ProductValidations = {
    createProductSchemaValidation,
    updateProductSchemaValidation
}