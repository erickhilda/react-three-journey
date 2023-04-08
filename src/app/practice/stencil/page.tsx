'use client';

import { Suspense, useRef } from 'react';
import type { NextPage } from 'next';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BackSide, FrontSide, Mesh } from 'three';

function NormalBox() {
  const mesh = useRef<Mesh>(null!);
  const offset = useRef(Math.random() * 10000);
  useFrame((state) => {
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.005;
    const t = offset.current + state.clock.getElapsedTime();
    mesh.current.position.x = (Math.sin((t / 4) * 4) / 10) * 6;
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  );
}

function PortalBox({ side }: { side: any }) {
  const mesh = useRef<Mesh>(null!);
  return (
    <mesh ref={mesh} position={[1, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshNormalMaterial side={side} />
    </mesh>
  );
}

function duplicateZeros(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      for (let j = arr.length - 1; j > i; j--) {
        arr[j] = arr[j - 1];
      }

      arr[i + 1] = 0;
    }
  }
}

const Stencil: NextPage = () => {
  return (
    <Canvas>
      <OrbitControls makeDefault />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <PortalBox side={BackSide} />
        <PortalBox side={FrontSide} />
        <NormalBox />
      </Suspense>
    </Canvas>
  );
};

export default Stencil;
