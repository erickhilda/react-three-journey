'use client';

import { OrbitControls, useTexture } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { NextPage } from 'next';
import Head from 'next/head';
import { Suspense, useMemo, useRef } from 'react';
import { DoubleSide, Mesh, TextureLoader } from 'three';
import vertexShader from '@/utils/ring-shader/vertexShader';
import fragmentShader from '@/utils/ring-shader/fragmentShader';

function Planet() {
  const saturnTexture = useTexture({
    map: '/textures/saturn/saturn.jpg',
  });

  return (
    <mesh receiveShadow castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial {...saturnTexture} transparent />
    </mesh>
  );
}

function Ring() {
  const ref = useRef<Mesh>(null!);

  const [ringTexture] = useLoader(TextureLoader, [
    '/textures/saturn/saturn_ring_top.png',
  ]);

  const uniforms = useMemo(
    () => ({
      u_texture: { value: ringTexture },
      u_inner_rad: { value: 1.3 },
      u_outer_rad: { value: 2.5 },
    }),
    [ringTexture]
  );

  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      rotation-x={-Math.PI / 2}
      receiveShadow
      castShadow
    >
      <ringGeometry args={[1.3, 2.5, 64, 12]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        side={DoubleSide}
        transparent
      />
    </mesh>
  );
}

const Saturn: NextPage = () => {
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
        <Planet />
        <Ring />
      </Suspense>
    </Canvas>
  );
};

export default Saturn;
