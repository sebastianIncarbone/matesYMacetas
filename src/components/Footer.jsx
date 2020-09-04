import React from "react";
import { connect } from "react-redux";

const Carrito = ({ carrito }) => (
  <section>

    <div className="carrito-counter"> <span></span> <i>{carrito}</i></div>
    
  </section>

);

const mapStateToProps = (state) => ({
  carrito: state.carrito.lenght
});


export default connect(mapStateToProps)(Carrito);
