import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Home from './components/Home';
import MusicPlayer from './components/MusicPlayer';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const onMouseOver = (e) => {
      if (['A', 'BUTTON'].includes(e.target.tagName) || e.target.closest('a') || e.target.closest('button') || e.target.closest('.custom-cursor-target')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor ${hovering ? 'hovering' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  // Once Preloader calls onComplete, we remove it from the DOM
  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
          <React.Fragment key="main-app">
            <Home />
            <MusicPlayer />
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
