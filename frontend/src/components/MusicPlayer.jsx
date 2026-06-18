import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Repeat, Shuffle } from 'lucide-react';

export default function MusicPlayer() {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8, type: 'spring', stiffness: 100 }}
      className="glass-panel"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 48px)',
        height: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 100,
        background: 'rgba(20, 20, 20, 0.6)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
      }}
    >
      {/* Current Track Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '30%' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '10px', background: 'linear-gradient(135deg, #ff3366 0%, #111 100%)', boxShadow: '0 4px 12px rgba(255, 51, 102, 0.3)' }} />
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--color-text-main)' }}>Midnight City</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>M83</p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '40%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Shuffle size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
          <SkipBack size={24} color="var(--color-text-main)" style={{ cursor: 'pointer' }} />
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="neon-glow"
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-spotify-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Play size={20} color="#000" fill="#000" style={{ marginLeft: '4px' }} />
          </motion.div>
          <SkipForward size={24} color="var(--color-text-main)" style={{ cursor: 'pointer' }} />
          <Repeat size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>1:24</span>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', flex: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '30%', background: 'var(--color-spotify-green-glow)', borderRadius: '2px', boxShadow: '0 0 10px var(--color-spotify-green)' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>4:03</span>
        </div>
      </div>

      {/* Extra Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '30%', justifyContent: 'flex-end' }}>
        <Volume2 size={20} color="var(--color-text-muted)" />
        <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
          <div style={{ width: '60%', height: '100%', background: 'var(--color-text-main)', borderRadius: '2px' }} />
        </div>
        <Maximize2 size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
      </div>
    </motion.div>
  );
}
