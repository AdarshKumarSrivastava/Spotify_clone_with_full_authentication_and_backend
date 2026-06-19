import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic - route based on a dummy check or just redirect to user for now
    // If they login as artist, they'd go to /artist. For demo, we'll route to /user
    navigate('/user');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',
        background: 'radial-gradient(circle at top left, rgba(29,185,84,0.15) 0%, #000 100%)'
      }}
    >
      <div className="glass-panel" style={{ width: '400px', padding: '48px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-spotify-green)', margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Welcome back</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Sign in to continue to SpoTify 3.0</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={20} color="var(--color-text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="email" placeholder="Email Address" required
              value={email} onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={20} color="var(--color-text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="password" placeholder="Password" required
              value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02, background: '#1ed760' }} whileTap={{ scale: 0.98 }}
            style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-spotify-green)', color: 'black', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '12px' }}
          >
            Log In <ArrowRight size={20} />
          </motion.button>
        </form>

        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'white', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
        </div>
      </div>
    </motion.div>
  );
}
