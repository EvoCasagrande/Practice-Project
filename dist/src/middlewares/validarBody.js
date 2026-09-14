export const validarBody = (schema) => {
    return (req, res, next) => {
        const resultado = schema.safeParse(req.body);
        if (!resultado.success) {
            res.status(400).json({
                status: 'error',
                message: 'Datos invalidos',
                errors: resultado.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                })),
            });
            return;
        }
        req.body = resultado.data;
        next();
    };
};
//# sourceMappingURL=validarBody.js.map