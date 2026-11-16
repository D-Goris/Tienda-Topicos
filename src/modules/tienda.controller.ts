import type { Request, Response } from 'express';
import tiendaservice from './tienda.service.ts';

const tiendaController = {
   
    obtenercatalogo : async (req: Request, res: Response) => {
        const resultado = await tiendaservice.obtenerCatalogo()
        return res.status(200).json(resultado);
    }


}

export default tiendaController;