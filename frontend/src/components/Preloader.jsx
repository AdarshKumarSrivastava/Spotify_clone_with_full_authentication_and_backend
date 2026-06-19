import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Center, Sparkles, Text, RoundedBox, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

// --- Spotify Branding ---
const SpotifyLogoImage = () => {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/images/spotify.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    });
  }, []);

  if (!texture) return null;
  return (
    <mesh position={[0.4, 0, 0]} scale={0.6}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
};

// --- SafeTexture for Albums ---
const SafeTexture = ({ url, color, title }) => {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (!url) return;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      },
      undefined,
      (err) => console.warn("Failed to load texture, falling back to color", err)
    );
  }, [url]);

  if (texture) {
    return <meshStandardMaterial map={texture} roughness={0.2} metalness={0.1} />;
  }

  return (
    <>
      <meshStandardMaterial color={color} roughness={0.4} />
      <Text position={[0, 0, 0.01]} fontSize={0.25} color="white" maxWidth={1.5} textAlign="center" anchorX="center" anchorY="middle">
        {title}
      </Text>
    </>
  );
};

// --- Emerging Album Cards ---
const FloatingAlbum = ({ position, targetPosition, rotation, targetRotation, color, title, url, delay, timeline }) => {
  const ref = useRef();

  useEffect(() => {
    if (timeline && ref.current) {
      timeline.fromTo(ref.current.position,
        { x: position[0], y: position[1], z: position[2] },
        { x: targetPosition[0], y: targetPosition[1], z: targetPosition[2], duration: 1.8, ease: "power3.out" },
        delay
      );
      timeline.fromTo(ref.current.rotation,
        { x: rotation[0], y: rotation[1], z: rotation[2] },
        { x: targetRotation[0], y: targetRotation[1], z: targetRotation[2], duration: 1.8, ease: "power3.out" },
        delay
      );
    }
  }, [timeline, position, targetPosition, rotation, targetRotation, delay]);

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <RoundedBox args={[1.8, 1.8, 0.05]} radius={0.1} smoothness={4} castShadow>
        <meshStandardMaterial color="#111" roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[1.7, 1.7]} />
        <SafeTexture url={url} color={color} title={title} />
      </mesh>
    </group>
  );
};


// --- Main Glass Folder ---
const GlassFolder = ({ timeline }) => {
  const folderRef = useRef();

  useEffect(() => {
    if (timeline && folderRef.current) {
      // Folder entrance
      timeline.fromTo(folderRef.current.position,
        { y: -4, z: -2 },
        { y: 0, z: 0, duration: 2, ease: "power3.out" },
        0
      );
      timeline.fromTo(folderRef.current.rotation,
        { x: 0.5, y: -Math.PI / 4, z: -0.2 },
        { x: 0, y: 0, z: 0, duration: 2, ease: "power3.out" },
        0
      );
    }
  }, [timeline]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (folderRef.current) {
      folderRef.current.position.y += Math.sin(t) * 0.001; // subtle breathing
      folderRef.current.rotation.y = Math.sin(t * 0.5) * 0.03;
      folderRef.current.rotation.x = Math.cos(t * 0.5) * 0.03;
    }
  });

  return (
    <group ref={folderRef} position={[0, -4, -2]} rotation={[0.5, -Math.PI / 4, -0.2]}>
      {/* Back Panel */}
      <RoundedBox position={[0, 0, -0.3]} args={[4.2, 3.2, 0.1]} radius={0.15} smoothness={4} castShadow>
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.2}
          transmission={1}
          ior={1.5}
          color="#0e5927"
          attenuationColor="#1DB954"
          attenuationDistance={1}
          transparent={true}
          opacity={0.9}
        />
      </RoundedBox>

      {/* Emerging Albums */}
      <FloatingAlbum
        position={[-0.5, -1, -0.1]} targetPosition={[-1.2, 1.8, -0.15]}
        rotation={[0, 0, 0]} targetRotation={[0, 0.1, 0.15]}
        color="#ff3366" title="Karan Aujla" url="https://sadgirldp.com/karan-aujla-pics/" delay={0.8} timeline={timeline}
      />
      <FloatingAlbum
        position={[0.5, -1, -0.1]} targetPosition={[1.2, 1.8, -0.15]}
        rotation={[0, 0, 0]} targetRotation={[0, -0.1, -0.15]}
        color="#33ccff" title="Honey Singh" url="https://en.wikipedia.org/wiki/Yo_Yo_Honey_Singh" delay={1.0} timeline={timeline}
      />
      {/* Center album is largest and in front */}
      <FloatingAlbum
        position={[0, -1, 0]} targetPosition={[0, 2.4, 0.05]}
        rotation={[0, 0, 0]} targetRotation={[0, 0, 0]}
        color="#ffcc00" title="Diljit Dosanjh" url="https://in.pinterest.com/parinwalia/diljit-dosanjh/" delay={1.2} timeline={timeline}
      />

      {/* Front Panel (Angled slightly open) */}
      <RoundedBox position={[0, -0.2, 0.3]} rotation={[0.15, 0, 0]} args={[4.4, 3, 0.05]} radius={0.15} smoothness={4} castShadow>
        <MeshTransmissionMaterial
          thickness={0.2}
          roughness={0.1}
          transmission={0.95}
          ior={1.4}
          color="#1ED760"
          attenuationColor="#ffffff"
          attenuationDistance={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent={true}
          opacity={1}
        />

        {/* Embedded Spotify Branding */}
        <group position={[0, -0.8, 0.03]} scale={0.8}>
          <SpotifyLogoImage />
          <React.Suspense fallback={null}>
            <Text fontSize={0.5} color="white" anchorX="right" anchorY="middle" position={[-0.1, 0, 0]} letterSpacing={-0.05} fontWeight="bold">
              Spotify - AS
            </Text>
          </React.Suspense>
        </group>
      </RoundedBox>
    </group>
  );
};

// --- 3D Scene Assembly ---
const Scene = ({ onComplete }) => {
  const [timeline, setTimeline] = useState(null);
  const mainGroup = useRef();

  useEffect(() => {
    // Create master timeline
    const tl = gsap.timeline();
    setTimeline(tl);

    // After animations, hold for a moment then transition out
    tl.to({}, { duration: 5.5 }); // Keep scene active for 5.5 seconds total

    // Exit animation
    tl.to(mainGroup.current.position, { y: 2, duration: 1.2, ease: "power3.inOut" }, "exit")
      .to(mainGroup.current.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 1.2, ease: "power3.inOut" }, "exit")
      .to(mainGroup.current.rotation, { x: -0.2, duration: 1.2, ease: "power3.inOut" }, "exit");

    tl.call(() => {
      if (onComplete) onComplete();
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <>
      <ambientLight intensity={0.5} />
      {/* Volumetric Green Cinematic Lighting */}
      <pointLight position={[0, 0, 2]} color="#1ED760" intensity={1} distance={10} />
      <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={10} color="#1ED760" castShadow />
      <spotLight position={[-5, 10, -5]} angle={0.5} penumbra={1} intensity={5} color="#ffffff" />

      {/* Dynamic Environment map for realistic glass reflections without external CDN downloads */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer form="rect" intensity={4} color="#1ED760" position={[0, 5, -10]} scale={[20, 10, 1]} />
          <Lightformer form="rect" intensity={2} color="#ffffff" position={[-10, 5, 0]} scale={[20, 10, 1]} />
          <Lightformer form="circle" intensity={3} color="#1ED760" position={[10, 5, 0]} scale={[10, 10, 1]} />
        </group>
      </Environment>

      <group ref={mainGroup}>
        <GlassFolder timeline={timeline} />
      </group>

      <Sparkles count={150} scale={12} size={2} speed={0.2} opacity={0.3} color="#1ED760" />
      <Sparkles count={50} scale={10} size={4} speed={0.1} opacity={0.1} color="#ffffff" />
    </>
  );
};

// --- Main Component ---
export default function Preloader({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 1000); // Wait for CSS fade out
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="preloader-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'radial-gradient(circle at center, #0a1f11 0%, #020804 100%)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 7.5], fov: 45 }}>
              <React.Suspense fallback={null}>
                <Scene onComplete={handleComplete} />
              </React.Suspense>
            </Canvas>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
