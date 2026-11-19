import { repositoryPiezas } from '../repository/repository.Piezas.ts';
import { Pieza } from '../models/Pieza.ts';
import { ObjectId } from 'mongodb';

//Este archivo sirve solo para poblar la b/d de datos si esta vacio, posiblemente tendramos que buscar una mejor manera en el futuro pero por ahora se queda así para ir probando
// Si se quiere apagar la b/d, el comando es: docker compose down
//SI se quiere no solo apagar si no tambien eliminar los datos de la b/d, el comando es: docker compose down -v

async function poblarBaseDeDatos() {
    
    const repo = new repositoryPiezas();
    const piezasExistentes = await repo.leerTabla();

    if (piezasExistentes.length > 0) {
         await repo.cerrarConexion();
        return;
    }else{
        const piezasIniciales: Pieza[] = [
        new Pieza( new ObjectId(), 'SKU-CHASI-01', 'Chasis Titán Mk-IV', 'chasis', 100, 95, 40, 120, 2500, 'https://ejemplo.com/img/chasis-titan.png', 0, 5, 'Titán Prime', 'Chasis pesado de aleación reforzada para combate frontal.' ),
        new Pieza( new ObjectId(), 'SKU-LASER-02', 'Cañón Láser de Plasma', 'arma', 80, 80, 150, 10, 1800, 'https://ejemplo.com/img/canon-laser.png', 20, 8, undefined, 'Emisor térmico de alta frecuencia capaz de fundir blindaje ligero.' ),
        new Pieza( new ObjectId(),'SKU-MOTOR-03', 'Propulsor Iónico Oxidado', 'motor', 100, 40, 30, 20, 1500, 'https://ejemplo.com/img/propulsor.png', 0, 3, undefined, 'Recuperado de la zona industrial. Funcional pero requiere mantenimiento.'),
        new Pieza( new ObjectId(), 'SKU-ESCUD-04', 'Generador de Escudo Agrietado', 'escudo', 100, 10, 0, 90, 2000, 'https://ejemplo.com/img/escudo-roto.png', 0, 2, undefined, 'Núcleo inestable; ofrece protección básica a bajo costo.' ),
        new Pieza( new ObjectId() , 'SKU-BRAZO-05', 'Brazo Hidráulico Estándar', 'arma', 90, 90, 75, 45, 950, 'https://ejemplo.com/img/brazo-hidraulico.png' )
        ];

        for (const pieza of piezasIniciales) {
            await repo.insertarPieza(pieza);
        }

        console.log("Se lleno la b/d con datos por default")
    }
    
    await repo.cerrarConexion();
    }

poblarBaseDeDatos();