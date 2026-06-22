import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, MoreHorizontal, Search, Home as HomeIcon, Library, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

const Sidebar = ({ currentView, setCurrentView }) => {
  const nav = useNavigate();
  return (
    <div className="glass-panel sidebar-container" style={{ padding: '24px', display: 'flex', gap: '32px', overflowX: 'hidden' }}>
      <div className="sidebar-logo" style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-spotify-green)', flexShrink: 0 }} />
        <span className="logo-text">@Adarsh-SpoTify</span>
      </div>
      <nav style={{ display: 'flex', gap: '16px', flex: 1 }}>
        <motion.button whileHover={{ x: 8, color: '#1ed760' }} onClick={() => setCurrentView('home')} className="custom-cursor-target nav-btn" style={{ background: 'none', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px', color: currentView === 'home' ? 'var(--color-text-main)' : 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s', cursor: 'pointer' }}><HomeIcon /> <span className="nav-text">Home</span></motion.button>
        <motion.button whileHover={{ x: 8, color: '#1ed760' }} onClick={() => setCurrentView('search')} className="custom-cursor-target nav-btn" style={{ background: 'none', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px', color: currentView === 'search' ? 'var(--color-text-main)' : 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s', cursor: 'pointer' }}><Search /> <span className="nav-text">Search</span></motion.button>
        <motion.button whileHover={{ x: 8, color: '#1ed760' }} onClick={() => setCurrentView('library')} className="custom-cursor-target nav-btn" style={{ background: 'none', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px', color: currentView === 'library' ? 'var(--color-text-main)' : 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s', cursor: 'pointer' }}><Library /> <span className="nav-text">Your Library</span></motion.button>
      </nav>
      <motion.button whileHover={{ x: 8, color: '#ff3366' }} onClick={() => nav('/login')} className="custom-cursor-target nav-btn logout-btn" style={{ background: 'none', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem', transition: 'color 0.3s', cursor: 'pointer', marginTop: 'auto' }}><LogOut /> <span className="nav-text">Logout</span></motion.button>
    </div>
  );
};

const AlbumCard = ({ title, artist, image, color, delay, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.05 }}
      onClick={onClick}
      className="custom-cursor-target album-card"
      style={{
        padding: '16px',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div style={{
        width: '100%',
        height: '168px',
        borderRadius: '12px',
        background: image ? `url(${image}) center/cover no-repeat` : `linear-gradient(135deg, ${color} 0%, #111 100%)`,
        marginBottom: '16px',
        boxShadow: `0 8px 24px rgba(0,0,0,0.4)`
      }} />
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{artist}</p>
    </motion.div>
  );
};

const dummyAlbums = [
  { id: 'dummy1', title: "Midnight City", artist: "M83", color: "#ff3366", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400&h=400", audioUrl: "/music/song1.mp3?id=dummy1" },
  { id: 'dummy2', title: "Starboy", artist: "The Weeknd", color: "#33ccff", image: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?auto=format&fit=crop&q=80&w=400&h=400", audioUrl: "/music/song1.mp3?id=dummy2" },
  { id: 'dummy3', title: "Currents", artist: "Tame Impala", color: "#ffcc00", image: "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&q=80&w=400&h=400", audioUrl: "/music/song1.mp3?id=dummy3" },
  { id: 'dummy4', title: "Discovery", artist: "Daft Punk", color: "#cc33ff", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400&h=400", audioUrl: "/music/song1.mp3?id=dummy4" },
  { id: 'dummy5', title: "Utopia", artist: "Travis Scott", color: "#33ffcc", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400&h=400", audioUrl: "/music/song1.mp3?id=dummy5" },
  { id: 'dummy6', title: "After Hours", artist: "The Weeknd", color: "#ff0000", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400&h=400", audioUrl: "/music/song1.mp3?id=dummy6" },
  { id: 'dummy7', title: "Graduation", artist: "Kanye West", color: "#ff00ff", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=400&h=400", audioUrl: "/music/song1.mp3?id=dummy7" },
  { id: 'dummy8', title: "Blonde", artist: "Frank Ocean", color: "#ffff00", image: "https://images.unsplash.com/photo-1516280440502-86927a3f45f9?auto=format&fit=crop&q=80&w=400&h=400", audioUrl: "/music/song1.mp3?id=dummy8" }
];

export default function Home() {
  const [musics, setMusics] = useState(dummyAlbums);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const { playSong } = usePlayer();

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    fetch('/api/music', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          // Map backend music data to our UI format
          setMusics(data.data.map((m, i) => ({
            id: m._id,
            title: m.title || "Unknown Title",
            artist: m.artist?.username || "Unknown Artist",
            color: dummyAlbums[i % dummyAlbums.length].color,
            image: m.coverArt || dummyAlbums[i % dummyAlbums.length].image,
            audioUrl: `/api/music/stream/${m._id}`
          })));
        } else {
          setMusics(dummyAlbums);
        }
      })
      .catch(err => {
        console.warn("Backend fetch failed/timed out, using offline mock data.");
        setMusics(dummyAlbums);
      })
      .finally(() => clearTimeout(timeoutId));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="home-layout"
      style={{
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Background ambient lighting */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(29,185,84,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(100px)', zIndex: -1 }} />

      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="glass-panel main-content" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {currentView === 'home' && (
          <>
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
            <div className="albums-grid" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {musics.map((album, index) => (
                <AlbumCard key={index} title={album.title} artist={album.artist} image={album.image} color={album.color} delay={1 + index * 0.1} onClick={() => playSong(album)} />
              ))}
            </div>
          </>
        )}

        {currentView === 'search' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px', color: 'var(--color-text-main)' }}>Search</h1>
            <div style={{ position: 'relative', maxWidth: '500px', marginBottom: '40px' }}>
              <Search size={24} color="var(--color-text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="custom-cursor-target"
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 56px',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              />
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>Browse All</h2>
            <div className="albums-grid" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {musics.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.artist.toLowerCase().includes(searchQuery.toLowerCase())).map((album, index) => (
                <AlbumCard key={index} title={album.title} artist={album.artist} image={album.image} color={album.color} delay={0.1 + index * 0.05} onClick={() => playSong(album)} />
              ))}
            </div>
          </motion.div>
        )}

        {currentView === 'library' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-text-main)' }}>Your Library</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '40px' }}>Your favorite tunes in one place.</p>
            <div className="albums-grid" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {musics.slice(0, 4).map((album, index) => (
                <AlbumCard key={index} title={album.title} artist={album.artist} image={album.image} color={album.color} delay={0.1 + index * 0.05} onClick={() => playSong(album)} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
