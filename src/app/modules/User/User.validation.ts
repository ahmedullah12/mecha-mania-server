import { z } from "zod";


const createUserSchemaValidation = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
    })
});

export const UserValidations = {
    createUserSchemaValidation,
}