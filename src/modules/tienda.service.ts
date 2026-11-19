import { Pieza } from "../models/Pieza.ts"
import { repositoryPiezas } from "../repository/repository.Piezas.ts";

const bd = new repositoryPiezas();
const API_Base : string = '/api/v1';

export interface filtrosCatalogo {
    tipo? : string;
    es_chatarra? : boolean 
    precio_max? : number
}

const tiendaservice = {

    obtenerCatalogo : async ( filtros : filtrosCatalogo) => {
        let catalogo : Pieza[] = []

        let catalogoFabrica : Pieza[] = await bd.leerTabla()

        let catalogoChatarreria : Pieza[] = []
        try{
            const respuesta = await fetch(`${API_Base}/chatarreria/items`);
            if (respuesta.ok) {
                const json = await respuesta.json();
                
                if (json && Array.isArray(json.items_chatarra)) {
                    catalogoChatarreria = json.items_chatarra;
                }else{
                    console.error("M2 devolvio un array invalido")
                }
            }
        }catch (error){
            console.error("No se pudo conectar con M2")
        }

        catalogo = [...catalogoFabrica , ...catalogoChatarreria]

        if (filtros.tipo !== undefined) {
            catalogo = catalogo.filter(
                (p) => p.tipo.toLowerCase() === filtros.tipo
            );
        }

        if (filtros.es_chatarra !== undefined) {
            catalogo = catalogo.filter(
                (p) => p.es_chatarra === filtros.es_chatarra
            );
        }

        if (filtros.precio_max !== undefined && !isNaN(filtros.precio_max)) {
            catalogo = catalogo.filter(
                (p) => p.precio_final <= filtros.precio_max!
            );
        }

        return{
            items : catalogo,
            total : catalogo.length
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