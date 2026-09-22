import { port } from './config/env.js';
import app from './app.js';

app.listen(port, () => {
    console.log('El servidor esta escuchando correctamente!')
})