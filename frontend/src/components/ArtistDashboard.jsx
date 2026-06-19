import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Music, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ currentView, setCurrentView }) => {
  const navigate = useNavigate();
  return (
    <div className="glass-panel" style={{ width: '280px', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-spotify-green)' }} />
        Artist Hub
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        <button onClick={() => setCurrentView('dashboard')} className="custom-cursor-target" style={{ background: 'none', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px', color: currentView === 'dashboard' ? 'var(--color-text-main)' : 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s' }}><Music /> Dashboard</button>
        <button onClick={() => setCurrentView('upload')} className="custom-cursor-target" style={{ background: 'none', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px', color: currentView === 'upload' ? 'var(--color-text-main)' : 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s' }}><Upload /> Upload Music</button>
      </nav>
      <button onClick={() => navigate('/login')} className="custom-cursor-target" style={{ background: 'none', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-text-muted)', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s', marginTop: 'auto' }}><LogOut /> Logout</button>
    </div>
  );
};

export default function ArtistDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return;
    
    // In a real app, send FormData to /api/music/upload
    const formData = new FormData();
    formData.append('title', title);
    formData.append('music', file);
    
    try {
      // Mock upload
      console.log('Uploading...', title, file);
      alert(`Successfully uploaded "${title}"`);
      setTitle('');
      setFile(null);
      setCurrentView('dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      style={{ display: 'flex', height: '100vh', padding: '24px', gap: '24px', background: 'radial-gradient(circle at bottom right, rgba(29,185,84,0.1) 0%, #000 100%)' }}
    >
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="glass-panel" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {currentView === 'dashboard' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-text-main)' }}>Your Dashboard</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '40px' }}>Overview of your releases and stats.</p>
            
            <div style={{ display: 'flex', gap: '24px', marginBottom: '48px' }}>
              <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Streams</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-spotify-green)' }}>1.2M</span>
              </div>
              <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Listeners</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>450K</span>
              </div>
              <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Tracks</span>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>12</span>
              </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>Recent Releases</h2>
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
               <p style={{ color: 'var(--color-text-muted)' }}>You haven't uploaded any tracks recently.</p>
            </div>
          </motion.div>
        )}

        {currentView === 'upload' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-text-main)' }}>Upload Music</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '40px' }}>Share your next hit with the world.</p>

            <form onSubmit={handleUpload} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Track Title</label>
                <input 
                  type="text" required value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Midnight City"
                  style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', fontSize: '1rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Audio File (.mp3, .wav)</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="file" required accept="audio/*" onChange={e => setFile(e.target.files[0])}
                    style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                  <div style={{ width: '100%', padding: '32px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '2px dashed rgba(255,255,255,0.2)', textAlign: 'center', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <Upload size={32} color={file ? 'var(--color-spotify-green)' : 'var(--color-text-muted)'} />
                    <span>{file ? file.name : 'Drag and drop or click to upload'}</span>
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, background: '#1ed760' }} whileTap={{ scale: 0.98 }}
                style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-spotify-green)', color: 'black', fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px' }}
              >
                Publish Track <Plus size={20} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
