export class Producto {

    constructor( { id, nombre, foto, precios, cantidadAComprar } ) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.precios = precios;
        this.cantidadAComprar = cantidadAComprar;
    }

    getSubTotal() {
        return this._obtenerPrecioParaLaCantidadAComprar() * this.cantidadAComprar;
    } 
    
    _obtenerPrecioParaLaCantidadAComprar() {
        let cantidadMinimaDelPrecio = Math.max.apply(null,this.precios.map(p=>p.cantidadMinima).filter( c => this.cantidadAComprar >= c ));
        let precio = this.precios.filter(p=>p.cantidadMinima === cantidadMinimaDelPrecio)[0];

        return precio === undefined? 0:precio.monto
    }

    sumarMasDeEsteProducto(cantidad) {
        this.cantidadAComprar = this.cantidadAComprar + cantidad;
    }

    sumarPrecioAOtroProducto(producto) {
        return producto.getSubTotal() + this.getSubTotal();
    }

    resetearCantidad() {
        this.cantidadAComprar = 0;
    }
}