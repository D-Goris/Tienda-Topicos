//Aqui deberia estar un controlador que revise y procese la petición http y luego la mande al service, además deberia de enviar los códigos del protocolo http
import type { Request, Response } from 'express';
import tiendaservice from './tienda.service.ts';

const tiendaController = {
   
    obtenercatalogo: (req: Request, res: Response) => {
        //En otros metodos distintos a get, deberia comprobar que la peticion este correcta como por ejemplo
        //si envia una pieza que tenga todos los datos de pieza como id, sku, tipo, etc

        //en este caso como es get y no estoy pidiendo un id no tengo que revisar nada y puedo directamente entregar
        const resultado = tiendaservice.obtenerCatalogo()
        return res.status(200).json(resultado);
    }
}

export default tiendaController;