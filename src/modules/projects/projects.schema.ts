import { z } from 'zod';

export const createProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'El nombre es obligatorio'),

    description: z
                .string()
                .trim()
                .min(1, 'La descripcion es obligatoria')
});

export const updateProjectSchema = createProjectSchema
    .partial()
    .refine((data) =>
        Object.keys(data).length > 0,
        {
            message: 'Debes enviar al menos un campo'
        }
    );

export type CreateProjectInput = z.infer<typeof createProjectSchema>

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>