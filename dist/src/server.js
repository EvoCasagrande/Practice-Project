import app from './app';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('El servidor esta escuchando correctamente!');
});
//# sourceMappingURL=server.js.map