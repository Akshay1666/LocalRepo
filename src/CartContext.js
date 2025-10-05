import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem('orders');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem('orders', JSON.stringify(orders)); } catch (e) {}
  }, [orders]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (name) => setCart(prev => prev.filter(i => i.name !== name));
  const clearCart = () => setCart([]);

  const placeOrder = (customer = { name: 'Guest' }) => {
    if (cart.length === 0) return null;
    const id = Date.now();
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const order = { id, items: cart, total, createdAt: new Date().toISOString(), customer };
    setOrders(prev => [order, ...prev]);
    clearCart();
    return order;
  };

  const cartCount = cart.reduce((s, i) => s + (i.qty || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, placeOrder, orders, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
