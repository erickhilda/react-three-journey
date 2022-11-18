import { OrbitControls, Plane, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import type { NextPage } from "next";
import { useRef } from "react";
import { Mesh } from "three";
import styles from "../styles/Home.module.css";

const Shadows: NextPage = () => {
  const lightProps = useControls({
    color: "darkorange",
    intensity: 1,
    position: [3, 3, 3],
    distance: 10,
    angle: Math.PI / 4,
    penumbra: 0.5,
    decay: 0.5,
  });
  const mainLightRef = useRef<Mesh>(null!);

  return (
    <div className={styles.container}>
      <Canvas shadows dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        {/* <spotLight ref={mainLightRef} castShadow {...lightProps} /> */}
        <directionalLight
          color="white"
          castShadow
          intensity={1}
          position={[3, 3, 5]}
          shadow-mapSize-Width={1024}
          shadow-mapSize-height={1024}
        />
        <OrbitControls makeDefault />
        <Sphere castShadow position={[1, 1, 1]} scale={1}>
          <meshPhysicalMaterial color="hotpink" />
        </Sphere>
        <Plane
          receiveShadow
          args={[20, 20]}
          rotation={[Math.PI * -0.5, 0, 0]}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial color="white" />
        </Plane>
      </Canvas>
    </div>
  );
};

export default Shadows;
