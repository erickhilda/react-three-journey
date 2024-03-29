'use client';

import { Suspense } from 'react';
import type { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { DoubleSide } from 'three';

function TorusMesh(props: JSX.IntrinsicElements['meshPhysicalMaterial']) {
  return (
    <mesh position={[1.5, 0, 0]}>
      <torusGeometry args={[0.3, 0.2, 32, 32]} />
      <meshPhysicalMaterial {...props} />
    </mesh>
  );
}

function PlaneMesh(props: JSX.IntrinsicElements['meshPhysicalMaterial']) {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshPhysicalMaterial {...props} side={DoubleSide} />
    </mesh>
  );
}

function SphereMesh(props: JSX.IntrinsicElements['meshPhysicalMaterial']) {
  return (
    <mesh position={[-1.5, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshPhysicalMaterial {...props} />
    </mesh>
  );
}

const Materials: NextPage = () => {
  const materialProps = useControls({
    color: 'orange',
    opacity: 1,
    roughness: 0.5,
    metalness: 0.5,
  });

  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.4} />
      <spotLight
        position={[25, 20, 10]}
        angle={0.15}
        penumbra={1}
        color={0xffffff}
      />

      <Suspense fallback={null}>
        <TorusMesh {...materialProps} />
        <PlaneMesh {...materialProps} />
        <SphereMesh {...materialProps} />
      </Suspense>
    </Canvas>
  );
};

export default Materials;
