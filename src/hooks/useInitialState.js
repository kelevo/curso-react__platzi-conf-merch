// Custom hook
import { useState } from "react";
import initialState from '../initialState';

// Funcion de estado inicial
const useInitialState = () => {
    // Destructuracion de estado
    const [state, setState] = useState(initialState);

    // Aniadir al carrito
    const addToCart = payload => {
        setState({
            ...state,
            // ["trae lo que tiene cart del estado", "y agregale lo que este en el payload"]
            cart: [...state.cart, payload]
        });
    }

    // Eliminar del carrito
    const removeFromCart = (payload, indexToRemove) => {
        setState({
            ...state,
            cart: state.cart.filter((_item, indexCurrent) => indexCurrent !== indexToRemove),
        })
    }

    const addToBuyer = payload => {
        setState({
            ...state,
            buyer: [...state.buyer, payload]
        })
    }

    const addNewOrder = payload => {
        setState({
            ...state,
            orders: [...state.orders, payload]
        })
    }

    return {
        addToCart,
        removeFromCart,
        addToBuyer,
        state,
    }
};

export default useInitialState;