import { ObjectId } from "mongodb";

export type tipo = 'chasis' | 'arma' | 'escudo' | 'motor'

export class Pieza {
    readonly _id : ObjectId;
    readonly sku : string;
    readonly nombre_item : string;
    readonly nombre_robot : string;
    readonly tipo : tipo;
    readonly durabilidad_max : number;
    readonly durabilidad_actual : number;
    readonly fuerza_bono : number;
    readonly defensa_bono : number;
    readonly precio_lista : number;
    readonly precio_final : number;
    readonly es_chatarra : boolean;
    readonly descuento_porcentaje : number;
    readonly imagen_url : string;
    readonly descripcion : string;
    readonly stock_disponible  : number; 

    constructor(_id : ObjectId, sku : string, nombre_item : string, tipo : tipo, durabilidad_max : number, 
                durabilidad_actual : number,fuerza_bono : number, defensa_bono : number, precio_lista : number, imagen_url : string, 
                descuento_porcentaje : number = 0, stock_disponible : number = 0, nombre_robot? : string, descripcion? : string){
        
        this._id = _id;
        
        //Verificación del sku
        const regex : RegExp = /^SKU-[a-zA-Z0-9]{1,5}-\d{2}$/;

        if(regex.test(sku.toUpperCase())){
            this.sku = sku;
        }else{
            throw new Error("El sku debe cumplir con el formato 'SKU-{nombre Abreviado de no más de 5 caracteres}-{numero del 00 al 99}' ejemplo: SKU-LASER-X1 ")
        }

        if (!nombre_item || nombre_item.trim().length === 0) {
            throw new Error("El nombre_item es requerido.");
        }
        this.nombre_item = nombre_item;
        
        //verificación tipo
        this.tipo = tipo;


        //Verificación para nombre_robot
        if(tipo == 'chasis' && nombre_robot){
            this.nombre_robot = nombre_robot;
        }else{
            this.nombre_robot="";
        }
        
        //Verificación para durabilidad_max
        if(0 < durabilidad_max && durabilidad_max <= 100 ){
            this.durabilidad_max=durabilidad_max;
        }else{
            throw new Error("La durabilidad tiene que encontrarse en el rango (0-100]")
        }

        //verificación de durabilidad´y asignación de es_chatarra
        if(durabilidad_actual <= 0){
            throw new Error("La durabilidad maxima no puede ser negativa o nula");
            
        }else if(durabilidad_actual > durabilidad_max){
            throw new Error("La durabilidad actual no puede superar a la durabilidad maxima");

        }else if((durabilidad_max * 0.75) <=  durabilidad_actual){
            this.durabilidad_actual= durabilidad_actual;
            this.es_chatarra =false

        } else {
            this.durabilidad_actual=durabilidad_actual;
            this.es_chatarra =true
        }

        //verificación fuerza bono
        if(0 <= fuerza_bono && fuerza_bono <= 200){
            this.fuerza_bono= fuerza_bono;
        }else{
            throw new Error("El bono de fuerza debe encontrarse en el rango [0-200]")
        }

        //Verificacón defensa bono
        if(0 <= defensa_bono && defensa_bono <= 200){
            this.defensa_bono= defensa_bono;
        }else{
            throw new Error("El bono de defensa debe encontrarse en el rango [0-200]")
        }

        //Verificación precio_lista
        if(0 < precio_lista){
                  this.precio_lista = precio_lista;
        }else{
            throw new Error("el precio no puede ser nulo o negativo")
        }

        // Verificación del descuento y asignación de precio_final
        if (descuento_porcentaje != 0) {

            if (descuento_porcentaje > 0 && descuento_porcentaje <= 80) {
                this.descuento_porcentaje = descuento_porcentaje;
                this.precio_final = precio_lista * (1 - (descuento_porcentaje / 100));

            } else {
                throw new Error("El descuento debe estar entre 0.0% y 80.0%");

            }
        } else if (this.es_chatarra) {
            if(durabilidad_max - durabilidad_actual > 80){
                this.descuento_porcentaje = 80;
                this.precio_final = precio_lista * (1 - (this.descuento_porcentaje / 100));

            }else{
                this.descuento_porcentaje = durabilidad_max - durabilidad_actual;
                this.precio_final = precio_lista * (1 - (this.descuento_porcentaje / 100));

            }

        } else {
            this.descuento_porcentaje = 0;
            this.precio_final = precio_lista;
        }

        //Verificación descripción
        if(descripcion){
            this.descripcion = descripcion;
        }else {
            this.descripcion = "";
        }
        
        //verificación imagen_url (no sé como validarla aun)
        this.imagen_url = imagen_url;

        //Verificación del stock
        if(stock_disponible >= 0){
            this.stock_disponible = stock_disponible;
        }else{
            throw new Error("El stock no puede ser negativo")
        }
        
    }

    
}