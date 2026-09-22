import { safeParse } from 'zod'
import { test, expect } from 'vitest'
import { updateTaskSchema, createTaskSchema, taskQuerySchema } from '../src/modules/tasks/tasks.schema.js'


//CREACION
test('acepta nombre valido y omitir completed', () => {
    const testObj = {
        title: 'Titulo de la tarea'
    }

    const objValidado = safeParse(createTaskSchema, testObj)

    expect(objValidado.success).toBe(true)
})

test('rechaza un nombre compuesto solo por espacios', () => {
    const testObj = {
        title: '       ',
    }

    const objValidado = safeParse(createTaskSchema, testObj)

    expect(objValidado.success).toBe(false)
})

test('elimina los espacios de los extremos del nombre', () => {
    const obj = {
        title: ' Mi tarea ',
    }

    const objValidado = safeParse(createTaskSchema, obj);

    expect(objValidado.success).toBe(true)

    expect(objValidado.data?.title).toBe('Mi tarea')
})

test('acepta un nombre de 200 caracteres', () => {
    const obj = {
        title: 'M'.repeat(200),
    }

    const objValidado = safeParse(createTaskSchema, obj);

    expect(objValidado.success).toBe(true)
})

test('rechaza un nombre de 201 caracteres', () => {
    const obj = {
        title: 'M'.repeat(201),
    }

    const objValidado = safeParse(createTaskSchema, obj);

    expect(objValidado.success).toBe(false)

})

//CREACION COMPLETED
test('acepta true', () => {
    const obj = {
        title: 'TITULO',
        completed: true
    }

    const objValido = safeParse(createTaskSchema, obj);

    expect(objValido.success).toBe(true)
})

test('acepta false', () => {
    const obj = {
        title: 'TITULO',
        completed: false
    }

    const objValido = safeParse(createTaskSchema, obj);

    expect(objValido.success).toBe(true)
})

test('rechaza "false"', () => {
    const obj = {
        title: 'TITULO',
        completed: 'false'
    }

    const objValido = safeParse(createTaskSchema, obj);

    expect(objValido.success).toBe(false)
})

//ACTUALIZACION
test('rechaza un nombre compuesto solo por espacios', () => {
    const testObj = {
        title: '       ',
    }

    const objValidado = safeParse(updateTaskSchema, testObj)

    expect(objValidado.success).toBe(false)
})

test('acepta titulo valido', () => {
    const testObj = {
        title: 'Titulo valido',
    }

    const objValidado = safeParse(updateTaskSchema, testObj)

    expect(objValidado.success).toBe(true)
})

test('acepta solo completed con valor false', () => {
    const testObj = {
        completed: false
    }

    const objValidado = safeParse(updateTaskSchema, testObj)

    expect(objValidado.success).toBe(true)
})

test('rechaza una actualización vacía', () => {
    const testObj = {}

    const objValidado = safeParse(updateTaskSchema, testObj)

    expect(objValidado.success).toBe(false)
})

//CONSULTA
test('acepta "true"', () => {
    const testObj = {
        completed: "true"
    }
    const objValidado = safeParse(taskQuerySchema, testObj)

    expect(objValidado.data?.completed).toBe(true)
    expect(objValidado.success).toBe(true)
});

test('acepta "false"', () => {
    const testObj = {
        completed: "false"
    }
    const objValidado = safeParse(taskQuerySchema, testObj)

    expect(objValidado.data?.completed).toBe(false)
    expect(objValidado.success).toBe(true)
});

test('rechaza otros textos', () => {
    const testObj = {
        completed: "texto"
    }
    const objValidado = safeParse(taskQuerySchema, testObj)

    expect(objValidado.success).toBe(false)
});

test('aplica valores predeterminados de paginación', () => {
    const testObj = {}
    const objValidado = safeParse(taskQuerySchema, testObj)

    expect(objValidado.success).toBe(true)
    expect(objValidado.data?.page).toBe(1)
    expect(objValidado.data?.limit).toBe(10)
});