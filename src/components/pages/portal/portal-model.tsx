import { Suspense, useLayoutEffect, useRef } from 'react';
import { AnimationClip, Color, Mesh, ShaderMaterial } from 'three';
import { Center, Sparkles, useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import vertexShader from '@/utils/portal/vertexShader';
import fragmentShader from '@/utils/portal/fragmentShader';

type GLTFResults = GLTF & {
  nodes: {
    [key: string]: Mesh;
  };
  animations: AnimationClip[];
};

function Scenery({ geometry }: { geometry: any }) {
  const bakedTexture = useTexture({ map: '/textures/portal/baked.jpg' });

  useLayoutEffect(() => {
    Object.values(bakedTexture).forEach((texture) => {
      texture.flipY = false;
    });
  }, [bakedTexture]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial {...bakedTexture} />
    </mesh>
  );
}

type PortalMat = {
  uTime: number;
} & ShaderMaterial;

function PortalPiece({
  geometry,
  position,
  rotation,
}: {
  geometry: any;
  position: any;
  rotation: any;
}) {
  const portalMaterial = useRef<PortalMat>(null!);

  useFrame((_, delta) => {
    portalMaterial.current.uTime += delta;
  });
  return (
    <mesh geometry={geometry} position={position} rotation={rotation}>
      <shaderMaterial
        ref={portalMaterial}
        attach="material"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColorStart: { value: new Color('#ffffff') },
          uColorEnd: { value: new Color('#000000') },
        }}
      />
    </mesh>
  );
}

function PortalModel() {
  const { nodes } = useGLTF('/textures/portal/model.glb') as GLTFResults;

  return (
    <Suspense fallback={null}>
      <Center
        matrixWorldAutoUpdate={undefined}
        getObjectsByProperty={undefined}
      >
        <Scenery geometry={nodes.baked.geometry} />

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <PortalPiece
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        />

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
          matrixWorldAutoUpdate={undefined}
          getObjectsByProperty={undefined}
        />
      </Center>
    </Suspense>
  );
}

useGLTF.preload('/textures/portal/model.glb');

export default PortalModel;
