'use client';

import { Physics } from '@react-three/rapier';
import Lights from './lights';
import { Level } from './level';
import Player from './player';
import Effects from './effects';
import useGame from './hooks/useGame';

function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <Physics>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>

      {/* <Effects /> */}
    </>
  );
}

export default Experience;
