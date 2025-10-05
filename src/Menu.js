import React from 'react';
import './Menu.css';
import { useCart } from './CartContext';

const Menu = () => {
  const menuItems = [
    {
      name: 'Margherita Pizza',
      description: 'Classic pizza with mozzarella and tomato sauce.',
      price: 299,
      image: 'https://via.placeholder.com/200x150?text=Pizza'
    },
    {
      name: 'Veg Burger',
      description: 'Crispy veggie patty with lettuce and cheese.',
      price: 199,
      image: 'https://via.placeholder.com/200x150?text=Burger'
    },
    {
      name: 'Pasta Alfredo',
      description: 'Creamy white sauce pasta with herbs and cheese.',
      price: 249,
      image: 'https://via.placeholder.com/200x150?text=Pasta'
    },
    {
      name: 'French Fries',
      description: 'Golden crispy fries served with ketchup.',
      price: 99,
      image: 'https://via.placeholder.com/200x150?text=Fries'
    },
    {
      name: 'Cold Coffee',
      description: 'Iced coffee topped with whipped cream.',
      price: 149,
      image: 'https://via.placeholder.com/200x150?text=Coffee'
    }
  ];

  const { addToCart } = useCart();

  return (
    <div className="menu-container">
      <h1 className="menu-title">🍔 Our Delicious Menu</h1>
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-card">
            <img src={item.image} alt={item.name} className="menu-img" />
            <h2 className="menu-name">{item.name}</h2>
            <p className="menu-desc">{item.description}</p>
            <p className="menu-price">₹{item.price}</p>
            <button className="menu-btn" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
