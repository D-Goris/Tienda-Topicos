import { Pieza } from '../models/Pieza.ts';
import { MongoClient, Collection, type UpdateResult, type InsertOneResult, type DeleteResult, type ObjectId} from 'mongodb';

export class repositoryPiezas{
    readonly URI : string;
    readonly cliente : MongoClient;
    readonly tabla : Collection<Pieza>;

    constructor(){
        this.URI='mongodb://localhost:27017/Tienda_Tópicos'
        this.cliente = new MongoClient(this.URI);
        this.tabla = this.cliente.db('Tienda_Tópicos').collection('Piezas');
    }

    async conectaraBD() : Promise<void> {
        try {
            await this.cliente.connect()
            console.log('Conexión exitosa a MongoDB');
            
        } catch (error) {
            throw new Error(`No sé puedo conectar a la b/d`)
        }
    }

    async leerTabla() : Promise<Pieza[]> {
        let resultado : Pieza[];
        await this.conectaraBD()

        resultado = await this.tabla.find().toArray();

        return resultado;
    }

    async buscarPorId(id: ObjectId): Promise<Pieza | null> {
        await this.conectaraBD();
        return await this.tabla.findOne({ _id: id });
    }

    async buscarPorsku(sku : string): Promise<Pieza | null> {
        await this.conectaraBD();
        return await this.tabla.findOne({ sku : sku.toUpperCase() });
    }
    
    async insertarPieza(pieza : Pieza) : Promise<boolean>{
        try {
            let resultado : InsertOneResult<Pieza>;
            await this.conectaraBD();

            resultado= await this.tabla.insertOne(pieza);

            return resultado.acknowledged;

        } catch (error) {
            throw new Error("Error al insertar la pieza")

        }
        
    }

    async modificarPieza(piezaNueva : Pieza) : Promise<boolean>{
        try {
           let resultado : UpdateResult<Pieza>;
            await this.conectaraBD();
            const { _id, ...datosSinId } = piezaNueva;
            resultado = await this.tabla.updateOne({ _id: _id }, { $set: datosSinId });

            if(resultado.matchedCount === 0 ) return false;
            return true;

        } catch (error) {
            throw new Error("Error al modificar la pieza")
        }   
    }

    async eliminarPieza(pieza : Pieza) : Promise<boolean>{
        try {
            let resultado : DeleteResult;
            await this.conectaraBD();

            resultado= await this.tabla.deleteOne({_id : pieza._id});

            if(resultado.deletedCount === 0 ) return false;
            return true;

        } catch (error) {
            throw new Error("Error al eliminar la pieza")

        }
    }

}
