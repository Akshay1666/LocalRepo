import React from 'react';
import './App.css';
import Menu from './Menu';
import Orders from './Orders';
import Contact from './Contact';
import Home from './Home';
import { CartProvider, useCart } from './CartContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Navbar() {
  const { cartCount } = useCart();
  return (
    <header className="navbar">
      <h1>🍴 Food Delivery Management System</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/orders">Orders ({cartCount})</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

function AppContent() {
  return (
    <div className="App">
      <Navbar />

      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <footer className="footer">
        <p>© 2025 QuickEats | All Rights Reserved</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
