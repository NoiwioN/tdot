import React, { createContext, useState } from 'react';

const CartContext = createContext("");

export const CartProvider = ({ children }) => {

  return (
    <CartContext.Provider value={{ cart, cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;