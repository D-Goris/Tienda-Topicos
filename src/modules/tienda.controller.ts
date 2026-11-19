import type { Request, Response } from 'express';
import tiendaservice from './tienda.service.ts';
import type {filtrosCatalogo} from './tienda.service.ts'

const tiendaController = {
   
    obtenerCatalogo : async (req: Request, res: Response) => {
        try{
            const {tipo, es_chatarra, precio_max} = req.query;
            const filtros : filtrosCatalogo = {};

            if (tipo !== undefined) {
                if (typeof tipo === 'string' && (tipo.toLowerCase() === 'chasis' || tipo.toLowerCase() === 'arma' || tipo.toLowerCase() === 'escudo' || tipo.toLowerCase() === 'motor')) {
                    filtros.tipo = tipo.toLowerCase();
                } else {
                    return res.status(400).json({
                        error: "Un tipo solo puede ser 'chasis' | 'arma' | 'escudo' | 'motor'"
                    });
                }
            }

            if (es_chatarra !== undefined) {
                if (typeof es_chatarra === 'string' && (es_chatarra.toLowerCase() === 'true' || es_chatarra.toLowerCase() === 'false')) {
                    filtros.es_chatarra = es_chatarra.toLowerCase() === 'true';
                } else {
                    return res.status(400).json({
                        error: "El es_chatarra solo acepta valores booleanos 'true' o 'false'"
                    });
                }
            }

            if (precio_max !== undefined) {
                const precioNum = Number(precio_max);
                if (typeof precio_max === 'string' && precio_max.trim() !== '' && !isNaN(precioNum) && precioNum > 0) {
                    filtros.precio_max = precioNum;
                } else {
                    return res.status(400).json({
                        error: "El precio debe de ser un número positivo"
                    });
                }
            }

            const resultado = await tiendaservice.obtenerCatalogo(filtros)
            return res.status(200).json(resultado);

        } catch (error){
            return res.status(500).json({ 
                error: 'Error interno al consultar el catálogo unificado.' 
            });
        }
        
    },

    comprarFabrica : async (req: Request, res: Response) =>{

    },

    comprarChatarreria : async (req: Request, res: Response) =>{

    },

    validarCupon : async (req: Request, res: Response) =>{

    },

    obtenerHistorial : async (req: Request, res: Response) =>{

    },

    reabastecerStock : async (req: Request, res: Response) =>{

    },

    webhook : async (req: Request, res: Response) =>{

    },

    ObtenerHeroBanner : async (req: Request, res: Response) =>{

    },

    devolucion : async (req: Request, res: Response) =>{

    }

}

export default tiendaController;