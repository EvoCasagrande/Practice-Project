import { z } from 'zod';

export const createProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'El nombre es obligatorio')
        .max(100, 'El maximo de caracteres para el nombre de proyecto es 100'),

    description: z
                .string()
                .trim()
                .min(1, 'La descripcion es obligatoria')
                .max(2000, 'El maximo de caracteres para la descripcion de proyecto es 2000'),
});

export const updateProjectSchema = createProjectSchema
    .partial()
    .refine((data) =>
        Object.keys(data).length > 0,
        {
            message: 'Debes enviar al menos un campo'
        }
    );

export const projectQuerySchema = z.object({
    search: z
        .string()
        .trim()
        .min(1, 'Search debe tener como minimo 1 caracter')
        .max(100, 'Search debe tener como maximo 100 caracteres')
        .optional(),

    page: z
        .coerce.number()
        .int()
        .min(1, 'Page debe ser un valor entero positivo')
        .default(1),

    limit: z
        .coerce.number()
        .int()
        .min(1, 'Limit debe ser un valor entero positivo')
        .max(100, 'Limit no debe superar el valor de 100')
        .default(10),

    sortBy: z
        .enum(['name', 'id'])
        .default('id'),

    order: z
        .enum(['asc', 'desc'])
        .default('asc')
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>

export type ProjectQueryInput = z.infer<typeof projectQuerySchema>