'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Saturn from '@/components/pages/solar-sytem/saturn/saturn';

const SolarSystem = () => {
  return (
    <Canvas camera={{ position: [0, 4, 5] }}>
      <color attach="background" args={['#1b153e']} />
      <directionalLight
        color="#ffffff"
        intensity={1}
        position={[-5, 3, 2.25]}
        castShadow
      />
      <OrbitControls />
      <Suspense fallback={null}>
        <Saturn />
      </Suspense>
    </Canvas>
  );
};

export default SolarSystem;
