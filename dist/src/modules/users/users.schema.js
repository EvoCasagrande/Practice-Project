import { z } from 'zod';
export const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'El nombre es obligatorio'),
    email: z
        .email(),
});
export const updateUserSchema = createUserSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
    message: 'Debes enviar al menos un campo'
});
//# sourceMappingURL=users.schema.js.map