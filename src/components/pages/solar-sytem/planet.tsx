import { useTexture } from '@react-three/drei';

function Planet({ mapPath }: { mapPath: string }) {
  const saturnTexture = useTexture({
    map: mapPath,
  });

  return (
    <mesh receiveShadow castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial {...saturnTexture} transparent />
    </mesh>
  );
}

export default Planet;
