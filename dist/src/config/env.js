import "dotenv/config";
const getJwtSecret = () => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET no esta definida');
    }
    return jwtSecret;
};
export const jwtSecret = getJwtSecret();
//# sourceMappingURL=env.js.map