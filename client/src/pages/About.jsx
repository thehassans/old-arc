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
                                        className="w-32 h-32 rounded-2xl flex items-center justify-center"
                                        style={{ backgroundColor: '#ffffff' }}
                                    >
                                        <svg viewBox="0 0 603 182" className="w-24 h-auto">
                                            <path fill="#FF9900" d="M374.00,141.00 C338.79,167.80 287.23,182.00 243.39,182.00 C181.28,182.00 125.44,158.68 83.04,119.87 C79.76,116.89 82.68,112.82 86.61,115.18 C132.11,141.56 188.69,157.47 247.21,157.47 C286.47,157.47 329.57,149.47 369.08,132.84 C374.85,130.35 379.72,136.65 374.00,141.00 Z"/>
                                            <path fill="#FF9900" d="M385.47,127.76 C381.05,122.08 355.17,125.13 343.45,126.52 C339.99,126.93 339.45,123.91 342.55,121.71 C363.26,107.02 397.75,111.21 401.54,115.95 C405.33,120.72 400.45,155.25 381.12,171.63 C378.24,174.10 375.49,172.82 376.78,169.64 C380.97,159.07 389.92,133.48 385.47,127.76 Z"/>
                                            <path fill="#232F3E" d="M344.32,23.79 L344.32,7.50 C344.32,5.15 346.13,3.58 348.26,3.58 L410.39,3.58 C412.59,3.58 414.40,5.19 414.40,7.50 L414.40,21.59 C414.36,23.83 412.44,26.72 409.03,31.47 L376.34,79.00 C388.69,78.70 401.75,80.44 412.88,86.72 C415.37,88.13 416.03,90.22 416.22,92.27 L416.22,109.62 C416.22,111.71 413.92,114.16 411.47,112.86 C391.50,102.26 364.37,101.12 342.20,113.00 C339.96,114.23 337.62,111.82 337.62,109.73 L337.62,93.32 C337.62,90.97 337.66,86.86 339.99,83.44 L378.43,27.57 L348.33,27.57 C346.13,27.57 344.32,25.99 344.32,23.79 Z"/>
                                            <path fill="#232F3E" d="M124.94,115.88 L105.78,115.88 C103.76,115.74 102.16,114.23 102.02,112.30 L102.02,7.68 C102.02,5.51 103.83,3.76 106.07,3.76 L123.87,3.76 C125.93,3.87 127.57,5.44 127.71,7.43 L127.71,21.16 L128.08,21.16 C133.00,8.11 142.24,2.00 155.07,2.00 C168.09,2.00 176.32,8.11 182.06,21.16 C186.94,8.11 198.05,2.00 210.32,2.00 C219.18,2.00 228.98,5.80 234.91,13.86 C241.65,22.85 240.27,35.71 240.27,47.09 L240.23,112.04 C240.23,114.21 238.42,116.00 236.18,116.00 L217.06,116.00 C214.96,115.86 213.28,114.13 213.28,112.04 L213.28,56.27 C213.28,51.62 213.72,39.51 213.09,35.05 C212.09,27.36 207.02,25.23 200.47,25.23 C195.03,25.23 189.35,28.66 186.94,34.40 C184.52,40.14 184.71,49.50 184.71,56.27 L184.71,112.04 C184.71,114.21 182.90,116.00 180.66,116.00 L161.53,116.00 C159.40,115.86 157.76,114.13 157.76,112.04 L157.72,56.27 C157.72,43.77 159.84,24.86 144.33,24.86 C128.64,24.86 129.27,43.22 129.27,56.27 L129.27,112.04 C129.27,114.21 127.46,116.00 125.22,116.00 L124.94,115.88 Z"/>
                                            <path fill="#232F3E" d="M463.94,2.00 C492.20,2.00 507.50,25.23 507.50,56.09 C507.50,85.88 490.60,108.92 463.94,108.92 C436.10,108.92 421.00,85.69 421.00,55.53 C421.00,25.19 436.29,2.00 463.94,2.00 Z M464.13,21.16 C449.44,21.16 448.43,41.26 448.43,54.13 C448.43,67.04 448.24,89.35 463.94,89.35 C479.45,89.35 480.46,67.78 480.46,54.31 C480.46,45.13 480.08,34.22 476.86,25.79 C474.07,18.47 469.00,21.16 464.13,21.16 Z"/>
                                            <path fill="#232F3E" d="M543.95,115.88 L524.91,115.88 C522.81,115.74 521.13,114.01 521.13,111.92 L521.09,7.46 C521.27,5.40 523.08,3.76 525.18,3.76 L542.77,3.76 C544.65,3.87 546.22,5.18 546.62,6.94 L546.62,22.85 L547.00,22.85 C552.92,8.48 560.77,2.00 575.28,2.00 C584.89,2.00 594.32,5.43 600.62,14.98 C606.55,23.79 606.55,38.40 606.55,49.32 L606.55,112.45 C606.29,114.43 604.48,116.00 602.42,116.00 L583.18,116.00 C581.26,115.86 579.69,114.35 579.49,112.45 L579.49,55.72 C579.49,43.40 580.87,24.68 565.74,24.68 C560.21,24.68 555.05,28.29 552.45,33.85 C549.19,40.88 548.81,47.87 548.81,55.72 L548.81,112.04 C548.77,114.25 546.92,116.00 544.64,116.00 L543.95,115.88 Z"/>
                                            <path fill="#232F3E" d="M291.06,64.18 C291.06,72.24 291.25,78.91 287.02,86.03 C283.60,91.77 278.16,95.38 272.14,95.38 C263.85,95.38 259.05,89.27 259.05,80.09 C259.05,62.11 275.00,58.87 291.06,58.87 L291.06,64.18 Z M314.28,115.63 C312.84,116.93 310.77,117.01 309.13,116.12 C301.66,109.89 300.25,106.92 296.31,101.29 C284.42,113.45 276.02,117.07 260.33,117.07 C241.55,117.07 227.01,105.53 227.01,82.30 C227.01,64.18 236.80,51.87 251.30,45.76 C263.85,40.33 281.51,39.40 291.06,38.28 L291.06,35.97 C291.06,31.68 291.44,26.47 288.77,22.85 C286.48,19.63 282.43,18.33 278.91,18.33 C272.37,18.33 266.53,21.72 265.11,28.66 C264.85,30.12 263.78,31.54 262.30,31.61 L243.83,29.62 C242.50,29.33 241.03,28.25 241.39,26.25 C245.74,3.58 266.27,3.00 284.68,3.00 C294.11,3.00 306.47,5.43 313.77,12.73 C323.20,21.72 322.20,33.66 322.20,46.52 L322.20,79.16 C322.20,88.37 326.03,92.38 329.63,97.40 C330.83,99.08 331.09,101.10 329.55,102.40 C325.68,105.68 318.76,111.68 314.96,115.74 L314.28,115.63 Z"/>
                                            <path fill="#232F3E" d="M54.33,64.18 C54.33,72.24 54.52,78.91 50.29,86.03 C46.87,91.77 41.47,95.38 35.41,95.38 C27.12,95.38 22.36,89.27 22.36,80.09 C22.36,62.11 38.27,58.87 54.33,58.87 L54.33,64.18 Z M77.55,115.63 C76.11,116.93 74.04,117.01 72.40,116.12 C64.93,109.89 63.56,106.92 59.58,101.29 C47.69,113.45 39.33,117.07 23.60,117.07 C4.86,117.07 9.72,105.53 9.72,82.30 C9.72,64.18 0.11,51.87 14.57,45.76 C27.12,40.33 44.78,39.40 54.33,38.28 L54.33,35.97 C54.33,31.68 54.71,26.47 52.04,22.85 C49.79,19.63 45.70,18.33 42.18,18.33 C35.64,18.33 29.84,21.72 28.38,28.66 C28.12,30.12 27.05,31.54 25.57,31.61 L7.14,29.62 C5.81,29.33 4.30,28.25 4.66,26.25 C9.01,3.58 29.54,3.00 47.95,3.00 C57.38,3.00 69.74,5.43 77.04,12.73 C86.47,21.72 85.47,33.66 85.47,46.52 L85.47,79.16 C85.47,88.37 89.30,92.38 92.90,97.40 C94.10,99.08 94.36,101.10 92.82,102.40 C88.95,105.68 82.03,111.68 78.23,115.74 L77.55,115.63 Z"/>
                                        </svg>
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
