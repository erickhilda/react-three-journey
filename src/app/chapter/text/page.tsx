'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TextMesh from '@/components/TextMesh';

const Text3D = () => {
  return (
    <Canvas>
      <OrbitControls makeDefault autoRotate />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="green" />
      <Suspense fallback={null}>
        <TextMesh />
      </Suspense>
    </Canvas>
  );
};

export default Text3D;
