import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Send, MessageCircle, Clock, Plus, ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const Support = () => {
    const { isDark } = useTheme();
    const { user } = useAuth();
    const messagesEndRef = useRef(null);
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [showNewTicket, setShowNewTicket] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [newTicketForm, setNewTicketForm] = useState({ subject: '', message: '' });

    useEffect(() => {
        if (user?.email) fetchTickets();
    }, [user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedTicket?.messages]);

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/support/tickets?email=${user.email}`);
            setTickets(res.data);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        if (!newTicketForm.subject.trim() || !newTicketForm.message.trim()) return;
        setSending(true);
        try {
            const res = await axios.post(`${API_URL}/api/support/tickets`, {
                email: user.email, name: user.name,
                subject: newTicketForm.subject, message: newTicketForm.message
            });
            setTickets([res.data.ticket, ...tickets]);
            setSelectedTicket(res.data.ticket);
            setShowNewTicket(false);
            setNewTicketForm({ subject: '', message: '' });
        } catch (e) { console.error(e); }
        finally { setSending(false); }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedTicket) return;
        setSending(true);
        try {
            const res = await axios.post(`${API_URL}/api/support/tickets/${selectedTicket.id}/messages`, {
                message: newMessage, sender: 'user', senderName: user.name
            });
            setSelectedTicket(res.data.ticket);
            setTickets(tickets.map(t => t.id === res.data.ticket.id ? res.data.ticket : t));
            setNewMessage('');
        } catch (e) { console.error(e); }
        finally { setSending(false); }
    };

    const statusColors = { open: '#eab308', replied: '#22c55e', closed: '#6b7280' };
    const cardStyle = { backgroundColor: isDark ? '#12121a' : '#fff', border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}` };
    const inputStyle = { backgroundColor: isDark ? '#0a0a0f' : '#f8fafc', border: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`, color: isDark ? '#fff' : '#0a0a0f' };

    if (!user) return (
        <div className="pt-24 pb-20 min-h-screen flex items-center justify-center text-center">
            <div><MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
            <Link to="/login" className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>Sign In</Link></div>
        </div>
    );

    return (
        <div className="pt-24 pb-20 min-h-screen"><div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-3xl font-bold" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Support <span style={{ color: '#a855f7' }}>Center</span></h1></div>
                <button onClick={() => { setShowNewTicket(true); setSelectedTicket(null); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}><Plus size={18} />New Ticket</button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6" style={{ height: 'calc(100vh - 250px)', minHeight: '500px' }}>
                {/* Tickets List */}
                <div className="w-full lg:w-[35%] rounded-2xl overflow-hidden flex flex-col" style={cardStyle}>
                    <div className="p-4 font-semibold" style={{ borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}`, color: isDark ? '#fff' : '#0a0a0f' }}>Your Tickets ({tickets.length})</div>
                    <div className="flex-1 overflow-y-auto">
                        {loading ? <div className="flex items-center justify-center py-12"><Loader2 size={24} className="animate-spin" style={{ color: '#a855f7' }} /></div>
                        : tickets.length === 0 ? <div className="text-center py-12"><MessageCircle size={40} className="mx-auto mb-3 opacity-30" /><p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>No tickets yet</p></div>
                        : tickets.map(ticket => (
                            <button key={ticket.id} onClick={() => { setSelectedTicket(ticket); setShowNewTicket(false); }} className="w-full text-left p-4 transition-colors" style={{ backgroundColor: selectedTicket?.id === ticket.id ? (isDark ? 'rgba(168,85,247,0.1)' : 'rgba(168,85,247,0.05)') : 'transparent', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className="font-medium truncate" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>{ticket.subject}</h4>
                                    <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ backgroundColor: `${statusColors[ticket.status]}20`, color: statusColors[ticket.status] }}>{ticket.status}</span>
                                </div>
                                <p className="text-sm truncate" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>{ticket.messages[ticket.messages.length - 1]?.message || ''}</p>
                                <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: isDark ? '#6b6b7e' : '#94a3b8' }}><Clock size={12} />{new Date(ticket.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="w-full lg:w-[65%] rounded-2xl overflow-hidden flex flex-col" style={cardStyle}>
                    {showNewTicket ? (
                        <div className="flex flex-col h-full">
                            <div className="p-4 flex items-center gap-3" style={{ borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}` }}>
                                <button onClick={() => setShowNewTicket(false)} className="p-2 rounded-lg hover:bg-primary/10"><ArrowLeft size={20} style={{ color: '#a855f7' }} /></button>
                                <h3 className="font-semibold" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>Create New Ticket</h3>
                            </div>
                            <form onSubmit={handleCreateTicket} className="flex-1 p-6 flex flex-col gap-4">
                                <input type="text" value={newTicketForm.subject} onChange={(e) => setNewTicketForm({...newTicketForm, subject: e.target.value})} placeholder="Subject *" className="w-full px-4 py-3 rounded-xl" style={inputStyle} required />
                                <textarea value={newTicketForm.message} onChange={(e) => setNewTicketForm({...newTicketForm, message: e.target.value})} placeholder="Describe your issue..." className="flex-1 w-full px-4 py-3 rounded-xl resize-none" style={{...inputStyle, minHeight: '150px'}} required />
                                <button type="submit" disabled={sending} className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}>{sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}Submit Ticket</button>
                            </form>
                        </div>
                    ) : selectedTicket ? (
                        <div className="flex flex-col h-full">
                            <div className="p-4" style={{ borderBottom: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}` }}>
                                <h3 className="font-semibold" style={{ color: isDark ? '#fff' : '#0a0a0f' }}>{selectedTicket.subject}</h3>
                                <p className="text-sm" style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Ticket #{selectedTicket.id}</p>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {selectedTicket.messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className="max-w-[80%] rounded-2xl px-4 py-3" style={{ backgroundColor: msg.sender === 'user' ? '#a855f7' : (isDark ? '#1a1a2e' : '#f1f5f9'), color: msg.sender === 'user' ? '#fff' : (isDark ? '#fff' : '#0a0a0f') }}>
                                            <p className="text-sm">{msg.message}</p>
                                            <p className="text-xs mt-1 opacity-70">{new Date(msg.timestamp).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            {selectedTicket.status !== 'closed' && (
                                <form onSubmit={handleSendMessage} className="p-4 flex gap-3" style={{ borderTop: `1px solid ${isDark ? 'rgba(168,85,247,0.2)' : 'rgba(0,0,0,0.1)'}` }}>
                                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-3 rounded-xl" style={inputStyle} />
                                    <button type="submit" disabled={sending} className="px-4 py-3 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}><Send size={20} /></button>
                                </form>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-center p-8">
                            <div><MessageCircle size={48} className="mx-auto mb-4 opacity-30" /><p style={{ color: isDark ? '#8b8b9e' : '#64748b' }}>Select a ticket or create a new one</p></div>
                        </div>
                    )}
                </div>
            </div>
        </div></div>
    );
};

export default Support;
