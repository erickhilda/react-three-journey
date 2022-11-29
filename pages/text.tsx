import { Suspense } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import TextMesh from "../components/TextMesh";

const Text3D: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Canvas>
        <OrbitControls makeDefault autoRotate />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="green" />
        <Suspense fallback={null}>
          <TextMesh />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Text3D;
