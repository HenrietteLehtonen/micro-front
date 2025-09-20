import { MediaItem } from '@sharedTypes/DBTypes';
import { Button } from '../ui/button';
import { LuThumbsDown, LuThumbsUp } from 'react-icons/lu';

const VideoButtons = (props: { mediaItem: MediaItem }) => {
  const { mediaItem } = props;
  return (
    <>
      <Button variant="ghost" size="icon">
        <LuThumbsUp className="w-4 h-4" />
        <span className="sr-only">Upvote</span>
        <span className="ml-1 text-sm">{mediaItem.upvotes.length}</span>
      </Button>
      <Button variant="ghost" size="icon">
        <LuThumbsDown className="w-4 h-4" />
        <span className="sr-only">Downvote</span>
        <span className="ml-1 text-sm">{mediaItem.downvotes.length}</span>
      </Button>
      <Button>Subscribe</Button>
    </>
  );
};

export default VideoButtons;
