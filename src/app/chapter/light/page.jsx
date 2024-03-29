'use client';

import {
  OrbitControls,
  Sphere,
  Plane,
  useHelper,
  Torus,
  Box,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';

function Model() {
  return (
    <>
      <Box castShadow position={[1, 0, 0]}>
        <meshPhysicalMaterial color="hotpink" />
      </Box>
      <Sphere castShadow position={[3, 0, 0]} scale={0.6}>
        <meshPhysicalMaterial color="hotpink" />
      </Sphere>
      <Torus
        castShadow
        args={[0.3, 0.2, 20, 45]}
        position={[-1, 0, 0]}
        scale={1.25}
      >
        <meshPhysicalMaterial color="hotpink" />
      </Torus>
      <Plane
        receiveShadow
        color="aqua"
        args={[20, 20]}
        rotation={[Math.PI * -0.5, 0, 0]}
        position={[0, -1, 0]}
      >
        <meshPhysicalMaterial color="gray" />
      </Plane>
    </>
  );
}

function Light() {
  const lightProps = useControls({
    color: 'darkorange',
    intensity: 1,
    position: [3, 3, 3],
    distance: 10,
    angle: Math.PI / 4,
    penumbra: 0.5,
    decay: 0.5,
  });
  const mainLightRef = useRef();
  const secondaryLightRef = useRef();
  useHelper(mainLightRef, THREE.SpotLightHelper, 'red');
  useHelper(secondaryLightRef, THREE.RectAreaLight, 'blue');
  return (
    <>
      <ambientLight color="aqua" />
      <spotLight ref={mainLightRef} castShadow {...lightProps} />
      {/* <directionalLight {...lightProps} /> */}
      {/* <hemisphereLight {...lightProps} castShadow /> */}
      {/* <pointLight {...lightProps} /> */}
      <rectAreaLight castShadow {...lightProps} />
    </>
  );
}

export default function App() {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <OrbitControls makeDefault />
      <Light />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}
