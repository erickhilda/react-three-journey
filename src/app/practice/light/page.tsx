'use client';

import { Suspense, useLayoutEffect, useMemo, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  BackSide,
  BasicShadowMap,
  CanvasTexture,
  Color,
  DoubleSide,
  NearestFilter,
  PointLight,
  RepeatWrapping,
} from 'three';

function generateTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 2;
  canvas.height = 2;

  const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  context!.fillStyle = 'white';
  context?.fillRect(0, 1, 2, 1);

  return canvas;
}

const LightBall = ({
  color,
  additionalTime,
}: {
  color: Color;
  additionalTime: number;
}) => {
  const intensity = 2;

  const lightTexture = useMemo(() => new CanvasTexture(generateTexture()), []);

  useLayoutEffect(() => {
    lightTexture.magFilter = NearestFilter;
    lightTexture.wrapT = RepeatWrapping;
    lightTexture.wrapS = RepeatWrapping;
    lightTexture.repeat.set(1, 4.5);
  }, [lightTexture]);

  const lightBall = useRef<PointLight>(null!);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() + additionalTime;

    lightBall.current.position.x = Math.sin(elapsedTime * 0.6) * 9;
    lightBall.current.position.y = Math.sin(elapsedTime * 0.7) * 9;
    lightBall.current.position.z = Math.sin(elapsedTime * 0.8) * 9;

    lightBall.current.rotation.x = elapsedTime;
    lightBall.current.rotation.z = elapsedTime;
  });

  return (
    <pointLight
      ref={lightBall}
      castShadow
      color={color}
      intensity={intensity}
      distance={20}
      shadow-bias={-0.005}
    >
      <mesh>
        <sphereGeometry args={[0.3, 12, 16]} />
        <meshBasicMaterial color={color} color-multiply-scalar={intensity} />
      </mesh>

      <mesh receiveShadow castShadow>
        <sphereGeometry args={[2, 32, 8]} />
        <meshPhongMaterial
          side={DoubleSide}
          alphaMap={lightTexture}
          alphaTest={0.5}
        />
      </mesh>
    </pointLight>
  );
};

const LightInBox = () => {
  return (
    <Canvas
      shadows={{ enabled: true, type: BasicShadowMap }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 20] }}
    >
      <color attach="background" args={['#171720']} />
      <OrbitControls
        maxPolarAngle={Math.PI * 0.47}
        minDistance={5}
        maxDistance={20}
        makeDefault
        enableZoom={false}
      />
      <ambientLight color={0x111122} />
      {/* <Stage> */}
      <Suspense fallback={null}>
        <mesh receiveShadow>
          <boxGeometry args={[30, 30, 30]} />
          <meshPhongMaterial
            side={BackSide}
            color={0xa0adaf}
            shininess={10}
            specular={0x111111}
          />
        </mesh>
        <LightBall color={new Color(0x0088ff)} additionalTime={0} />
        <LightBall color={new Color(0xff8888)} additionalTime={1000} />
      </Suspense>
      {/* </Stage> */}
    </Canvas>
  );
};

export default LightInBox;
