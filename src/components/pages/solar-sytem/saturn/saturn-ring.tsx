import { useTexture } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { DoubleSide, Mesh } from 'three';
import fragmentShader from './ring-shader/fragmentShader';
import vertexShader from './ring-shader/vertexShader';

function SaturnRing() {
  const ref = useRef<Mesh>(null!);

  // const [ringTexture] = useLoader(TextureLoader, [
  //   '/textures/saturn/saturn_ring_top.png',
  // ]);

  const ringTexture = useTexture('/textures/saturn/saturn_ring_top.png');

  const uniforms = useMemo(
    () => ({
      u_texture: { value: ringTexture },
      u_inner_rad: { value: 1.3 },
      u_outer_rad: { value: 2.5 },
    }),
    [ringTexture]
  );

  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      rotation-x={-Math.PI / 2}
      receiveShadow
      castShadow
    >
      <ringGeometry args={[1.3, 2.5, 64, 12]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        side={DoubleSide}
        transparent
      />
    </mesh>
  );
}

export default SaturnRing;
