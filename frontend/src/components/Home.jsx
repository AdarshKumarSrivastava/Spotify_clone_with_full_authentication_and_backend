import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, MoreHorizontal, Search, Home as HomeIcon, Library } from 'lucide-react';

const Sidebar = () => (
  <div className="glass-panel" style={{ width: '280px', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-spotify-green)' }} />
      SpoTify 3.0
    </div>
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-text-main)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}><HomeIcon /> Home</a>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s' }}><Search /> Search</a>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s' }}><Library /> Your Library</a>
    </nav>
  </div>
);

const AlbumCard = ({ title, artist, color, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.05 }}
      style={{
        width: '200px',
        padding: '16px',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div style={{ width: '100%', height: '168px', borderRadius: '12px', background: `linear-gradient(135deg, ${color} 0%, #111 100%)`, marginBottom: '16px', boxShadow: `0 8px 24px ${color}40` }} />
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{artist}</p>
    </motion.div>
  );
};

export default function Home() {
  const [musics, setMusics] = useState([]);
  
  const dummyAlbums = [
    { title: "Midnight City", artist: "M83", color: "#ff3366" },
    { title: "Starboy", artist: "The Weeknd", color: "#33ccff" },
    { title: "Currents", artist: "Tame Impala", color: "#ffcc00" },
    { title: "Discovery", artist: "Daft Punk", color: "#cc33ff" },
    { title: "Utopia", artist: "Travis Scott", color: "#33ffcc" }
  ];

  useEffect(() => {
    fetch('/api/music')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // Map backend music data to our UI format
          setMusics(data.map((m, i) => ({
            title: m.title || "Unknown Title",
            artist: m.artist?.username || "Unknown Artist",
            color: dummyAlbums[i % dummyAlbums.length].color
          })));
        } else {
          setMusics(dummyAlbums);
        }
      })
      .catch(err => {
        console.error("Failed to fetch music:", err);
        setMusics(dummyAlbums);
      });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        display: 'flex',
        height: 'calc(100vh - 100px)', // Leave space for player
        padding: '24px',
        gap: '24px',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Background ambient lighting */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(29,185,84,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(100px)', zIndex: -1 }} />
      
      <Sidebar />
      
      <div className="glass-panel" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gradient"
          style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px' }}
        >
          Good Evening
        </motion.h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '40px' }}>Discover the future of sound.</p>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>Featured Albums</h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {musics.map((album, index) => (
            <AlbumCard key={index} title={album.title} artist={album.artist} color={album.color} delay={1 + index * 0.1} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
