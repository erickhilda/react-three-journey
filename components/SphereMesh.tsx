import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function SphereMesh(props: JSX.IntrinsicElements["mesh"]) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={"aqua"} metalness={0.8} roughness={0.4} />
    </mesh>
  );
}

export default SphereMesh;
