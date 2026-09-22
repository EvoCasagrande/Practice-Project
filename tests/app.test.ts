import { test, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

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