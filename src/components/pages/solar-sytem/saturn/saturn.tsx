import Planet from '../planet';
import Ring from './saturn-ring';

function Saturn() {
  return (
    <>
      <Planet mapPath="/textures/saturn/saturn.jpg" />
      <Ring />
    </>
  );
}

export default Saturn;
