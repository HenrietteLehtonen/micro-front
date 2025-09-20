// This is for testing purposes only
import Front from '@/components/front/Front';
import mediaItems from '@/assets/test.json';
import { MediaItem } from '@sharedTypes/DBTypes';

const Home = () => {
  console.log('mediaItems', mediaItems);

  return (
    <div>
      {mediaItems && (
        <Front mediaItems={mediaItems as unknown as MediaItem[]} />
      )}
    </div>
  );
};

export default Home;
