// this is basically the same as Home in the example app
import { MediaItem } from "@sharedTypes/DBTypes";
import FrontThumbnail from "./FrontThumbnail";

const Front = (props: { mediaItems: MediaItem[] }) => {
  const { mediaItems = [] } = props;

  return (
    <div className="flex flex-wrap">
      {mediaItems &&
        mediaItems.map((mediaItem) => (
          <FrontThumbnail key={mediaItem._id} mediaItem={mediaItem} />
        ))}
    </div>
  );
};

export default Front;
