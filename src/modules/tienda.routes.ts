//Aqui deberia estar solo las rutas y su posterior controlador
import {Router} from 'express';
import tiendaController from './tienda.controller.ts'

const tiendaRouter : Router = Router();

tiendaRouter.get('/catalogo',tiendaController.obtenercatalogo);

export default tiendaRouter;

//Si quieren ver el api en accion inicien el server y por medio de thunder client o el navegador
//ponen la ruta de la api "http://localhost:3000/api/v1/tienda/catalogo" y con ello deberian poder observar el mensaje
// en este caso el navegador funciona para verlo porque es un metodo get, si fuera otro metodo no funcionaria por falta de body