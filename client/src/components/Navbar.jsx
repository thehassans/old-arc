import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Sun, Moon, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { getCartCount } = useCart();
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/shop', label: 'Shop' },
        { path: '/consoles', label: 'Consoles' },
        { path: '/games', label: 'Games' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav 
            className="fixed w-full z-50 transition-all duration-500"
            style={{
                backgroundColor: scrolled 
                    ? (isDark ? 'rgba(10,10,15,0.95)' : 'rgba(250,250,250,0.95)')
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled 
                    ? `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}` 
                    : '1px solid transparent'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div 
                            whileHover={{ rotate: 15 }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                boxShadow: '0 4px 15px rgba(168,85,247,0.3)'
                            }}
                        >
                            <Gamepad2 size={22} color="white" />
                        </motion.div>
                        <span className="text-xl font-display font-black tracking-tight" style={{ 
                            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            OLD ARCADE
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                                style={{
                                    color: isActive(link.path) 
                                        ? '#a855f7' 
                                        : (isDark ? '#8b8b9e' : '#64748b'),
                                }}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute inset-0 rounded-lg -z-10"
                                        style={{
                                            background: isDark 
                                                ? 'rgba(168,85,247,0.15)' 
                                                : 'rgba(124,58,237,0.1)'
                                        }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Search */}
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-xl transition-all"
                            style={{
                                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                color: isDark ? '#8b8b9e' : '#64748b'
                            }}
                        >
                            <Search size={18} />
                        </motion.button>

                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl transition-all"
                            style={{
                                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                color: isDark ? '#fbbf24' : '#7c3aed'
                            }}
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: isDark ? 0 : 180 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </motion.div>
                        </motion.button>

                        {/* Cart */}
                        <Link to="/cart">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-2.5 rounded-xl transition-all"
                                style={{
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                    color: isDark ? '#8b8b9e' : '#64748b'
                                }}
                            >
                                <ShoppingCart size={18} />
                                {getCartCount() > 0 && (
                                    <motion.span 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white rounded-full"
                                        style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
                                    >
                                        {getCartCount()}
                                    </motion.span>
                                )}
                            </motion.div>
                        </Link>

                        {/* Login Button */}
                        <Link to="/login">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary py-2.5 px-5 text-sm"
                            >
                                Sign In
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl"
                            style={{
                                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                color: isDark ? '#fbbf24' : '#7c3aed'
                            }}
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 rounded-xl"
                            style={{
                                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                color: isDark ? '#ffffff' : '#0a0a0f'
                            }}
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden"
                        style={{
                            backgroundColor: isDark ? 'rgba(10,10,15,0.98)' : 'rgba(250,250,250,0.98)',
                            borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}`
                        }}
                    >
                        <div className="px-4 py-6 space-y-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 rounded-xl text-base font-semibold transition-all"
                                        style={{
                                            backgroundColor: isActive(link.path) 
                                                ? (isDark ? 'rgba(168,85,247,0.15)' : 'rgba(124,58,237,0.1)')
                                                : 'transparent',
                                            color: isActive(link.path) ? '#a855f7' : (isDark ? '#ffffff' : '#0a0a0f')
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    to="/cart"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold"
                                    style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                                >
                                    <span>Cart</span>
                                    {getCartCount() > 0 && (
                                        <span className="px-2.5 py-0.5 text-sm rounded-full text-white"
                                            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
                                            {getCartCount()}
                                        </span>
                                    )}
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="pt-4"
                            >
                                <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary block text-center py-3">
                                    Sign In
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
