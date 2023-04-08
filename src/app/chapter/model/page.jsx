'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from '@/components/Model';

export default function Viewer() {
  const ref = useRef();

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 2], fov: 50 }}>
      <fog attach="fog" args={['#171720', 10, 50]} />
      <color attach="background" args={['#171720']} />
      <ambientLight intensity={0.4} />
      <Suspense fallback={null}>
        <Model castShadow position={[0, 0.01, 0]} />
        <Environment preset="night" />
      </Suspense>
      <OrbitControls ref={ref} />
    </Canvas>
  );
}
