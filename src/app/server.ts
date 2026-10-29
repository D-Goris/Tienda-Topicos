import express, { type Express, type Request, type Response } from 'express';
import type {  ParamsDictionary } from 'express-serve-static-core';
import tiendaRouter from '../modules/tienda.routes.ts'
import cors from 'cors';

class Server {
  readonly app : Express;
  readonly port : number;
  readonly ruta : ParamsDictionary;
    constructor() {
        this.app = express();
        this.port = 3000;
        this.ruta = {
            api: '/api/v1/tienda'
        };

        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.ruta.api , tiendaRouter);

        this.app.use((req : Request, res : Response) => {
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
//Si no funciona revisen que tienen las dependencias instaladas con npm install express cors y vuelve a intentar