import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
// const Home = () => <div className="pt-20 min-h-screen flex items-center justify-center"><h1>Home Page</h1></div>;
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
// const Shop = () => <div className="pt-20 min-h-screen flex items-center justify-center"><h1>Shop Page</h1></div>;
// const ProductDetails = () => <div className="pt-20 min-h-screen flex items-center justify-center"><h1>Product Details</h1></div>;
import Cart from './pages/Cart';
import Admin from './pages/Admin';
// const Cart = () => <div className="pt-20 min-h-screen flex items-center justify-center"><h1>Cart Page</h1></div>;
// const Admin = () => <div className="pt-20 min-h-screen flex items-center justify-center"><h1>Admin Panel</h1></div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark text-white flex flex-col">
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
