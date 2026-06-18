import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Home from './components/Home';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [loading, setLoading] = useState(true);

  // Once Preloader calls onComplete, we remove it from the DOM
  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <>
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
