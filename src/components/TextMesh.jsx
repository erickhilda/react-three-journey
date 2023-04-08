import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { useLoader, extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

function TextMesh(props) {
  extend({ TextGeometry });

  const mesh = useRef(null);

  const [matcap] = useLoader(TextureLoader, ['/textures/matcaps/1.png']);

  const { color, text } = { color: 'magenta', text: 'Hello' };
  const font = useLoader(FontLoader, '/fonts/helvetiker_regular.typeface.json');
  const config = useMemo(() => ({ font, size: 2, height: 1 }), [font]);

  useLayoutEffect(() => void mesh.current?.geometry?.center(), [text]);

  const meshDonut = useRef(null);

  return (
    <>
      <mesh {...props} ref={mesh}>
        <textGeometry args={[text, config]} />
        <meshMatcapMaterial matcap={matcap} color={color} />
      </mesh>
      {[...Array(50)].map((_, i) => {
        const x = (Math.random() - 0.5) * 15;
        const y = (Math.random() - 0.5) * 15;
        const z = (Math.random() - 0.5) * 15;
        return (
          <mesh
            key={i}
            position={[x, y, z]}
            ref={meshDonut}
            rotation={[
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
            ]}
          >
            <torusBufferGeometry args={[0.3, 0.2, 20, 45]} />
            <meshMatcapMaterial matcap={matcap} color={color} />
          </mesh>
        );
      })}
    </>
  );
}

export default TextMesh;
