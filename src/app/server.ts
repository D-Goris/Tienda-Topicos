import express, { type Express, type Request, type Response } from 'express';
//import indexRouter from '../modules/tienda.routes.ts" esto deberia dirigir al entutador de la api
//pero no esta hecho por ahora

class Server {
  readonly app : Express;
  readonly port : number;
    constructor() {
        this.app = express();
        this.port = 3000;

        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        //Enlaza el enrutador central esta desactivado por ahora
        //this.app.use();

        this.app.use((req, res) => {
            res.status(404).json({ msg: 'Ruta no encontrada en la API de Tienda' });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo con éxito en http://localhost:${this.port}`);
        });
    }
}

export default Server;

//Si quieren prender el server usen npm run dev en la consola distinta de powershell ejemplo git bash
//Si no funciona revisen que tienen las dependencias instaladas con npm install express y vuelva a intentar