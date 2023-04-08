import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import { DoubleSide, Mesh } from 'three';

function OctagonMesh(props: JSX.IntrinsicElements['mesh']) {
  const { radius, detail, colorMesh } = useControls({
    radius: 1,
    detail: 1,
    colorMesh: 'blue',
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
    <mesh {...props} ref={octaRef}>
      <octahedronGeometry args={[radius, detail]} />
      <meshPhongMaterial
        color={colorMesh}
        flatShading
        emissive={0x072534}
        side={DoubleSide}
        {...materialsProps}
      />
    </mesh>
  );
}

export default OctagonMesh;
