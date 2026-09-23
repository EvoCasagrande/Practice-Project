import { test, expect, vi } from 'vitest'
import { autorizarUsuarioOAdmin } from '../src/middlewares/autorizarUsuarioOAdmin.js'
import type { Request, Response } from 'express';

test('rechaza a un usuario que intenta acceder a una cuenta ajena', () => {
    const req =  {
        params: {
            userId: '12'
        }
    } as unknown as Request<{ userId: string }>;

    const res =  {
        locals: {
            userId: 7,
            role: 'USER'
        } 
    } as unknown as Response

    const next = vi.fn()

    expect(() => {
        autorizarUsuarioOAdmin(req, res, next)
    }).toThrow(expect.objectContaining({ statusCode: 403}))

    expect(next).not.toHaveBeenCalled()
})