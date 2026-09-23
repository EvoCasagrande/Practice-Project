import { test, expect, vi } from 'vitest';
import { autorizarAdmin } from '../src/middlewares/autorizarAdmin.js'
import type { Request, Response } from 'express';

test('rechaza a un usuario con rol USER' , () => {
    const req =  {} as Request;
    const res =  {
        locals: {
            role: 'USER'
        } 
    } as unknown as Response

    const next = vi.fn()

    expect(() => {
        autorizarAdmin(req, res, next)
    }).toThrow(expect.objectContaining({ message: 'Acceso no autorizado', statusCode: 403 }))

    expect(next).not.toHaveBeenCalled()
})

test('permite continuar a un administrador', () => {
    const req =  {} as Request;
    const res =  {
        locals: {
            role: 'ADMIN'
        } 
    } as unknown as Response

    const next = vi.fn()


    autorizarAdmin(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
})