import { test, expect, vi, afterEach } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../src/config/env.js'
import { prisma } from '../src/lib/prisma.js'

test('devuelve 404 para una ruta inexistente', async() => {
    const testedApp = request(app);

    const result = await testedApp.get('/ruta-inexistente');

    expect(result.status).toBe(404);
    expect(result.body.status).toBe('error');
    expect(result.body.message).toBe('Lo sentimos, esta página no existe.')
})

test('rechaza el acceso sin credenciales', async() => {
    const testedApp = request(app);

    const result = await testedApp.get('/api/v1/users');

    expect(result.status).toBe(401);
    expect(result.body.status).toBe('error');
    expect(result.body.message).toBe('Acceso no autorizado');
})

test('devuelve 401 si tiene token invalido', async() => {
    const testedApp = request(app);
    const result = await testedApp.get('/api/v1/users').set('Authorization', 'Bearer token-invalido');

    expect(result.status).toBe(401);
    expect(result.body.status).toBe('error');
    expect(result.body.message).toBe('Acceso no autorizado')
})

test('devuelve 401 si tiene token valido pero caducado', async() => {
    const testedApp = request(app);
    const testToken = jwt.sign({ id: 13}, jwtSecret, {
        expiresIn: -60
    })
    const result = await testedApp.get('/api/v1/users').set('Authorization', `Bearer ${testToken}`);

    expect(result.status).toBe(401);
    expect(result.body.status).toBe('error');
    expect(result.body.message).toBe('Acceso no autorizado')
})

test('devuelve 401 si tiene token valido pero se elimino la cuenta', async() => {
    const testedApp = request(app);

    const testToken = jwt.sign({ id: 13}, jwtSecret, {
        expiresIn: 10000
    })

    const consulta = vi.spyOn(prisma.user, 'findUnique');
    consulta.mockResolvedValue(null)

    const result = await testedApp.get('/api/v1/users').set('Authorization', `Bearer ${testToken}`);

    expect(consulta).toHaveBeenCalledWith(expect.objectContaining({ where: {
        id: 13
    }}))
    expect(consulta).toHaveBeenCalledTimes(1)
    expect(result.status).toBe(401);
    expect(result.body.status).toBe('error');
    expect(result.body.message).toBe('Acceso no autorizado')
})

test('json malformado devuelve 400', async() => {
    const testObj = "{'name': 'Evo'"

    const testedApp = request(app);

    const result = await testedApp.post('/ruta-inexistente').set('Content-Type', 'application/json').send(testObj);

    expect(result.status).toBe(400);
    expect(result.body.status).toBe('error');
    expect(result.body.message).toBe('El cuerpo de la petición no contiene un JSON válido')
})

test('devuelve 413 cuando el cuerpo supera el límite', async() => {
    const testObj = {
        "name": 'A'.repeat(200000),
    }

    const testedApp = request(app);

    const result = await testedApp.post('/ruta-inexistente').set('Content-Type', 'application/json').send(testObj);

    expect(result.status).toBe(413);
    expect(result.body.status).toBe('error');
    expect(result.body.message).toBe('El contenido enviado supera el limite permitido')
})

test('superar el rate limit de login devuelve 429', async() => {
    const testObj = {}

    const testedApp = request(app);

    let i = 5
    while(i > 0) {
        const result = await testedApp.post('/api/v1/auth/login').set('Content-Type', 'application/json').send(testObj);
        expect(result.status).toBe(400);
        i--
    }

    const result = await testedApp.post('/api/v1/auth/login').set('Content-Type', 'application/json').send(testObj);

    expect(result.status).toBe(429);
    expect(result.body.status).toBe('error');
    expect(result.body.message).toBe('Supero el limite de solicitudes. Intente de nuevo mas tarde')
})

test('superar el rate limit de register devuelve 429', async() => {
    const testObj = {}

    const testedApp = request(app);

    let i = 3
    while(i > 0) {
        const result = await testedApp.post('/api/v1/auth/register').set('Content-Type', 'application/json').send(testObj);
        expect(result.status).toBe(400);
        i--
    }

    const result = await testedApp.post('/api/v1/auth/register').set('Content-Type', 'application/json').send(testObj);

    expect(result.status).toBe(429);
    expect(result.body.status).toBe('error');
    expect(result.body.message).toBe('Supero el limite de solicitudes. Intente de nuevo mas tarde')
})


afterEach(vi.restoreAllMocks);