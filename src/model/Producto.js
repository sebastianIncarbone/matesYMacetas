import { Precio } from "./Precio";

export class Producto {
  constructor({
    id,
    Tipo,
    Seccion,
    nombre,
    foto,
    precios,
    cantidadAComprar,
    Proveedor,
    costo,
    Ganancias,
    ofertas_1,
    ofertas_5,
    ofertas_10,
  }) {
    this.id = id;
    this.tipo = Tipo;
    this.seccion = Seccion;
    this.nombre = nombre;
    this.foto = !foto
      ? null
      : `/assets/${Tipo.toLocaleLowerCase()}/${nombre.replace(
          / /g,
          ""
        )}.${foto.toLocaleLowerCase()}`;
    this.precios = precios.map((p) => new Precio(p));
    this.cantidadAComprar = cantidadAComprar;
    this.proveedor = Proveedor;
    this.costo = costo;
    this.ganancias = Ganancias;
    this.ofertas_1 = ofertas_1;
    this.ofertas_5 = ofertas_5;
    this.ofertas_10 = ofertas_10;
    this.precioDeCompra = 0;
  }

  getSubTotal() {
    return this.precioDeCompra * this.cantidadAComprar;
  }

  obtenerPrecioParaLaCantidadAComprar(cantidadPedida) {
    let cantidadMinimaDelPrecio = Math.max.apply(
      null,
      this.precios
        .map((p) => p.cantidadMinima)
        .filter((c) => cantidadPedida >= c)
    );
    let precio = this.precios.filter(
      (p) => p.cantidadMinima === cantidadMinimaDelPrecio
    )[0];

    return precio === undefined ? 0 : precio.monto;
  }

  sumarMasDeEsteProducto(cantidad) {
    if (this.cantidadAComprar + cantidad <= 0) {
      return;
    }
    this.cantidadAComprar = this.cantidadAComprar + cantidad;
  }

  resetearCantidad() {
    this.cantidadAComprar = 0;
  }

  mostrarEnCatalogo() {
    return (
      this.foto != null && this.precios.length > 0 && this.precios[0].monto > 0
    );
  }

  tengoLosMismosPrecios(otroProducto) {
    return this.precios.some((x) =>
     
      otroProducto.precios.some((y) => x.isEqual(y))
    
    );
  }
}