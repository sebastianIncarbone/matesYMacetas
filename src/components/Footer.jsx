import React from "react";
import { connect } from "react-redux";

const Carrito = ({ carrito }) => (
  <section>

    {/* <div className="carrito-counter"> <span className="i-carrito"></span> <i>{carrito}</i></div> */}

  </section>

);

const mapStateToProps = (state) => {
  var cantidadDeCompras = 0;
  state.carrito.forEach(c => cantidadDeCompras += c.cantidadAComprar);
  return ({
    carrito: cantidadDeCompras
  })
};


export default connect(mapStateToProps)(Carrito);
