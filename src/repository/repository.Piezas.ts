import { Pieza } from '../models/Pieza.ts';
import mongoose from 'mongoose';
import { PiezaModel } from '../models/Schema.ts';

export class repositoryPiezas {
    readonly URI: string;

    constructor() {
        this.URI = 'mongodb://localhost:27017/Tienda_Tópicos';
    }

    async conectaraBD(): Promise<void> {
        try {
            if (mongoose.connection.readyState === 1) return;

            await mongoose.connect(this.URI);
            console.log('Conexión exitosa a MongoDB con Mongoose');

        } catch (error) {
            throw new Error(`No se pudo conectar a la b/d`);
        }
    }

    async leerTabla(): Promise<Pieza[]> {
        await this.conectaraBD();

        return await PiezaModel.find().lean<Pieza[]>();
    }

    async buscarPorId(id: string | mongoose.Types.ObjectId): Promise<Pieza | null> {
        await this.conectaraBD();

        return await PiezaModel.findById(id).lean<Pieza | null>();
    }

    async buscarPorsku(sku: string): Promise<Pieza | null> {
        await this.conectaraBD();

        return await PiezaModel.findOne({ sku: sku.toUpperCase() }).lean<Pieza | null>();
    }

    async insertarPieza(pieza: Pieza): Promise<boolean> {
        try {
            await this.conectaraBD();

            const nuevaPieza = await PiezaModel.create(pieza);
            return nuevaPieza._id !== undefined && nuevaPieza._id !== null;

        } catch (error: any) {
            throw new Error(`Error al insertar la pieza: ${error.message}`);
        }
    }

    async modificarPieza(piezaNueva: Pieza): Promise<boolean> {
        try {
            await this.conectaraBD();

            const { _id, ...datosSinId } = piezaNueva;
            const resultado = await PiezaModel.updateOne(
                { _id: _id },
                { $set: datosSinId },
                { runValidators: true }
            );

            return resultado.matchedCount > 0;
        } catch (error: any) {
            throw new Error(`Error al modificar la pieza: ${error.message}`);
        }
    }

    async eliminarPieza(pieza: Pieza): Promise<boolean> {
        try {
            await this.conectaraBD();

            const resultado = await PiezaModel.deleteOne({ _id: pieza._id });
            return resultado.deletedCount > 0;
            
        } catch (error: any) {
            throw new Error(`Error al eliminar la pieza: ${error.message}`);
        }
    }

    async cerrarConexion(): Promise<void> {
        await mongoose.connection.close();
    }
}