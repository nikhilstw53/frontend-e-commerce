import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);


  const addToCart = (product) => {

    const existing = cartItems.find(item => item.id === product.id);

    if (existing) {

      const updated = cartItems.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );

      setCartItems(updated);

    } else {

      setCartItems([
        ...cartItems,
        { ...product, qty: 1 }
      ]);

    }
  };


  const increment = (id) => {

    const updated = cartItems.map(item =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    );

    setCartItems(updated);
  };


  const decrement = (id) => {

    const updated = cartItems.map(item =>
      item.id === id
        ? { ...item, qty: Math.max(1, item.qty - 1) }
        : item
    );

    setCartItems(updated);
  };


  const removeItem = (id) => {

    const updated = cartItems.filter(item => item.id !== id);

    setCartItems(updated);
  };


  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      increment,
      decrement,
      removeItem
    }}>
      {children}
    </CartContext.Provider>
  );

}

export const useCart = () => useContext(CartContext);