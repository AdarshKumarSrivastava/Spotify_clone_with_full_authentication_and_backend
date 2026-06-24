import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Repeat, Shuffle, Mic2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function MusicPlayer() {
  const { currentSong, isPlaying, togglePlay } = usePlayer();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.1));
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!currentSong) return null;

  return (
    <>
      <motion.div 
      initial={{ y: 150, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 100 }}
      className="glass-panel"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        width: 'calc(100% - 48px)',
        height: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 100,
        background: 'rgba(20, 20, 20, 0.7)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1)`
      }}
    >
      {/* Current Track Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '30%' }}>
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ width: '64px', height: '64px', borderRadius: '50%', background: `url(${currentSong.image}) center/cover`, boxShadow: `0 4px 16px ${currentSong.color || 'var(--color-spotify-green)'}`, border: '2px solid rgba(255,255,255,0.1)' }} 
        />
        <div>
          <motion.h4 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={currentSong.title}
            style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: 'var(--color-text-main)' }}>{currentSong.title}</motion.h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '40%', maxWidth: '500px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <motion.div whileHover={{ scale: 1.1 }}><Shuffle size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} /></motion.div>
          <motion.div whileHover={{ scale: 1.2 }}><SkipBack size={24} color="var(--color-text-main)" style={{ cursor: 'pointer' }} /></motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="neon-glow custom-cursor-target"
            style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,255,255,0.3)' }}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause size={24} color="#000" fill="#000" />
            ) : (
              <Play size={24} color="#000" fill="#000" style={{ marginLeft: '4px' }} />
            )}
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.2 }}><SkipForward size={24} color="var(--color-text-main)" style={{ cursor: 'pointer' }} /></motion.div>
          <motion.div whileHover={{ scale: 1.1 }}><Repeat size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} /></motion.div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', minWidth: '35px', textAlign: 'right' }}>1:24</span>
          
          <div className="custom-cursor-target" style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', flex: 1, position: 'relative', cursor: 'pointer' }}>
            <motion.div 
              style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress}%`, background: currentSong.color || 'var(--color-spotify-green-glow)', borderRadius: '3px', boxShadow: `0 0 10px ${currentSong.color || 'var(--color-spotify-green)'}` }} 
            />
            {/* Scrubber thumb */}
            <motion.div
              style={{ position: 'absolute', left: `${progress}%`, top: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.5)', opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
            />
          </div>
          
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', minWidth: '35px' }}>4:03</span>
        </div>
      </div>

      {/* Extra Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '30%', justifyContent: 'flex-end' }}>
        <motion.div whileHover={{ scale: 1.1 }}><Mic2 size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} /></motion.div>
        <Volume2 size={20} color="var(--color-text-muted)" />
        <div className="custom-cursor-target" style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', cursor: 'pointer' }}>
          <div style={{ width: '60%', height: '100%', background: 'var(--color-text-main)', borderRadius: '3px' }} />
        </div>
        <motion.div whileHover={{ scale: 1.1 }}><Maximize2 size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} /></motion.div>
      </div>
    </motion.div>
    </>
  );
}
