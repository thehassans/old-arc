import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark-lighter pt-16 pb-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                            OLD ARCADE
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your premium destination for retro and modern gaming. Experience the nostalgia with our curated collection.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Shop</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">All Products</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Consoles</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Games</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Accessories</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Old Arcade. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
