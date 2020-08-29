import { createStore } from 'redux';

const initialState = {
    jugadores: [],
    titulares: [],
    suplentes: []
};

const reducerEntrenador = (state = initialState, action) => {

    if(action.type === "HACER_TITULAR"){
        return {
            ...state,
            titulares: state.titulares.concat(action.jugador),
            jugadores: state.jugadores.filter(x=>x.id!==action.jugador.id) 
        }
    }

    if(action.type === "HACER_SUPLENTE"){
        return {
            ...state,
            suplentes: state.suplentes.concat(action.jugador),
            jugadores: state.jugadores.filter(x=>x.id!==action.jugador.id) 
        }
    }

    if(action.type === "QUITAR_SUPLENTE"){
        return {
            ...state,
            jugadores: state.jugadores.concat(action.jugador),
            suplentes: state.suplentes.filter(x=>x.id!==action.jugador.id) 
        }
    }

    if(action.type === "QUITAR_TITULAR"){
        return {
            ...state,
            jugadores: state.jugadores.concat(action.jugador),
            titulares: state.titulares.filter(x=>x.id!==action.jugador.id) 
        }
    }

    return state;

};

export default createStore(reducerEntrenador);
