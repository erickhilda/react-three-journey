import { Mesh } from 'three';
import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

function BoxMesh(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<Mesh>(null!);
  const [colorMap, normalMap, roughnessMap, aoMap, metalnessMap] = useLoader(
    TextureLoader,
    [
      '/textures/door/color.jpg',
      '/textures/door/normal.jpg',
      '/textures/door/roughness.jpg',
      '/textures/door/ambientOcclusion.jpg',
      '/textures/door/metalness.jpg',
    ]
  );
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        metalnessMap={metalnessMap}
      />
    </mesh>
  );
}

export default BoxMesh;
