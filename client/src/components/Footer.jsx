import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Gamepad2, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const { isDark } = useTheme();
    
    // Default settings
    const defaultSettings = {
        phone: '+447782260144',
        email: 'hello@old-arcade.com',
        address: 'London, UK',
        facebook: 'https://facebook.com/oldarcade',
        twitter: 'https://twitter.com/oldarcade',
        instagram: 'https://instagram.com/oldarcade',
        youtube: 'https://youtube.com/oldarcade',
    };

    const [settings, setSettings] = useState(defaultSettings);

    // Load settings from localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('siteSettings');
        if (savedSettings) {
            try {
                setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
            } catch (e) {
                console.error('Error parsing settings:', e);
            }
        }

        // Listen for storage changes (when admin saves settings)
        const handleStorageChange = () => {
            const updated = localStorage.getItem('siteSettings');
            if (updated) {
                try {
                    setSettings({ ...defaultSettings, ...JSON.parse(updated) });
                } catch (e) {
                    console.error('Error parsing settings:', e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('settingsUpdated', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('settingsUpdated', handleStorageChange);
        };
    }, []);

    const footerLinks = {
        shop: [
            { label: 'All Products', path: '/shop' },
            { label: 'Consoles', path: '/consoles' },
            { label: 'Games', path: '/games' },
            { label: 'Accessories', path: '/shop?category=accessories' },
        ],
        support: [
            { label: 'Contact Us', path: '/contact' },
            { label: 'FAQs', path: '/faq' },
            { label: 'Shipping & Returns', path: '/shipping' },
            { label: 'Privacy Policy', path: '/privacy' },
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: settings.facebook || '#', label: 'Facebook' },
        { icon: Twitter, href: settings.twitter || '#', label: 'Twitter' },
        { icon: Instagram, href: settings.instagram || '#', label: 'Instagram' },
        { icon: Youtube, href: settings.youtube || '#', label: 'Youtube' },
    ];

    return (
        <footer 
            className="relative overflow-hidden"
            style={{ 
                backgroundColor: isDark ? '#0a0a0f' : '#fafafa',
                borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}`
            }}
        >
            {/* Background Glow */}
            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 70%)'
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div 
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                    boxShadow: '0 4px 15px rgba(168,85,247,0.3)'
                                }}
                            >
                                <Gamepad2 size={24} color="white" />
                            </div>
                            <span className="text-2xl font-display font-black" style={{ 
                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                OLD ARCADE
                            </span>
                        </Link>
                        <p 
                            className="text-sm leading-relaxed mb-6"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                        >
                            Your premium destination for retro gaming excellence. Discover legendary consoles, 
                            timeless games, and elite accessories.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                        color: isDark ? '#8b8b9e' : '#64748b'
                                    }}
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 
                            className="font-bold text-lg mb-6"
                            style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                        >
                            Shop
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link, i) => (
                                <li key={i}>
                                    <Link 
                                        to={link.path}
                                        className="text-sm transition-colors hover:translate-x-1 inline-block"
                                        style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                                        onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                                        onMouseLeave={(e) => e.target.style.color = isDark ? '#8b8b9e' : '#64748b'}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 
                            className="font-bold text-lg mb-6"
                            style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                        >
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link, i) => (
                                <li key={i}>
                                    <Link 
                                        to={link.path}
                                        className="text-sm transition-colors"
                                        style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                                        onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                                        onMouseLeave={(e) => e.target.style.color = isDark ? '#8b8b9e' : '#64748b'}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 
                            className="font-bold text-lg mb-6"
                            style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}
                        >
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div 
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,58,237,0.1)'
                                    }}
                                >
                                    <Mail size={18} style={{ color: '#a855f7' }} />
                                </div>
                                <span className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    {settings.email}
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div 
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(34,211,238,0.1)' : 'rgba(8,145,178,0.1)'
                                    }}
                                >
                                    <Phone size={18} style={{ color: '#22d3ee' }} />
                                </div>
                                <span className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    {settings.phone}
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div 
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(236,72,153,0.1)' : 'rgba(219,39,119,0.1)'
                                    }}
                                >
                                    <MapPin size={18} style={{ color: '#ec4899' }} />
                                </div>
                                <span className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    {settings.address}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div 
                    className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{ 
                        borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.05)'}` 
                    }}
                >
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                            © {new Date().getFullYear()} Old Arcade. All rights reserved.
                        </p>
                        <span className="hidden sm:inline" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>•</span>
                        <a 
                            href="https://vitalblaze.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium transition-colors"
                            style={{ color: '#a855f7' }}
                        >
                            Powered by VitalBlaze
                        </a>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link 
                            to="/terms" 
                            className="text-sm transition-colors"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                            onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                            onMouseLeave={(e) => e.target.style.color = isDark ? '#8b8b9e' : '#64748b'}
                        >
                            Terms
                        </Link>
                        <Link 
                            to="/privacy" 
                            className="text-sm transition-colors"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                            onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                            onMouseLeave={(e) => e.target.style.color = isDark ? '#8b8b9e' : '#64748b'}
                        >
                            Privacy
                        </Link>
                        <Link 
                            to="/cookies" 
                            className="text-sm transition-colors"
                            style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                            onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                            onMouseLeave={(e) => e.target.style.color = isDark ? '#8b8b9e' : '#64748b'}
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
