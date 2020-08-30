import React from 'react'
import { connect } from 'react-redux'

const Productos = ({productos, agregarAlCarrito}) => (
    <section>
        <h2> Catalogo </h2>
        <div className="catalogo">
            {
                productos.map(producto => (
                    <article className="producto" >
                        <img src={producto.foto} alt={producto.nombre} />
                        <h3>{producto.nombre}</h3>
                        <div className="descripcion">
                            {
                                producto.precios.map( precio => (
                                    <p className="descripcion_cantidad_precio" >
                                        <span className="cantidad"> { precio.cantidadMinima } </span>
                                        <span className="precio"> $ { precio.monto } </span>
                                    </p>
                                ))
                            }
                        </div>
                        <div className="cantidadPedida">
                            <button onClick={()=>agregarAlCarrito(producto.id,-1)}>-</button>
                            <input type="number" 
                                    className="contadorProducto" 
                                    value={producto.cantidadAComprar}
                                    // onChange={()=>agregarAlCarrito(producto.id, 1)} 
                            />
                            <button onClick={()=>agregarAlCarrito(producto.id,1)}>+</button>
                        </div>
                    </article>    
                ))
            }
        </div>
    </section>
);

const mapStateToProps = state => ({
    productos: state.productos
});

const mapDispatchToProps = dispatch => ({ 
    agregarAlCarrito(id, cantidad) {
               
        dispatch({
            type: "AGREGAR_PRODUCTO_AL_CARRITO",
            id,
            cantidad
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Productos);
