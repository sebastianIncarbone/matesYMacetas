import React from 'react'
import { connect } from 'react-redux'

const Carrito = ({carrito, quitarDelCarrito}) => (
    <section>
        <hr/>
        <h2> Carrito </h2>
        <div className="carrito">
            {
                carrito.map(producto => (
                    <article className="productoDelCarrito">
                        <img src={producto.foto} alt={producto.nombre} />
                        <h3>{producto.nombre}</h3>
                        <div className="descripcion">
                            <p>cantida: <span className="cantidad">{producto.cantidadAComprar}</span></p>
                            <p>subTotal: <span className="subtotal">{producto.getSubTotal()}</span></p>
                        </div>
                        <button className="quitarDelCarrito" onClick={()=>quitarDelCarrito(producto.id)}>x</button>
                    </article>    
                ))
            }
        </div>
    </section>
);

const mapStateToProps = state => ({
    carrito: state.carrito
});

const mapDispatchToProps = dispatch => ({ 
    quitarDelCarrito(id) {
               
        dispatch({
            type: "AGREGAR_PRODUCTO_AL_CARRITO",
            id
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);
