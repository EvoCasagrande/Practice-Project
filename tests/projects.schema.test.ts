import { safeParse } from 'zod'
import { test, expect } from 'vitest'
import { updateProjectSchema, createProjectSchema } from '../src/modules/projects/projects.schema.js'

//CREACION
test('rechaza un nombre compuesto solo por espacios', () => {
    const testObj = {
        name: '       ',
        description: 'hola mi nombre es evo'
    }

    const objValidado = safeParse(createProjectSchema, testObj)

    expect( objValidado.success).toBe(false)
})

test('elimina los espacios de los extremos del nombre', () => {
    const obj = {
        name: ' Mi proyecto ',
        description: 'hola hola hola hola'
    }

    const objValidado = safeParse(createProjectSchema, obj);

    expect(objValidado.success).toBe(true)

    expect(objValidado.data?.name).toBe('Mi proyecto')
})

test('acepta un nombre de 100 caracteres', () => {
    const obj = {
        name: 'M'.repeat(100),
        description: 'hola hola hola hola'
    }

    const objValidado = safeParse(createProjectSchema, obj);

    expect(objValidado.success).toBe(true)
})

test('rechaza un nombre de 101 caracteres', () => {
    const obj = {
        name: 'M'.repeat(101),
        description: 'hola hola hola hola'
    }

    const objValidado = safeParse(createProjectSchema, obj);

    expect(objValidado.success).toBe(false)

})

//ACTUALIZACION
test('acepta solo un nombre válido', () => {
    const obj = {
        name: 'Nuevo nombre'
    }

    const objValido = safeParse(updateProjectSchema, obj)

    expect(objValido.success).toBe(true)
})

test('rechaza un objeto vacio', () => {
    const obj = {}

    const objValido = safeParse(updateProjectSchema, obj)

    expect(objValido.success).toBe(false)
})

test('rechaza una actualización con nombre compuesto solo por espacios', () => {
    const obj = {
        name: '    '
    }

    const objValido = safeParse(updateProjectSchema, obj)

    expect(objValido.success).toBe(false)
})