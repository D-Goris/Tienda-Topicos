import { Pieza } from "../models/Pieza.ts"
import { repositoryPiezas } from "../repository/repository.Piezas.ts";

const bd = new repositoryPiezas();
const API_Base : string = '/api/v1';
const tiendaservice = {

    obtenerCatalogo : async () => {
        let catalogoFabrica : Pieza[] = await bd.leerTabla();
        //Por ahora hasta no tener un proyecto con el cual probar, solo tomamos fabrica
        //let catalogoChatarreria : Pieza[] =  await fetch(`${API_Base}/chatarreria/items`)

        return{
            items : catalogoFabrica,
            Total : catalogoFabrica.length
        };
    },

    comprarFabrica : async (jugador_id : string, sku : string, saldo : number) => {
        
    },

    comprarChatarreria : async () => {
        
    },

    validarCupon : async () => {
        
    },

    obtenerHistorial : async () => {
        
    },

    reabastecerStock : async () => {
        
    },

    webhook : async () => {
        //Por ahora no tengo ni idea de como implementarlo
    },

    ObtenerHeroBanner : async () => {
        
    },

    devolucion : async () => {
        
    }
}

export default tiendaservice;