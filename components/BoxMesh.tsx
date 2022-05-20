import * as THREE from "three";
import React from "react";
import { useTexture, Box } from "@react-three/drei";
import { useControls } from "leva";

function BoxMesh(props: JSX.IntrinsicElements["mesh"]) {
  const textures = useTexture({
    map: "/textures/door/color.jpg",
    normalMap: "/textures/door/normal.jpg",
    roughnessMap: "/textures/door/roughness.jpg",
    aoMap: "/textures/door/ambientOcclusion.jpg",
    metalnessMap: "/textures/door/metalness.jpg",
  });
  return (
    <Box args={[1, 1, 1]} {...props}>
      <meshPhysicalMaterial {...textures} map-magFilter={THREE.NearestFilter} />
    </Box>
  );
}

export default BoxMesh;
