
export class Pieza {
    readonly id : string; //El tipo deberia ser Object id, pero no sé a que se refiere el profesor
    readonly sku : String;
    readonly nombre_item : String;
    readonly nombre_robot : String;
    readonly tipo : String;
    readonly durabilidad_max : number;
    readonly durabilidad_actual : number;
    readonly precio_lista : number;
    readonly precio_final : number;
    readonly es_chatarreria : boolean;
    readonly descuento_porcentaje : number;
    readonly imagen_url : String;
    readonly descripcion : String;
    readonly stock_disponible  : number; 

    //El constructor deberia ser smart, pero lo dejo así para ir probando
    constructor (id : string, sku : String, nombre_item : String, nombre_robot : String, tipo : String, durabilidad_max : number, durabilidad_actual : number, precio_lista : number, precio_final : number, es_chatarreria : boolean, descuento_porcentaje : number, imagen_url : String, descripcion : String, stock_disponible : number){
        this.id = id;
        this.sku = sku;
        this.nombre_item = nombre_item;
        this.nombre_robot = nombre_robot;
        this.tipo = tipo;
        this.durabilidad_max = durabilidad_max;
        this.durabilidad_actual = durabilidad_actual;
        this.precio_lista = precio_lista;
        this.precio_final = precio_final;
        this.descripcion = descripcion;
        this.es_chatarreria = es_chatarreria;
        this.descuento_porcentaje = descuento_porcentaje;
        this.imagen_url = imagen_url;
        this.stock_disponible = stock_disponible;
    }
}