'use client';

import { forwardRef, Suspense, useLayoutEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, SpotLight, Vector3 } from 'three';
/**
 * Vaporwave
 * This is a recreation of the "Vaporwave" effect from the Maxime Heckel blog https://blog.maximeheckel.com/posts/vaporwave-3d-scene-with-threejs/
 * I tried to port it to React Three Fiber https://github.com/pmndrs/react-three-fiber
 * though it is not complete yet. i still struggle with the custom effect.
 */

type TerrainProps = {
  z: number;
};

const Terrain = forwardRef(({ z }: TerrainProps, ref: any) => {

  const materialRef = useRef<MeshStandardMaterial>(null!);

  const terrainTexture = useTexture({
    map: "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657168/blog/vaporwave-threejs-textures/grid.png",
    displacementMap: "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/displacement.png",
    metalnessMap: "https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/metalness.png"
  });

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI * 0.5, 0, 0]}
      position={[0, 0, z]}
    >
      <planeGeometry args={[1, 2, 24, 24]} />
      <meshStandardMaterial
        {...terrainTexture}
        ref={materialRef}
        displacementScale={0.4}
        color={0xffffff}
        metalness={0.96}
        roughness={0.5}
      />
    </mesh>
  );
});

const LandScape = () => {
  const planeRef = useRef<Mesh>(null!);
  const plane2Ref = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (!planeRef.current || !plane2Ref.current) return;

    planeRef.current.position.z = (elapsed * 0.15) % 2;
    plane2Ref.current.position.z = ((elapsed * 0.15) % 2) - 2;
  });

  return (
    <>
      <Terrain z={0} ref={planeRef} />
      <Terrain z={-2} ref={plane2Ref} />
    </>
  )
}

const Light = () => {
  const spotLightRef = useRef<SpotLight>(null!);
  const spotLight2Ref = useRef<SpotLight>(null!);
  const spotLightTargetPos = new Vector3(0.25, 0.25, 0.25);
  const spotLight2TargetPos = new Vector3(-0.25, 0.25, 0.25);

  useLayoutEffect(() => {
    if (!spotLightRef.current || !spotLight2Ref.current) return;
    spotLightRef.current.lookAt(spotLightTargetPos);
    spotLight2Ref.current.lookAt(spotLight2TargetPos);
  });

  return (
    <>
      <ambientLight intensity={10} color="white" castShadow />
      <spotLight
        ref={spotLightRef}
        color="#d53c3d"
        intensity={40}
        position={[0.5, 0.75, 2.1]}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={10}
      />
      <spotLight
        ref={spotLight2Ref}
        color="#d53c3d"
        intensity={40}
        position={[-0.5, 0.75, 2.1]}
        distance={25}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={10}
      />
    </>
  );
};

function Fog() {
  return (
    <>
      <fog attach="fog" args={['#1b153e', 1, 2.5]} />
      <color attach="background" args={['#1b153e']} />
    </>
  );
}

const VaporWave = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0.16, 1.1],
        fov: 75,
        near: 0.01,
        far: 20,
      }}
    >
      <color args={['#030202']} attach="background" />
      <Suspense fallback={null}>
        <OrbitControls
          maxPolarAngle={Math.PI * 0.47}
          maxDistance={1.2}
          makeDefault
          enableZoom={false}
          enableRotate={false}
        />
        <Light />
        <LandScape />
      </Suspense>
      <Fog />
    </Canvas>
  );
};

export default VaporWave;
