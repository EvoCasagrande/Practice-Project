import { z } from "zod";

export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "El título es obligatorio")
        .max(200, "El maximo de caracteres para el titulo de la tarea es 200"),

    completed: z.boolean().optional(),
});

export const updateTaskSchema = createTaskSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Debes enviar al menos un campo",
    });

export const taskQuerySchema = z.object({
    completed: z
        .enum(["true", "false"])
        .transform((val) => {
            if (val === "true") {
                return true;
            }
            return false;
        })
    .optional(),

    search: z
        .string()
        .trim()
        .min(1, "Search debe tener como minimo 1 caracter")
        .max(200, "Search debe tener como maximo 200 caracteres")
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
        .default(10)
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export type TaskQueryInput = z.infer<typeof taskQuerySchema>;
