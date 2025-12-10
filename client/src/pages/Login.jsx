import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Gamepad2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Check credentials
        setTimeout(() => {
            if (username === 'adminoldarcade' && password === 'admin12345') {
                localStorage.setItem('adminAuth', 'true');
                localStorage.setItem('adminUser', username);
                navigate('/admin/dashboard');
            } else {
                setError('Invalid username or password');
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: isDark ? '#0a0a0f' : '#f1f5f9' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div 
                    className="rounded-2xl p-8"
                    style={{ 
                        backgroundColor: isDark ? '#12121a' : '#ffffff',
                        border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`,
                        boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.5)' : '0 20px 50px rgba(0,0,0,0.1)'
                    }}
                >
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div 
                            className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                            style={{
                                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                boxShadow: '0 8px 30px rgba(168,85,247,0.3)'
                            }}
                        >
                            <Gamepad2 size={32} color="white" />
                        </div>
                        <h1 className="text-2xl font-bold" style={{ color: isDark ? '#ffffff' : '#0a0a0f' }}>
                            Admin Login
                        </h1>
                        <p className="text-sm mt-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                            Sign in to access the admin panel
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 rounded-lg text-center"
                            style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>
                                Username
                            </label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: isDark ? '#8b8b9e' : '#64748b' }} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                                    style={{
                                        backgroundColor: isDark ? '#0a0a0f' : '#f8fafc',
                                        border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`,
                                        color: isDark ? '#ffffff' : '#0a0a0f'
                                    }}
                                    placeholder="Enter username"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl outline-none transition-all"
                                    style={{
                                        backgroundColor: isDark ? '#0a0a0f' : '#f8fafc',
                                        border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`,
                                        color: isDark ? '#ffffff' : '#0a0a0f'
                                    }}
                                    placeholder="Enter password"
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-semibold text-white transition-all"
                            style={{
                                background: loading ? '#6b7280' : 'linear-gradient(135deg, #a855f7, #22d3ee)',
                                boxShadow: loading ? 'none' : '0 4px 15px rgba(168,85,247,0.3)'
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
