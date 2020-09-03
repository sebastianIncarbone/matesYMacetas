export class Producto {

    constructor( { id, nombre, foto, precios, cantidadAComprar } ) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.precios = precios;
        this.cantidadAComprar = cantidadAComprar;
    }

    getSubTotal() {
        return this.obtenerPrecioParaLaCantidadAComprar() * this.cantidadAComprar;
    } 
    
    obtenerPrecioParaLaCantidadAComprar() {
        let cantidadMinimaDelPrecio = Math.max.apply(null,this.precios.map(p=>p.cantidadMinima).filter( c => this.cantidadAComprar >= c ));
        let precio = this.precios.filter(p=>p.cantidadMinima === cantidadMinimaDelPrecio)[0];

        return precio === undefined? 0:precio.monto
    }

    sumarMasDeEsteProducto(cantidad) {
        if((this.cantidadAComprar + cantidad) <= 0){
            return;
        }
        this.cantidadAComprar = this.cantidadAComprar + cantidad;
    }

    resetearCantidad() {
        this.cantidadAComprar = 0;
    }
}