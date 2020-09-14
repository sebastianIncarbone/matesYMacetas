import React from "react";
import { connect } from "react-redux";

const Carrito = ({
  carrito,
  link,
  cantidadDeCompras,
  totalDelPedido,
  quitarDelCarrito,
}) => {
  const ref = React.createRef();

  const handleClick = () =>
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <>
      <section className="carrito" ref={ref}>
        <h2> Tu pedido </h2>
        <div className="carrito-cuerpo">
          {carrito.map((producto) => (
            <article className="productoDelCarrito">
              <div className="img">
                <img src={process.env.PUBLIC_URL + producto.foto} alt={producto.nombre} />
              </div>
              <h3>{producto.nombre}</h3>
              <p className="detalleCopra">
                {producto.cantidadAComprar}x ${producto.precioDeCompra}
              </p>
              <p className="subtotal">
                Subtotal
                <span className="subtotal-value">
                  ${producto.getSubTotal()}
                </span>
              </p>
              <button
                className="quitarDelCarrito"
                onClick={() => quitarDelCarrito(producto.id)}
              ></button>
            </article>
          ))}
        </div>
        <h2>
          Total&nbsp;<span>${totalDelPedido}</span>
        </h2>
        <a
          className="encargarPedido"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="whatsapp"> </span> Encargalo!
        </a>
      </section>

      <div className="carrito-counter" onClick={handleClick}>
        {" "}
        <span className="i-carrito"></span> <i>{cantidadDeCompras}</i>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  carrito: state.carrito,
  link: state.link,
  totalDelPedido: totalDelPedido(state),
  cantidadDeCompras: cantidadDeCompras(state),
});

const totalDelPedido = (state) => {
  let total = 0;
  state.carrito.forEach((producto) => (total += producto.getSubTotal()));
  return total;
};

const cantidadDeCompras = (state) => {
  var cantidadDeCompras = 0;
  state.carrito.forEach((c) => (cantidadDeCompras += c.cantidadAComprar));
  return cantidadDeCompras;
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
