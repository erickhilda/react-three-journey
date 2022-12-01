import { Mesh } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

function SphereMesh(props: JSX.IntrinsicElements["mesh"]) {
  const mesh = useRef<Mesh>(null!);

  const sphereTexture = useTexture({
    map: "/textures/floor_tiles/diff.jpg",
    displacementMap: "/textures/floor_tiles/disp.jpg",
    aoMap: "/textures/floor_tiles/ao.jpg",
    roughnessMap: "/textures/floor_tiles/rough.jpg",
    metalnessMap: "/textures/floor_tiles/arm.jpg",
    normalMap: "/textures/floor_tiles/nor_gl.jpg",
    specularColorMap: "/textures/floor_tiles/spec.jpg",
  });

  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.02;
  });

  return (
    <mesh {...props} ref={mesh} castShadow>
      <sphereGeometry args={[1, 128, 128]} />
      <meshPhysicalMaterial {...sphereTexture} displacementScale={0} />
    </mesh>
  );
}

export default SphereMesh;
