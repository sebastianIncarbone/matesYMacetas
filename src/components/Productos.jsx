import React from 'react'
import { connect } from 'react-redux'

const Productos = ({productos, agregarAlCarrito}) => (
    <section className="catalogo">
        <h2 className="encabezado"> Mates y Macetas <i className="aclaracion">Catalogo</i> </h2>
        <div className="catalogo-cuerpo">
            {
                productos.map(producto => (
                    <article className="producto" >
                        <img src={producto.foto} alt={producto.nombre} />
                        <h3>{producto.nombre}</h3>
                        <div className="descripcion">
                            {
                                producto.precios.map( precio => (
                                    <p className="cantidad"> { precio.cantidadMinima } x $ { precio.monto } </p>
                                ))
                            }
                        </div>
                        <div className="cantidadPedida">
                            <button className="menos" onClick={()=>agregarAlCarrito(producto.id,-1)}><span>-</span></button>
                            <input type="text" 
                                    className="contadorProducto" 
                                    value={producto.cantidadAComprar}
                                    // onChange={()=>agregarAlCarrito(producto.id, 1)} 
                            />
                            <button  className="mas" onClick={()=>agregarAlCarrito(producto.id,1)}><span>+</span></button>
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
