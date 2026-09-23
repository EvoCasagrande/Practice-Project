export const validarParametro = (value) => {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0 || id > 2147483647) {
        return null;
    }
    return id;
};
//# sourceMappingURL=validarParametro.js.map