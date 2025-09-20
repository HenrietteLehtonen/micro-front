// FOR TESTING PURPOSES ONLY
import { useMediaContext, useUserContext } from "@/hooks/contextHooks";

const Test = () => {
  const { mediaItems } = useMediaContext();
  const { user } = useUserContext();
  console.log(mediaItems);
  console.log(user);
  return <div>Test</div>;
};

export default Test;
