import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2, ChevronRight } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-dark">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark to-secondary/20 opacity-50" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
                        Welcome to the Next Level
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                        Relive the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Golden Age</span>
                        <br /> of Gaming
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Discover a curated collection of retro consoles, classic games, and premium accessories. The arcade is open.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/shop" className="btn-primary flex items-center gap-2 group">
                            Start Shopping
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/consoles" className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-bold flex items-center gap-2">
                            <Gamepad2 size={20} />
                            Browse Consoles
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 w-24 h-24 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"
            />
        </div>
    );
};

export default Hero;
