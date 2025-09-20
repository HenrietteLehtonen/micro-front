// Import the Front component from the front_and_sidebar mfe
// Import the useMediaContext hook from the mediastore mfe

import Front from "front_and_sidebar/Front";
import { useMediaContext } from "mediastore/contextHooks";

const Home = () => {
  const { mediaItems } = useMediaContext();
  console.log("mediaItems in Home:", mediaItems);

  return <div>{mediaItems && <Front mediaItems={mediaItems} />}</div>;
};

export default Home;
