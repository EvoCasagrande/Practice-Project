export const validarParametro = (value) => {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0) {
        return null;
    }
    return id;
};
//# sourceMappingURL=validarParametro.js.map