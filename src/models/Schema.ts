import mongoose, { Schema } from 'mongoose';
import { Pieza } from './Pieza.ts';

const piezaSchema = new Schema<Pieza>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    sku: {
        type: String,
        required: [true, 'El SKU es obligatorio'],
        unique: true,
        uppercase: true,
        trim: true,
        match: [ /^SKU-[a-zA-Z0-9]{1,5}-\d{2}$/, "El sku debe cumplir con el formato 'SKU-{1 a 5 caracteres}-{00 al 99}'" ]
    },
    nombre_item: {
        type: String,
        required: [true, 'El nombre_item es requerido'],
        trim: true
    },
    nombre_robot: {
        type: String,
        default: ''
    },
    tipo: {
        type: String,
        required: true,
        enum: ['chasis', 'arma', 'motor', 'escudo']
    },
    durabilidad_max: {
        type: Number,
        required: true,
        min: [1, 'La durabilidad máxima debe ser mayor a 0'],
        max: [100, 'La durabilidad máxima no puede superar 100']
    },
    durabilidad_actual: {
        type: Number,
        required: true,
        min: [1, 'La durabilidad actual no puede ser negativa o nula'],
        max: [100, 'La durabilidad actual no puede superar 100']
    },
    fuerza_bono: {
        type: Number,
        required: true,
        min: [0, 'El bono de fuerza mínimo es 0'],
        max: [200, 'El bono de fuerza máximo es 200']
    },
    defensa_bono: {
        type: Number,
        required: true,
        min: [0, 'El bono de defensa mínimo es 0'],
        max: [200, 'El bono de defensa máximo es 200']
    },
    precio_lista: {
        type: Number,
        required: true,
        min: [0.01, 'El precio no puede ser nulo o negativo']
    },
    precio_final: {
        type: Number,
        required: true,
        min: 0
    },
    es_chatarra: {
        type: Boolean,
        required: true
    },
    descuento_porcentaje: {
        type: Number,
        default: 0,
        min: [0, 'El descuento mínimo es 0%'],
        max: [80, 'El descuento máximo es 80%']
    },
    imagen_url: {
        type: String,
        required: [true, 'La imagen_url es obligatoria']
    },
    descripcion: {
        type: String,
        default: ''
    },
    stock_disponible: {
        type: Number,
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    }
}, {
    collection: 'Piezas',
    versionKey: false
});

export const PiezaModel = mongoose.models.Pieza || mongoose.model<Pieza>('Pieza', piezaSchema);