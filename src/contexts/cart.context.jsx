import { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, productToAdd) => {

  // console.log(cartItems, productToAdd)
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // console.log(existingCartItem)

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  carCount:0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [carCount, setCarCount] = useState(0);


  useEffect(()=>{
    const newCarCount = cartItems.reduce((total,cartItem)=> total + cartItem.quantity, 0)
    setCarCount(newCarCount)
  },[cartItems])

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart ,carCount};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
