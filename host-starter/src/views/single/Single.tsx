import CommentArea from "@/components/comments/CommentArea";
import { MediaContextType } from "@sharedTypes/DBTypes";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import Sidebar from front_and_sidebar mfe
import Sidebar from "front_and_sidebar/Sidebar";
// Import useMediaContext from mediastore mfe
import { useMediaContext } from "mediastore/contextHooks";
import VideoPlayer from "video_player/VideoPlayer";

const Single = () => {
  const { id } = useParams();
  const { singleMediaItem, setSingleMediaItemId, mediaItems } =
    useMediaContext() as MediaContextType;

  useEffect(() => {
    if (id) {
      setSingleMediaItemId(id);
    }
  }, [id, setSingleMediaItemId]);

  return (
    <>
      <div className="flex min-h-screen w-full">
        <main className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 pl-4 pr-4">
          {singleMediaItem === null ? (
            <div>Loading...</div>
          ) : (
            <>
              <VideoPlayer mediaItem={singleMediaItem} />
              <CommentArea mediaItem={singleMediaItem} />
            </>
          )}
        </main>
        {
          // this a bit different than the example
        }
        <Sidebar mediaItems={mediaItems} />
      </div>
    </>
  );
};

export default Single;
