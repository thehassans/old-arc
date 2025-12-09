import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Consoles from './pages/Consoles';
import Games from './pages/Games';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Privacy from './pages/Privacy';
import CheckoutSuccess from './pages/CheckoutSuccess';
import About from './pages/About';
import TrackOrder from './pages/TrackOrder';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Layout wrapper to conditionally show Navbar/Footer
function Layout({ children }) {
  const location = useLocation();
  const { isDark } = useTheme();
  
  // Hide navbar/footer on admin pages
  const hideLayout = location.pathname.startsWith('/admin');

  return (
    <div 
      className="min-h-screen flex flex-col transition-all duration-500"
      style={{ 
        backgroundColor: isDark ? '#0a0a0f' : '#fafafa',
        color: isDark ? '#ffffff' : '#0a0a0f'
      }}
    >
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/consoles" element={<Consoles />} />
            <Route path="/games" element={<Games />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
