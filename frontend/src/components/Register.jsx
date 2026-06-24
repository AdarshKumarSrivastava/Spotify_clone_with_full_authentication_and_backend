import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Music } from 'lucide-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // In a real app, send to /api/auth/register
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
      });
      // Redirect based on role
      if (role === 'artist') navigate('/artist');
      else navigate('/user');
    } catch (err) {
      console.error(err);
      // Fallback redirect for demo
      if (role === 'artist') navigate('/artist');
      else navigate('/user');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
        background: 'radial-gradient(circle at top right, rgba(29,185,84,0.15) 0%, #000 100%)'
      }}
    >
      <div className="glass-panel" style={{ width: '450px', padding: '48px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-spotify-green)', margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Create Account</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Join SpoTify 3.0 as a listener or artist.</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <motion.div 
              whileTap={{ scale: 0.95 }} onClick={() => setRole('user')}
              style={{ flex: 1, padding: '16px', borderRadius: '12px', background: role === 'user' ? 'rgba(29,185,84,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${role === 'user' ? 'var(--color-spotify-green)' : 'rgba(255,255,255,0.1)'}`, textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
            >
              <User size={24} color={role === 'user' ? 'var(--color-spotify-green)' : 'var(--color-text-muted)'} style={{ margin: '0 auto 8px' }} />
              <div style={{ color: role === 'user' ? 'white' : 'var(--color-text-muted)', fontWeight: 600 }}>Listener</div>
            </motion.div>
            <motion.div 
              whileTap={{ scale: 0.95 }} onClick={() => setRole('artist')}
              style={{ flex: 1, padding: '16px', borderRadius: '12px', background: role === 'artist' ? 'rgba(29,185,84,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${role === 'artist' ? 'var(--color-spotify-green)' : 'rgba(255,255,255,0.1)'}`, textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
            >
              <Music size={24} color={role === 'artist' ? 'var(--color-spotify-green)' : 'var(--color-text-muted)'} style={{ margin: '0 auto 8px' }} />
              <div style={{ color: role === 'artist' ? 'white' : 'var(--color-text-muted)', fontWeight: 600 }}>Artist</div>
            </motion.div>
          </div>

          <div style={{ position: 'relative' }}>
            <User size={20} color="var(--color-text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" placeholder="Username" required
              value={username} onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
            />
          </div>
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
            className="glass-btn custom-cursor-target"
            type="submit"
            style={{ marginTop: '12px', width: '100%' }}
          >
            Sign Up <ArrowRight size={20} />
          </motion.button>
        </form>

        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'white', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
        </div>
      </div>
    </motion.div>
  );
}
