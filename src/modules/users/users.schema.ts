import { z } from 'zod';

export const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'El nombre es obligatorio'),

    email: z    
    .string()
    .trim()
    .toLowerCase()
    .pipe(
        z.email({
            message: 'Correo electrónico no válido',
        }),
    ),   
});

export const updateUserSchema = createUserSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: 'Debes enviar al menos un campo'
        }
    );

export type CreateUserInput = z.infer<typeof createUserSchema>

export type UpdateUserInput = z.infer<typeof updateUserSchema>