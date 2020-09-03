import { createStore } from 'redux';
// import listadeprecios from './setDeDatos/listaDePrecios.json'
import listadeprecios from './setDeDatos/test.json'
import { Producto } from './model/Producto';

const initialState = {
    productos: listadeprecios.map(p => new Producto(p)),
    carrito: [],
    link: ''
};

const editarLaCantidadDeUnProductoDeLaLista = (lista,id,cantidad) => lista.map(producto => {

    if(producto.id === id) {
        producto.sumarMasDeEsteProducto(cantidad);
    }

    return producto;
}); 

const resetearLaCantidadDeUnProductoDeLaLista = (lista,id) => lista.map(producto => {

    if(producto.id === id) {
        producto.resetearCantidad();
    }

    return producto;
}); 

const totalDelPedido = (listaDeProductos) => {
    let total = 0;
    listaDeProductos.forEach((producto) => (total += producto.getSubTotal()));
    return total;
};

const makeWhatsappLink = (listaDeProductos) => {
    let link = `https://wa.me/5491167060100/?text=${encodeURI('*Pedido*\n')}`;
  
    listaDeProductos.forEach(p=> 
        link += encodeURI(` *- ${p.cantidadAComprar} x* _${p.nombre}_ ($ ${p.obtenerPrecioParaLaCantidadAComprar()}) *= $ ${p.getSubTotal()}* \n`)
    );
    
    link += `\n . \n . \n *TOTAL* => *$ ${totalDelPedido(listaDeProductos)}*`

    return link;
};

const reducerShop = (state = initialState, action) => {

    if(action.type === "AGREGAR_PRODUCTO_AL_CARRITO") {
        let newStateProducto = editarLaCantidadDeUnProductoDeLaLista(state.productos,action.id,action.cantidad);

        if(!state.carrito.some(x=>x.id === action.id)) {
            state.carrito.push(newStateProducto.filter(x=>x.id === action.id)[0]);
        }
        let carrito = [...state.carrito].filter(x=>x.cantidadAComprar > 0);
        console.log(makeWhatsappLink(carrito));
        return {
            ...state,
            productos: newStateProducto,
            carrito: carrito,
            link: makeWhatsappLink(carrito)
        }
    }

    if(action.type === "QUITAR_DEL_CARRITO") {
        let carrito = [...state.carrito].filter( x => x.id !== action.id);
        return {
            ...state,
            productos: resetearLaCantidadDeUnProductoDeLaLista(state.productos,action.id),
            carrito: carrito,
            link: makeWhatsappLink(carrito)
        }
    }

    return state;

};

export default createStore(reducerShop);
