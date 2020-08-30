import React from "react";
import { connect } from "react-redux";

const Carrito = ({ carrito, totalDelPedido, quitarDelCarrito }) => (
  <section className="carrito">
    <h2> Tu pedido </h2>
    <div className="carrito-cuerpo">
      {carrito.map((producto) => (
        <article className="productoDelCarrito">
          <img src={producto.foto} alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <p className="detalleCopra">
            x {producto.cantidadAComprar} - ${" "}
            {producto.obtenerPrecioParaLaCantidadAComprar()}
          </p>
          <p className="subtotal">
            subtotal{" "}
            <span className="subtotal-value">$ {producto.getSubTotal()}</span>
          </p>
          <button
            className="quitarDelCarrito"
            onClick={() => quitarDelCarrito(producto.id)}
          ></button>
        </article>
      ))}
    </div>
      <h2>
        Total <span>$ {totalDelPedido}</span>{" "}
      </h2>
      <a className="encargarPedido" href="javascript:viod(0)">
        <span className="whatsapp"> </span> Encargalo!
      </a>
  </section>
);

const mapStateToProps = (state) => ({
  carrito: state.carrito,
  totalDelPedido: totalDelPedido(state),
});

const totalDelPedido = (state) => {
  let total = 0;
  state.carrito.forEach((producto) => (total += producto.getSubTotal()));
  return total;
};

const mapDispatchToProps = (dispatch) => ({
  quitarDelCarrito(id) {
    dispatch({
      type: "QUITAR_DEL_CARRITO",
      id,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);
