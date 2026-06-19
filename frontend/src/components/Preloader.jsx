import React, { useEffect, useRef, useState } from 'react';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const fillRef = useRef(null);
  const pctRef = useRef(null);
  const sceneRef = useRef(null);
  const [done, setDone] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const preloader = preloaderRef.current;
    if (!preloader) return;

    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      const green = Math.random() > 0.4;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${15 + Math.random() * 70}%;
        bottom: ${8 + Math.random() * 35}%;
        background: ${green
          ? `rgba(29,215,96,${0.4 + Math.random() * 0.4})`
          : `rgba(120,255,150,${0.2 + Math.random() * 0.3})`};
        animation-duration: ${3.5 + Math.random() * 4.5}s;
        animation-delay: ${Math.random() * 5}s;
        box-shadow: 0 0 ${size * 2}px ${green ? 'rgba(29,215,96,0.6)' : 'rgba(150,255,160,0.4)'};
      `;
      preloader.appendChild(p);
    }

    return () => {
      const particles = preloader.querySelectorAll('.particle');
      particles.forEach(p => p.remove());
    };
  }, []);

  useEffect(() => {
    let progress = 0;
    let isDone = false;
    let frameId;
    const fill = fillRef.current;
    const pct = pctRef.current;

    const milestones = [
      { target: 30,  duration: 600  },
      { target: 58,  duration: 700  },
      { target: 75,  duration: 500  },
      { target: 89,  duration: 600  },
      { target: 100, duration: 500  },
    ];

    function animateTo(target, duration, callback) {
      const start = progress;
      const startTime = performance.now();

      function tick(now) {
        if(isDone) return;
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        progress = start + (target - start) * eased;

        if (fill) fill.style.width = progress + '%';
        if (pct) pct.textContent = Math.round(progress) + '%';

        if (t < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          progress = target;
          if (fill) fill.style.width = target + '%';
          if (pct) pct.textContent = target + '%';
          if (callback) callback();
        }
      }
      frameId = requestAnimationFrame(tick);
    }

    function runMilestones(index) {
      if (index >= milestones.length) {
        finishLoading();
        return;
      }
      const m = milestones[index];
      animateTo(m.target, m.duration, () => {
        const pause = index < milestones.length - 1 ? 80 + Math.random() * 120 : 0;
        setTimeout(() => runMilestones(index + 1), pause);
      });
    }

    function finishLoading() {
      if (isDone) return;
      isDone = true;
      setDone(true);
      setShowWelcome(true); // Fade in the welcome screen behind the 3D scene
      
      setTimeout(() => {
        if (preloaderRef.current) {
          preloaderRef.current.classList.add('hide'); // Hide 3D scene to reveal welcome screen
        }
        setTimeout(() => {
          setShowWelcome(false); // Fade out the welcome screen
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000); // Wait for welcome screen to fade out before showing main app
        }, 2000); // Show welcome text for 2 seconds
      }, 500);
    }

    const timer = setTimeout(() => runMilestones(0), 200);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [onComplete]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (done || !sceneRef.current) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      sceneRef.current.style.transform = `translateY(-38px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`;

      const cards = preloaderRef.current?.querySelectorAll('.album-card');
      cards?.forEach((card, i) => {
        const depth = (i + 1) * 3;
        card.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
      });
    };

    const handleMouseLeave = () => {
      if (sceneRef.current) {
        sceneRef.current.style.transform = '';
      }
      const cards = preloaderRef.current?.querySelectorAll('.album-card');
      cards?.forEach(card => {
        card.style.transform = '';
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [done]);

  return (
    <>
      <div className={`welcome-screen ${showWelcome ? 'show' : ''}`}>
        <p className="demo-text">
          <span className="welcome-part">Welcome to</span>
          <span className="spotify-part">Spotify</span>
        </p>
      </div>

      <div id="preloader" ref={preloaderRef}>
        <div className="glow-orb"></div>
        <div className="glow-orb-2"></div>

      <div className="scene" ref={sceneRef}>
        <div className="cards-container">
          <div className="album-card card-1">
            <div className="art-1">
              <div className="face-circle"></div>
              <div className="card-title">Big Brulee</div>
            </div>
          </div>
          <div className="album-card card-2">
            <div className="art-2">
              <div className="illum-text">Illuminati</div>
              <div className="tri"></div>
              <div className="figure">
                <div className="figure-shape"></div>
              </div>
              <div className="card-title">Badshah · Dazzer</div>
            </div>
          </div>
          <div className="album-card card-3">
            <div className="art-3">
              <div className="face-shape"></div>
              <div className="card-title">Dazzer</div>
            </div>
          </div>
        </div>

        <div className="folder-wrap">
          <div className="folder-tab"></div>
          <div className="folder-body">
            <div className="folder-shimmer"></div>
            <div className="spotify-brand">
              <div className="sp-icon">
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.519-.972c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.79c3.527-1.072 9.396-.865 13.105 1.338a.937.937 0 01-.945 1.609z"/>
                </svg>
              </div>
              <span className="sp-wordmark">spotify</span>
            </div>
          </div>
        </div>

        <div className="reflection"></div>
      </div>

      <div className="cursor-arrow">
        <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="arrowGrad" x1="6" y1="4" x2="44" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(180,255,200,0.5)"/>
              <stop offset="100%" stopColor="rgba(29,185,84,0.05)"/>
            </linearGradient>
          </defs>
          <path d="M10 8L44 26L26 31L17 47L10 8Z" fill="rgba(0,0,0,0.3)" transform="translate(2,3)"/>
          <path d="M10 8L44 26L26 31L17 47L10 8Z" fill="rgba(90,230,130,0.92)" stroke="rgba(150,255,170,0.55)" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M10 8L44 26L26 31L17 47L10 8Z" fill="url(#arrowGrad)"/>
        </svg>
      </div>

      <div className="loader-ui">
        <div className="loader-label">Loading</div>
        <div className="loader-track">
          <div className="loader-fill" id="loaderFill" ref={fillRef}></div>
        </div>
        <div className="loader-percent" id="loaderPercent" ref={pctRef}>0%</div>
      </div>
    </div>
    </>
  );
}
