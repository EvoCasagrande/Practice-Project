import { port } from './config/env.js';
import app from './app.js';
import { prisma } from '../src/lib/prisma.js'

const server = app.listen(port, () => {
    console.log('El servidor esta escuchando correctamente!')
})

let apagando = false;

const shutdown = () => {
    if(apagando){
        return
    }
    apagando = true

    const temporizador = setTimeout(() => {
        console.error('Se agoto el tiempo de espera')
        process.exit(1)
    }, 10000)

    console.log('Comienza el apagado');
    server.close(async(err) => {
        if(err) {
            process.exitCode = 1
            console.error(err)
        } else {
            console.log('El servidor se cerró correctamente')
        }

        try {
            await prisma.$disconnect()
        }catch (err) {
            process.exitCode = 1
            console.error(err)
        } finally {
            clearTimeout(temporizador)
        }
    })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)