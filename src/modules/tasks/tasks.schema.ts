import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'El título es obligatorio'),

    completed: z
            .boolean()
            .optional()
});

export const updateTaskSchema = createTaskSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        { 
            message: 'Debes enviar al menos un campo'
        }
    );

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
