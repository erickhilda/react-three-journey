import { Suspense, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { DoubleSide, Mesh } from "three";

function Octagon() {
  const { radius, detail } = useControls({
    radius: 1,
    detail: 1,
  });

  const materialsProps = useControls({
    wireframe: false,
  });

  const octaRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    octaRef.current.rotation.x += 0.02;
    octaRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={octaRef}>
      <octahedronGeometry args={[radius, detail]} />
      <meshPhongMaterial
        color={0x156289}
        flatShading
        emissive={0x072534}
        side={DoubleSide}
        {...materialsProps}
      />
    </mesh>
  );
}

const Geometries: NextPage = () => {
  const { lightIntensity } = useControls({
    lightIntensity: 0.4,
  });

  return (
    <div className="h-screen w-full">
      <Head>
        <title>React-Three Journey | Geometry</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Canvas>
        <ambientLight intensity={lightIntensity} color={0x156289} />
        <spotLight
          position={[0, 200, 0]}
          angle={0.15}
          penumbra={1}
          color={0xffffff}
        />
        <spotLight
          position={[100, 200, 100]}
          angle={0.15}
          penumbra={1}
          color={0xffffff}
        />
        <spotLight
          position={[-100, -200, -100]}
          angle={0.15}
          penumbra={1}
          color={0xffffff}
        />

        <Suspense fallback={null}>
          <Octagon />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Geometries;