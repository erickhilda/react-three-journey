'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import PortalModel from '@/components/pages/portal/portal-model';

function Portal() {
  return (
    <Canvas
      flat
      camera={{
        fov: 45,
        near: 0.1,
        far: 50,
        position: [1, 2, 6],
      }}
    >
      <color args={['#030202']} attach="background" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        maxPolarAngle={Math.PI * 0.47}
        minDistance={5}
        maxDistance={20}
        makeDefault
      />

      <PortalModel />
    </Canvas>
  );
}

export default Portal;
