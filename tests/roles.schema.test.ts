import { test, expect} from 'vitest'
import { registerSchema } from "../src/modules/auth/auth.schema.js";
import { updateUserSchema } from "../src/modules/users/users.schema.js";
import { safeParse } from "zod";

test('el schema omite role al enviarlo en el cuerpo de la peticion', () => {
    const testObj = {
        name: 'Evo',
        email: 'casagrandeevo@gmail.com',
        password: 'LaContraseña123',
        role: 'ADMIN'
    }

    const resultado = safeParse(registerSchema, testObj)

    expect(resultado.success).toBe(true);
    expect(resultado.data).not.toHaveProperty('role');
})

test('el schema omite role al actualizar los datos', () => {
    const testObj = {
        name: 'Evo',
        role: 'ADMIN'
    }

    const resultado = safeParse(updateUserSchema, testObj)

    expect(resultado.success).toBe(true);
    expect(resultado.data?.name).toBe('Evo');
    expect(resultado.data).not.toHaveProperty('role');
})