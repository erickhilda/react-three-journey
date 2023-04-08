'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Mesh,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper,
} from 'three';
import { OrbitControls, useHelper, useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import SphereMesh from '@/components/SphereMesh';

function CoastPlane(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<Mesh>(null!);

  const { texture, displacementScale } = useControls({
    texture: {
      value: 'aerial_rocks',
      options: ['coast_and_rocks', 'aerial_rocks', 'floor_tiles'],
    },
    displacementScale: 0.5,
  });
  const planeTexture = useTexture({
    map: `/textures/${texture}/diff.jpg`,
    displacementMap: `/textures/${texture}/disp.jpg`,
    aoMap: `/textures/${texture}/arm.jpg`,
    roughnessMap: `/textures/${texture}/arm.jpg`,
    metalnessMap: `/textures/${texture}/arm.jpg`,
    normalMap: `/textures/${texture}/nor_gl.jpg`,
  });
  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        rotation-x={-Math.PI / 2}
        position={[0, -2, 0]}
        receiveShadow
      >
        <planeGeometry args={[15, 15, 160, 160]} />
        <meshStandardMaterial
          {...planeTexture}
          displacementScale={displacementScale}
        />
      </mesh>
    </>
  );
}

function LightPlane() {
  const spotLightRef = useRef<SpotLight>(null!);
  const pointLightRef = useRef<PointLight>(null!);

  useHelper(spotLightRef, SpotLightHelper, 1);
  useHelper(pointLightRef, PointLightHelper, 1, 'red');

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight
        ref={spotLightRef}
        angle={0.2}
        intensity={2.5}
        position={[3, 5, 0]}
        color="white"
      />

      <pointLight
        ref={pointLightRef}
        intensity={2}
        position={[4, 3, 7]}
        color="white"
      />
    </>
  );
}

const Textures = () => {
  return (
    <Canvas shadows>
      <OrbitControls />
      <LightPlane />

      <Suspense fallback={null}>
        <SphereMesh />
        <CoastPlane />
      </Suspense>
    </Canvas>
  );
};

export default Textures;
