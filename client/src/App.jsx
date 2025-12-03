import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

function App() {
  const { isDark } = useTheme();

  return (
    <Router>
      <div 
        className="min-h-screen flex flex-col transition-all duration-500"
        style={{ 
          backgroundColor: isDark ? '#0a0a0f' : '#fafafa',
          color: isDark ? '#ffffff' : '#0a0a0f'
        }}
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
