export const validarParametro = (value: string) => {
    const id = Number(value);

    if(!Number.isInteger(id) || id <= 0){
        return null
    }

    return id
}