import { createContext, useReducer, useContext, useEffect } from "react";


const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const CartContext = createContext();

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART" :
            return [...state, {...action.payload, qty: 1}]

            const existingItem = state.find(item => item.id === action.payload.id);
            // updating the existing with quantity increasing the quantity 
            if (existingItem) {
                return state.map(item => item.id === action.payload.id ? {...item, qty: item.qty + 1} : item)
            }


        case "INCREMENT" :
            return state.map(item => item.id === action.payload ? {...item, qty: item.qty + 1}: item)

        case "DECREMENT" : 
        return state.map(item => item.id === action.payload ? {...item, qty: Math.max(1, item.qty -1)} : item)

        case "REMOVE" :
            return state.filter(item => item.id !== action.payload)

        default :
            return state;
    }
}

export function CartProvider({children}) {
    const [cartItems, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems])

    return (
        <>
        <CartContext.Provider value={{cartItems, dispatch}}>
            {children}
        </CartContext.Provider>
        </>
    )
}

export const useCart = () => useContext(CartContext)