import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight, Gamepad2 } from 'lucide-react';

const Account = () => {
    const { isDark } = useTheme();
    const { login, register } = useAuth();
    const navigate = useNavigate();
    
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                // Login logic
                const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                const user = users.find(u => u.email === formData.email && u.password === formData.password);
                
                if (user) {
                    login(user);
                    navigate('/dashboard');
                } else {
                    setError('Invalid email or password');
                }
            } else {
                // Register logic
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }
                
                if (formData.password.length < 6) {
                    setError('Password must be at least 6 characters');
                    setLoading(false);
                    return;
                }

                const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                if (users.find(u => u.email === formData.email)) {
                    setError('Email already registered');
                    setLoading(false);
                    return;
                }

                register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
                navigate('/dashboard');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`,
        color: isDark ? '#ffffff' : '#0a0a0f'
    };

    return (
        <div className="pt-24 pb-20 min-h-screen flex items-center justify-center px-4">
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center top, rgba(168,85,247,0.1) 0%, transparent 60%)'
                }}
            />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div 
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: isDark 
                            ? 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)' 
                            : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                        border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.1)'}`,
                        boxShadow: '0 25px 50px -12px rgba(168,85,247,0.2)'
                    }}
                >
                    {/* Header */}
                    <div 
                        className="px-8 py-6 text-center"
                        style={{ 
                            background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(34,211,238,0.1) 100%)',
                            borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.1)'}`
                        }}
                    >
                        <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}
                        >
                            <Gamepad2 size={32} color="white" />
                        </div>
                        <h1 className="text-2xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                            {isLogin ? 'Welcome Back!' : 'Create Account'}
                        </h1>
                        <p className="text-sm mt-1" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                            {isLogin ? 'Sign in to your account' : 'Join the retro gaming community'}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl"
                                            style={inputStyle}
                                            placeholder="John Doe"
                                            required={!isLogin}
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl"
                                        style={inputStyle}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        className="w-full pl-12 pr-12 py-3 rounded-xl"
                                        style={inputStyle}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                        style={{ color: isDark ? '#8b8b9e' : '#64748b' }}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl"
                                            style={inputStyle}
                                            placeholder="••••••••"
                                            required={!isLogin}
                                        />
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                                style={{
                                    background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                    color: '#ffffff',
                                    boxShadow: '0 4px 15px rgba(168,85,247,0.4)'
                                }}
                            >
                                {loading ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? 'Sign In' : 'Create Account'}
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError('');
                                        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                                    }}
                                    className="ml-2 font-semibold"
                                    style={{ color: '#a855f7' }}
                                >
                                    {isLogin ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Account;
