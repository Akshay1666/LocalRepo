import React from 'react';
import { useCart } from './CartContext';
import './Orders.css';

const Orders = () => {
  const { cart, removeFromCart, placeOrder, orders } = useCart();

  const handlePlace = () => {
    const order = placeOrder({ name: 'Guest Customer' });
    if (order) alert('Order placed! ID: ' + order.id);
  };

  return (
    <div className="orders-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cart.map(item => (
            <div className="cart-item" key={item.name}>
              <div>
                <strong>{item.name}</strong> x{item.qty}
                <div className="cart-price">₹{item.price * item.qty}</div>
              </div>
              <button onClick={() => removeFromCart(item.name)} className="cart-remove">Remove</button>
            </div>
          ))}
          <button onClick={handlePlace} className="place-btn">Place Order</button>
        </div>
      )}

      <h2>Previous Orders</h2>
      {orders.length === 0 ? <p>No previous orders.</p> : (
        <div className="orders-list">
          {orders.map(o => (
            <div className="order-card" key={o.id}>
              <div className="order-header">Order #{o.id} - {new Date(o.createdAt).toLocaleString()}</div>
              <div className="order-items">
                {o.items.map(it => (
                  <div key={it.name} className="order-item">
                    {it.name} x{it.qty} — ₹{it.price * it.qty}
                  </div>
                ))}
              </div>
              <div className="order-total">Total: ₹{o.total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
