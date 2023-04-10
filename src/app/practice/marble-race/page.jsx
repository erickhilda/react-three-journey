'use client';

import { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import Interface from '@/components/pages/marble-race/interface';
import Experience from '@/components/pages/marble-race/experience';

function MarbleRace() {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <color args={['#030202']} attach="background" />
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
}

export default MarbleRace;
