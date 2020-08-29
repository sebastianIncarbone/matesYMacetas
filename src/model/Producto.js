export class Producto {

    constructor(id,nombre, foto, precios, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.precios = precios;
        this.cantidadAComprar = cantidad;
    }

    getSubTotal() {
        return _obtenerPrecioParaLaCantidadAComprar() * this.cantidadAComprar;
    } 
    
    _obtenerPrecioParaLaCantidadAComprar() {
        return Math.max(this.precios.filter( p => this.cantidadAComprar >= p.cantidad ));
    }

    sumarMasDeEsteProducto(cantidad) {
        this.cantidadAComprar += cantidad;
    }

    sumarPrecioAOtroProducto(producto) {
        return producto.getSubTotal() + this.getSubTotal();
    }

}