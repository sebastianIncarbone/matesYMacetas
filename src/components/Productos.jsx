import React from "react";
import { connect } from "react-redux";

const Productos = ({ productos, agregarAlCarrito }) => (
  <section className='catalogo'>
    <h2 className='encabezado'>
      Mochichunis <i className='aclaracion'>Catálogo</i>{" "}
    </h2>
    <div className='catalogo-cuerpo'>
      {productos
        .filter((p) => p.mostrarEnCatalogo())
        .map((producto) => (
          <article className='producto'>
            <div
              className='img'
              onClick={() =>
                window.open(process.env.PUBLIC_URL + producto.foto, "_blank")
              }>
              <img
                src={process.env.PUBLIC_URL + producto.foto}
                alt={producto.nombre}
              />
            </div>
            <h3>{producto.nombre}</h3>
            <div className='descripcion'>
              {producto.precios.map((precio) => (
                <p className='cantidad'>
                  {precio.cantidadMinima}x ${precio.monto} c/u
                </p>
              ))}
            </div>
            <div className='cantidadPedida'>
              <button
                className='menos'
                onClick={() => agregarAlCarrito(producto.id, -1)}>
                <span>-</span>
              </button>
              <input
                type='text'
                className='contadorProducto'
                value={producto.cantidadAComprar}
              />
              <button
                className='mas'
                onClick={() => agregarAlCarrito(producto.id, 1)}>
                <span>+</span>
              </button>
            </div>
          </article>
        ))}
    </div>
  </section>
);

const mapStateToProps = (state) => ({
  productos: state.productos,
});

const mapDispatchToProps = (dispatch) => ({
  agregarAlCarrito(id, cantidad) {
    dispatch({
      type: "AGREGAR_PRODUCTO_AL_CARRITO",
      id,
      cantidad,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Productos);
