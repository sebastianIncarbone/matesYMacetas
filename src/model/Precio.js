export class Precio {
  constructor({  id, cantidadMinima, monto  }) {
    this.id = id;
    this.cantidadMinima = cantidadMinima;
    this.monto = monto;
  }

  isEqual(otroPrecio) {
    return (
      this.cantidadMinima === otroPrecio.cantidadMinima &&
      this.Precio === otroPrecio.Precio
    );
  }
}