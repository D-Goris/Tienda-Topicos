import {Router} from 'express';
import tiendaController from './tienda.controller.ts'

const tiendaRouter : Router = Router();

//método 01
tiendaRouter.get('/catalogo', tiendaController.obtenercatalogo);

//método 02
//tiendaRouter.get('/comprar-fabrica',tiendaController);

//método 03
//tiendaRouter.get('/comprar-chatarra',tiendaController);

//método 04
//tiendaRouter.get('/cupones/validar',tiendaController);

//método 05
//tiendaRouter.get('/historial/:jugador_id',tiendaController);

//método 06
//tiendaRouter.get('/ofertas/crear',tiendaController);

//método 07
//tiendaRouter.get('/stock/actualizar',tiendaController);

//método 08
//tiendaRouter.get('/eventos/embargo',tiendaController);

//método 09
//tiendaRouter.get('/destacados',tiendaController);

//método 10
//tiendaRouter.get('/devolucion',tiendaController);

export default tiendaRouter;
