import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2, ChevronRight, Zap, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
    const { isDark } = useTheme();

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0" style={{ backgroundColor: isDark ? '#0a0a0f' : '#fafafa' }}>
                {/* Grid Pattern */}
                <div className="absolute inset-0 grid-bg" />
                
                {/* Gradient Orbs */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)' }}
                />
                <motion.div
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)' }}
                />
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)' }}
                />
            </div>

            {/* Floating Gaming Elements */}
            <motion.div
                animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-32 left-[15%] hidden lg:block"
            >
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ 
                        background: isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)',
                        border: '1px solid rgba(168,85,247,0.3)',
                        backdropFilter: 'blur(10px)'
                    }}>
                    <Gamepad2 size={36} style={{ color: '#a855f7' }} />
                </div>
            </motion.div>
            
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-40 right-[15%] hidden lg:block"
            >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ 
                        background: isDark ? 'rgba(34,211,238,0.1)' : 'rgba(8,145,178,0.1)',
                        border: '1px solid rgba(34,211,238,0.3)',
                        backdropFilter: 'blur(10px)'
                    }}>
                    <Zap size={28} style={{ color: '#22d3ee' }} />
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 right-[10%] hidden lg:block"
            >
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ 
                        background: isDark ? 'rgba(236,72,153,0.1)' : 'rgba(219,39,119,0.1)',
                        border: '1px solid rgba(236,72,153,0.3)',
                        backdropFilter: 'blur(10px)'
                    }}>
                    <Star size={24} style={{ color: '#ec4899' }} />
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    {/* Main Heading */}
                    <motion.h1 
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black mb-8 leading-[1.1] tracking-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Relive the</span>
                        <br />
                        <span className="relative inline-block">
                            <span style={{ 
                                background: 'linear-gradient(135deg, #a855f7 0%, #22d3ee 50%, #ec4899 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                backgroundSize: '200% 200%',
                                animation: 'gradient-shift 8s ease infinite'
                            }}>Golden Age</span>
                            <motion.span 
                                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                                style={{ background: 'linear-gradient(90deg, #a855f7, #22d3ee)' }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                            />
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p 
                        className="text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
                        style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Premium retro consoles, legendary games, and elite accessories. 
                        <span style={{ color: isDark ? '#a855f7' : '#7c3aed' }}> Your arcade awaits.</span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div 
                        className="flex flex-col sm:flex-row items-center justify-center gap-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        <Link to="/shop" className="btn-primary flex items-center gap-3 text-lg group">
                            <Gamepad2 size={22} />
                            Enter The Arcade
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link 
                            to="/consoles" 
                            className="btn-secondary flex items-center gap-3 text-lg"
                        >
                            <Zap size={20} />
                            View Consoles
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div 
                        className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        {[
                            { value: '500+', label: 'Products' },
                            { value: '50K+', label: 'Gamers' },
                            { value: '4.9', label: 'Rating' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ 
                                    background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    {stat.value}
                                </div>
                                <div className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{ 
                    background: isDark 
                        ? 'linear-gradient(to top, #0a0a0f, transparent)' 
                        : 'linear-gradient(to top, #fafafa, transparent)'
                }} 
            />
        </div>
    );
};

export default Hero;
