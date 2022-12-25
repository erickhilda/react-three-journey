import { OrbitControls, useHelper, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import type { NextPage } from "next";
import Head from "next/head";
import { Suspense, useLayoutEffect, useRef } from "react";
import { Mesh, PointLight, RepeatWrapping } from "three";

function Floor() {
  const mesh = useRef<Mesh>(null!);

  const planeTexture = useTexture({
    map: "/textures/grassy_cobblestone/diff.jpg",
    displacementMap: "/textures/grassy_cobblestone/disp.jpg",
    aoMap: "/textures/grassy_cobblestone/ao.jpg",
    roughnessMap: "/textures/grassy_cobblestone/rough.jpg",
    metalnessMap: "/textures/grassy_cobblestone/arm.jpg",
    normalMap: "/textures/grassy_cobblestone/nor_gl.jpg",
    alphaMap: "/textures/grassy_cobblestone/mask.png",
  });

  useLayoutEffect(() => {
    Object.values(planeTexture).forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(4, 4);
    });
  }, [planeTexture]);

  return (
    <mesh
      ref={mesh}
      rotation-x={-Math.PI / 2}
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[40, 40, 200, 200]} />
      <meshStandardMaterial {...planeTexture} displacementScale={0.35} />
    </mesh>
  );
}

function House() {
  const mesh = useRef<Mesh>(null!);
  const houseTexture = useTexture({
    map: "/textures/bricks/color.jpg",
    normalMap: "/textures/bricks/normal.jpg",
    roughnessMap: "/textures/bricks/roughness.jpg",
    aoMap: "/textures/bricks/ambientOcclusion.jpg",
  });
  return (
    <mesh position={[0, 1.25, 0]} ref={mesh} castShadow receiveShadow>
      <boxGeometry args={[4, 2.5, 4]} />
      <meshStandardMaterial {...houseTexture} transparent />
    </mesh>
  );
}

function Roof() {
  return (
    <mesh position-y={3} rotation-y={Math.PI * 0.25}>
      <coneGeometry args={[3.5, 1, 4]} />
      <meshStandardMaterial color="#b35f45" />
    </mesh>
  );
}

function Door() {
  const mesh = useRef<Mesh>(null!);
  const houseTexture = useTexture({
    map: "/textures/door/color.jpg",
    normalMap: "/textures/door/normal.jpg",
    roughnessMap: "/textures/door/roughness.jpg",
    aoMap: "/textures/door/ambientOcclusion.jpg",
    metalnessMap: "/textures/door/metalness.jpg",
    displacementMap: "/textures/door/height.jpg",
    alphaMap: "/textures/door/alpha.jpg",
  });
  return (
    <mesh position={[0, 1, 2.0]} ref={mesh} receiveShadow>
      <planeGeometry args={[2, 2, 128, 128]} />
      <meshStandardMaterial
        {...houseTexture}
        displacementScale={0.15}
        transparent
      />
    </mesh>
  );
}

function Bush(props: JSX.IntrinsicElements["mesh"]) {
  return (
    <mesh {...props} castShadow>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#89c854" />
    </mesh>
  );
}

function Bushes() {
  return (
    <group dispose={null}>
      <Bush scale={[0.5, 0.5, 0.5]} position={[0.8, 0.2, 2.2]} />
      <Bush scale={[0.25, 0.25, 0.25]} position={[1.4, 0.1, 2.1]} />
      <Bush scale={[0.4, 0.4, 0.4]} position={[-0.8, 0.1, 2.2]} />
      <Bush scale={[0.15, 0.15, 0.15]} position={[-1, 0.05, 2.6]} />
    </group>
  );
}

function Grave(props: JSX.IntrinsicElements["mesh"]) {
  return (
    <mesh {...props} castShadow>
      <boxGeometry args={[0.6, 0.8, 0.2]} />
      <meshStandardMaterial color="#b2b6b1" />
    </mesh>
  );
}

function Fog() {
  const { color, near, far } = useControls("fog", {
    color: "#1b153e",
    near: { min: 1, value: 1 },
    far: { min: 10, value: 20 },
  });
  return (
    <>
      <fog attach="fog" args={[color, near, far]} />
      <color attach="background" args={[color]} />
    </>
  );
}

function Ghosts() {
  const firstGhost = useRef<PointLight>(null!);
  const secondGhost = useRef<PointLight>(null!);
  const thirdGhost = useRef<PointLight>(null!);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const ghost1Angle = elapsedTime * 0.5;
    firstGhost.current.position.x = Math.cos(ghost1Angle) * 5;
    firstGhost.current.position.z = Math.sin(ghost1Angle) * 5;
    firstGhost.current.position.y = Math.sin(elapsedTime * 5);

    const ghost2Angle = -elapsedTime * 0.32;
    secondGhost.current.position.x = Math.cos(ghost2Angle) * 6;
    secondGhost.current.position.z = Math.sin(ghost2Angle) * 6;
    secondGhost.current.position.y =
      Math.sin(elapsedTime * 6) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = -elapsedTime * 0.18;
    thirdGhost.current.position.x =
      Math.cos(ghost3Angle) * (8 + Math.sin(elapsedTime * 0.32));
    thirdGhost.current.position.z =
      Math.sin(ghost3Angle) * (8 + Math.sin(elapsedTime * 0.5));
    thirdGhost.current.position.y =
      Math.sin(elapsedTime * 6) + Math.sin(elapsedTime * 2.5);
  });

  return (
    <>
      <pointLight
        ref={firstGhost}
        intensity={2}
        distance={3}
        castShadow
        color="#ff00ff"
      />
      <pointLight
        ref={secondGhost}
        intensity={2}
        distance={3}
        castShadow
        color="#00ffff"
      />
      <pointLight
        ref={thirdGhost}
        intensity={2}
        distance={3}
        castShadow
        color="#ffff00"
      />
    </>
  );
}

const HauntedHouse: NextPage = () => {
  return (
    <div className="h-screen w-full">
      <Head>
        <title>React-Three Journey | Haunted House</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 5, 10] }}>
        <OrbitControls
          maxPolarAngle={Math.PI * 0.47}
          minDistance={5}
          maxDistance={20}
          makeDefault
        />
        <ambientLight intensity={0.12} color="lightcyan" castShadow />
        <directionalLight color="lightcyan" intensity={0.12} />
        <Fog />

        <Suspense fallback={null}>
          <Bushes />
          <Roof />
          <Door />

          <pointLight
            intensity={1}
            distance={7}
            position={[-0.3, 2.2, 2.9]}
            castShadow
            color="#ff9f76"
          />
          <Ghosts />

          <House />
          {Array.from({ length: 50 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = 4 + Math.random() * 6;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            return (
              <Grave
                key={i}
                position={[x, 0.3, z]}
                rotation-z={(Math.random() - 0.5) * 0.4}
                rotation-y={(Math.random() - 0.5) * 0.4}
              />
            );
          })}
          <Floor />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HauntedHouse;
