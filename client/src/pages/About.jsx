import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Shield, Award, Truck, Users, Star, CheckCircle, Gamepad2, Globe, Heart, Zap } from 'lucide-react';

const About = () => {
    const { isDark } = useTheme();

    const stats = [
        { number: '10K+', label: 'Happy Customers' },
        { number: '5K+', label: 'Products Sold' },
        { number: '99%', label: 'Satisfaction Rate' },
        { number: '24/7', label: 'Customer Support' },
    ];

    const values = [
        { icon: Shield, title: 'Authenticity Guaranteed', description: 'Every product is 100% authentic and verified. We work directly with manufacturers and authorized distributors.' },
        { icon: Award, title: 'Premium Quality', description: 'We only stock the highest quality retro gaming products, carefully inspected before shipping.' },
        { icon: Truck, title: 'Fast UK Delivery', description: 'Quick and reliable delivery across the UK. Track your order every step of the way.' },
        { icon: Heart, title: 'Passion for Gaming', description: 'Founded by gamers, for gamers. We understand and share your love for retro gaming.' },
    ];

    const amazonBenefits = [
        'Official Amazon Authorized Seller',
        'Same Quality Standards as Amazon',
        'Buyer Protection Guarantee',
        'Verified Authentic Products',
        'Professional Customer Service',
        'Secure Payment Processing',
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20">
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center top, rgba(168,85,247,0.15) 0%, transparent 60%)'
                    }}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div 
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                            style={{ 
                                background: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(34,211,238,0.1) 100%)',
                                border: '1px solid rgba(168,85,247,0.3)'
                            }}
                        >
                            <Gamepad2 size={18} style={{ color: '#a855f7' }} />
                            <span className="text-sm font-semibold" style={{ color: '#a855f7' }}>About Old Arcade</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-display font-black mb-6">
                            <span style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Your Trusted </span>
                            <span style={{ 
                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Retro Gaming
                            </span>
                            <br />
                            <span style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Destination</span>
                        </h1>
                        
                        <p className="text-xl leading-relaxed mb-8" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                            Retro Arcade Co LTD is the UK's premier destination for authentic retro gaming products. 
                            As an <strong style={{ color: '#FF9900' }}>Amazon Authorized Seller</strong>, we bring you 
                            the same quality and trust you expect, with specialized expertise in classic gaming.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 rounded-2xl"
                                style={{
                                    background: isDark 
                                        ? 'linear-gradient(145deg, rgba(26,26,46,0.8) 0%, rgba(18,18,26,0.8) 100%)'
                                        : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                                    border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`,
                                    boxShadow: '0 10px 40px rgba(168,85,247,0.1)'
                                }}
                            >
                                <div 
                                    className="text-4xl font-black mb-2"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    {stat.number}
                                </div>
                                <div className="text-sm font-medium" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amazon Authorized Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #232F3E 0%, #131921 100%)',
                            border: '1px solid rgba(255,153,0,0.3)',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                        }}
                    >
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* Amazon Logo Section */}
                                <div className="flex-shrink-0">
                                    <div 
                                        className="w-36 h-36 rounded-2xl flex items-center justify-center p-4"
                                        style={{ 
                                            backgroundColor: '#ffffff',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 40px rgba(255,153,0,0.2)'
                                        }}
                                    >
                                        <img 
                                            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
                                            alt="Amazon" 
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                                            Amazon Authorized Seller
                                        </h2>
                                        <CheckCircle size={28} style={{ color: '#FF9900' }} />
                                    </div>
                                    <p className="text-lg mb-6" style={{ color: '#A0AEC0' }}>
                                        As an official Amazon Authorized Seller, Retro Arcade Co LTD maintains the highest 
                                        standards of product authenticity, customer service, and buyer protection. Shop with 
                                        confidence knowing you're getting genuine products backed by Amazon's quality assurance.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {amazonBenefits.map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle size={16} style={{ color: '#FF9900' }} />
                                                <span className="text-sm text-white">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                            Why Choose <span style={{ color: '#a855f7' }}>Old Arcade</span>
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                            We're more than just a store – we're passionate gamers dedicated to preserving gaming history
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl"
                                style={{
                                    background: isDark 
                                        ? 'linear-gradient(145deg, rgba(26,26,46,0.8) 0%, rgba(18,18,26,0.8) 100%)'
                                        : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                                    border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`
                                }}
                            >
                                <div 
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                                    style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}
                                >
                                    <value.icon size={28} color="white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                    {value.title}
                                </h3>
                                <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Info */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div 
                        className="rounded-3xl p-8 md:p-12"
                        style={{
                            background: isDark 
                                ? 'linear-gradient(145deg, rgba(26,26,46,0.8) 0%, rgba(18,18,26,0.8) 100%)'
                                : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                            border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.15)'}`
                        }}
                    >
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                    Retro Arcade Co LTD
                                </h3>
                                <p className="mb-4" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    Registered in England and Wales, Retro Arcade Co LTD is a legitimate UK-based company 
                                    specializing in retro gaming products. Our commitment to authenticity and customer 
                                    satisfaction has made us a trusted name in the gaming community.
                                </p>
                                <div className="space-y-2">
                                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        <strong style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Address:</strong> 7 Llewellyn Close, Stourport-On-Severn, England, DY13 9RH
                                    </p>
                                    <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        <strong style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>Email:</strong> support@old-arcade.com
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                                    Our Mission
                                </h3>
                                <p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    To preserve and share the magic of retro gaming by providing authentic, high-quality 
                                    products to enthusiasts worldwide. We believe every gamer deserves access to the 
                                    classics that shaped the industry, and we're committed to making that possible with 
                                    unmatched service and genuine products.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
