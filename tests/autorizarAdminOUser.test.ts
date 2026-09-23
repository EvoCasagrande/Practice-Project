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

test('acepta dueño permitido sobre su cuenta', () => {
    const req =  {
        params: {
            userId: '7'
        }
    } as unknown as Request<{ userId: string }>;

    const res =  {
        locals: {
            userId: 7,
            role: 'USER'
        } 
    } as unknown as Response

    const next = vi.fn()

    autorizarUsuarioOAdmin(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
})

test('acepta a administrador sobre cuenta ajena', () => {
    const req =  {
        params: {
            userId: '7'
        }
    } as unknown as Request<{ userId: string }>;

    const res =  {
        locals: {
            userId: 12,
            role: 'ADMIN'
        } 
    } as unknown as Response

    const next = vi.fn()

    autorizarUsuarioOAdmin(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
})

test('rechaza id invalido', () => {
    const req =  {
        params: {
            userId: 'abc'
        }
    } as unknown as Request<{ userId: string }>;

    const res =  {
        locals: {
            userId: 12,
            role: 'ADMIN'
        } 
    } as unknown as Response

    const next = vi.fn()

    expect(() => {
        autorizarUsuarioOAdmin(req, res, next)
    }).toThrow(expect.objectContaining({ statusCode:400, message: 'El userId debe ser un entero positivo y menor a 2147483648.' }))

    expect(next).not.toHaveBeenCalled()
})