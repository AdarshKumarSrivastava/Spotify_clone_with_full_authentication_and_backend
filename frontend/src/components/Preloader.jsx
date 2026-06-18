import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float, Sparkles, Center, useTexture, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion } from 'framer-motion';

// Dummy texture for album (Spotify logo colors for now)
const FloatingAlbum = ({ position, rotation, delay, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 2 + delay) * 0.2;
    meshRef.current.rotation.x = rotation[0] + Math.sin(t + delay) * 0.1;
    meshRef.current.rotation.y = rotation[1] + Math.cos(t * 1.5 + delay) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} castShadow>
      <boxGeometry args={[1.5, 1.5, 0.1]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
    </mesh>
  );
};

const GlassFolder = ({ folderRef }) => {
  return (
    <group ref={folderRef}>
      {/* Back Panel */}
      <mesh position={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[4, 3, 0.1]} />
        <MeshTransmissionMaterial 
          backside
          thickness={0.5}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          color="#1DB954"
        />
      </mesh>
      
      {/* Front Panel (Angled slightly open) */}
      <mesh position={[0, -0.2, 0.2]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <MeshTransmissionMaterial 
          thickness={0.5}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          color="#1ED760"
        />
      </mesh>

      {/* Floating Albums emerging from folder */}
      <FloatingAlbum position={[-1, 1, 0]} rotation={[0, -0.2, 0.1]} delay={0} color="#ff3366" />
      <FloatingAlbum position={[1, 1.5, 0]} rotation={[0.1, 0.2, -0.1]} delay={1} color="#33ccff" />
      <FloatingAlbum position={[0, 2, -0.1]} rotation={[-0.1, 0, 0.2]} delay={2} color="#ffcc00" />
    </group>
  );
};

const Scene = ({ onComplete }) => {
  const folderRef = useRef();
  const lightRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500); // Trigger finish
      }
    });

    // Animate folder entrance
    tl.fromTo(folderRef.current.position, { y: -5, z: -5 }, { y: 0, z: 0, duration: 2, ease: "power3.out" })
      .fromTo(folderRef.current.rotation, { x: 0.5, y: -Math.PI }, { x: 0, y: 0, duration: 2.5, ease: "power3.inOut" }, "-=2")
      .to(lightRef.current, { intensity: 50, duration: 2, ease: "power2.inOut" }, "-=1.5")
      .to(folderRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: 1 })
      .to(folderRef.current.position, { y: 5, z: -2, duration: 1.5, ease: "power3.in" }, "+=0.5")
      .to(folderRef.current.scale, { x: 0, y: 0, z: 0, duration: 1, ease: "power3.in" }, "-=1");

  }, [onComplete]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} position={[0, 0, 5]} color="#1ED760" intensity={0} distance={20} />
      <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={10} color="#ffffff" castShadow />
      
      <Environment preset="city" />
      
      <Center>
        <GlassFolder folderRef={folderRef} />
      </Center>

      <Sparkles count={200} scale={10} size={2} speed={0.4} color="#1DB954" />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={15} blur={2} far={4} />
    </>
  );
};

export default function Preloader({ onComplete }) {
  return (
    <motion.div 
      className="preloader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#050505',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene onComplete={onComplete} />
          </Suspense>
        </Canvas>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          color: '#1DB954',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '1.2rem',
          letterSpacing: '4px',
          fontWeight: 600,
          textTransform: 'uppercase',
          textShadow: '0 0 10px rgba(29, 185, 84, 0.5)'
        }}
      >
        Initializing Experience
      </motion.div>
    </motion.div>
  );
}
