import "dotenv/config";
const getJwtSecret = () => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret || jwtSecret.trim() === '') {
        throw new Error('JWT_SECRET no esta definida. Es obligatoria y no puede estar vacia');
    }
    return jwtSecret;
};
const getDatabaseUrl = () => {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl || databaseUrl.trim() === '') {
        throw new Error('DATABASE_URL no esta definida');
    }
    try {
        const url = {
            dbUrl: new URL(databaseUrl)
        };
        if (url.dbUrl.protocol !== 'postgresql:' && url.dbUrl.protocol !== 'postgres:') {
            throw new Error('DATABASE_URL debe ser una URL de PostgreSQL válida');
        }
    }
    catch (err) {
        throw new Error('DATABASE_URL debe ser una URL de PostgreSQL válida');
    }
    return databaseUrl;
};
const getPort = () => {
    const envPort = process.env.PORT;
    if (envPort === undefined) {
        const port = 3000;
        return port;
    }
    const parsedPort = Number(envPort);
    if (parsedPort >= 1 && parsedPort <= 65535 && Number.isInteger(parsedPort)) {
        return parsedPort;
    }
    throw new Error('PORT debe ser un entero positivo entre 1 y 65535.');
};
export const jwtSecret = getJwtSecret();
export const databaseUrl = getDatabaseUrl();
export const port = getPort();
//# sourceMappingURL=env.js.map