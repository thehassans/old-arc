import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex-shrink-0">
                        <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            OLD ARCADE
                        </h1>
                    </Link>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/" className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/shop" className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
                            <Link to="/consoles" className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Consoles</Link>
                            <Link to="/games" className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium">Games</Link>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-gray-300 hover:text-white transition-colors">
                            <Search size={20} />
                        </button>
                        <Link to="/cart" className="text-gray-300 hover:text-white transition-colors relative">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-2 -right-2 bg-primary text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
                        </Link>
                        <Link to="/login" className="btn-primary py-2 px-4 text-sm">
                            Login
                        </Link>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-dark border-b border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary">Home</Link>
                            <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary">Shop</Link>
                            <Link to="/consoles" className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary">Consoles</Link>
                            <Link to="/games" className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary">Games</Link>
                            <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary">Cart</Link>
                            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary">Login</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
