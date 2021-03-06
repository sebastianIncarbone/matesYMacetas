import { createStore } from "redux";
import listadeprecios from "./setDeDatos/mochichunis.json";
// import listadeprecios from './setDeDatos/test.json'
import { Producto } from "./model/Producto";

const initialState = {
  productos: listadeprecios.map((p) => new Producto(p)),
  carrito: [],
  link: "",
};

const updatePreciosDelCarrito = (listaDePrecios, listaDePedidos, id) => {
  let productoPedido = new Producto(
    listadeprecios.filter((x) => x.id === id)[0]
  );

  let productosPedidosDelCombo = listaDePedidos.filter(
    (x) =>
      x.proveedor === productoPedido.proveedor &&
      x.tengoLosMismosPrecios(productoPedido)
  );

  let cantidadCompradaPorCombo = 0;

  if (productosPedidosDelCombo.length > 1) {
    cantidadCompradaPorCombo = productosPedidosDelCombo.reduce(
      (a, b) => a + b.cantidadAComprar,
      0
    );
  } else if (productosPedidosDelCombo.length === 1) {
    cantidadCompradaPorCombo = productosPedidosDelCombo[0].cantidadAComprar;
  }

  productosPedidosDelCombo.forEach(
    (x) =>
      (x.precioDeCompra = x.obtenerPrecioParaLaCantidadAComprar(
        cantidadCompradaPorCombo
      ))
  );
};

const editarLaCantidadDeUnProductoDeLaLista = (
  lista,
  carrito,
  id,
  cantidad
) => {
  let listaDeProductos = [...lista].map((producto) => {
    if (producto.id === id) {
      producto.sumarMasDeEsteProducto(cantidad);
    }
    return producto;
  });

  if (!carrito.some((x) => x.id === id)) {
    carrito.push(listaDeProductos.filter((x) => x.id === id)[0]);
  }

  updatePreciosDelCarrito(lista, carrito, id);

  return { listaDeProductos, carrito };
};

const resetearLaCantidadDeUnProductoDeLaLista = (lista, carrito, id) => {
  let listaDeProductos = [...lista].map((producto) => {
    if (producto.id === id) {
      producto.resetearCantidad();
    }
    return producto;
  });

  carrito = carrito.filter((x) => x.id !== id);

  updatePreciosDelCarrito(lista, carrito, id);

  return { listaDeProductos, carrito };
};

const totalDelPedido = (listaDeProductos) => {
  let total = 0;
  listaDeProductos.forEach((producto) => (total += producto.getSubTotal()));
  return total;
};

const makeWhatsappLink = (listaDeProductos) => {
  let link = `https://wa.me/5491167060100/?text=${encodeURI("*Pedido*\n")}`;

  listaDeProductos.forEach(
    (p) =>
      (link += encodeURI(
        ` *- ${p.cantidadAComprar} x* _${p.tipo}-${p.nombre}_ ($ ${
          p.precioDeCompra
        }) *= $ ${p.getSubTotal()}* \n`
      ))
  );

  link += `\n . \n . \n *TOTAL* => *$ ${totalDelPedido(listaDeProductos)}*`;

  return link;
};

const reducerShop = (state = initialState, action) => {
  if (action.type === "AGREGAR_PRODUCTO_AL_CARRITO") {
    let newState = editarLaCantidadDeUnProductoDeLaLista(
      state.productos,
      state.carrito,
      action.id,
      action.cantidad
    );

    return {
      ...state,
      productos: newState.listaDeProductos,
      carrito: newState.carrito,
      link: makeWhatsappLink(newState.carrito),
    };
  }

  if (action.type === "QUITAR_DEL_CARRITO") {
    let newState = resetearLaCantidadDeUnProductoDeLaLista(
      state.productos,
      state.carrito,
      action.id
    );
    return {
      ...state,
      productos: newState.listaDeProductos,
      carrito: newState.carrito,
      link: makeWhatsappLink(newState.carrito),
    };
  }

  return state;
};

export default createStore(reducerShop);
