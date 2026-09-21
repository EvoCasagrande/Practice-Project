import rateLimit from "express-rate-limit";

const loginRateLimitConfig = {
    windowMs: 10 * 60 * 1000,
    limit: 5,
    message: {
        status: 'error',
        message: 'Supero el limite de solicitudes. Intente de nuevo mas tarde'
    },
    standardHeaders: true,
    legacyHeaders: false
}

const registerRateLimitConfig = {
    windowMs: 60 * 60 * 1000,
    limit: 3,
    message: {
        status: 'error',
        message: 'Supero el limite de solicitudes. Intente de nuevo mas tarde'
    },
    standardHeaders: true,
    legacyHeaders: false
}

export const loginLimiter = rateLimit(loginRateLimitConfig)

export const registerLimiter = rateLimit(registerRateLimitConfig)