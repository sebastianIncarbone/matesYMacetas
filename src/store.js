import { createStore } from 'redux';
// import listadeprecios from './setDeDatos/listaDePrecios.json'
import listadeprecios from './setDeDatos/test.json'
import { Producto } from './model/Producto';

const initialState = {
    productos: listadeprecios.map(p => new Producto(p)),
    carrito: []
};

const editarLaCantidadDeUnProductoDeLaLista = (lista,id,cantidad) => lista.map(producto => {

    if(producto.id === id) {
        producto.sumarMasDeEsteProducto(cantidad);
    }

    return producto;
}); 

const reducerShop = (state = initialState, action) => {

    if(action.type === "AGREGAR_PRODUCTO_AL_CARRITO") {
        let newStateProducto = editarLaCantidadDeUnProductoDeLaLista(state.productos,action.id,action.cantidad);

        if(!state.carrito.some(x=>x.id === action.id)) {
            state.carrito.push(newStateProducto.filter(x=>x.id === action.id)[0]);
        }
        
        return {
            ...state,
            productos: newStateProducto,
            carrito: [...state.carrito]
        }
    }

    if(action.type === "QUITAR_DEL_CARRITO"){
        return {
            ...state,
            productos: editarLaCantidadDeUnProductoDeLaLista(state.productos,action.id,0),
            carrito: [...state.carrito].filter( x => x.id !== action.id)
        }
    }

    return state;

};

export default createStore(reducerShop);
