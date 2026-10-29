//Aqui deberian estar las funciones del back
import { Pieza } from "../models/Pieza.ts"

const tiendaservice = {
    obtenerCatalogo : ()=>{
        //Aqui se deberia implementar la conexion con la bd y el procesamiento de la info pero por falta de
        //bd actual solo esta devolviendo un objeto pre hecho para observar como funciona
        return {mensaje : "mensaje prueba"}
    }
}

export default tiendaservice;