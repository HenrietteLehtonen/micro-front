import { MediaItem } from '@sharedTypes/DBTypes';
import VideoButtons from './VideoButtons';
import { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import { decode } from 'html-entities';

const VideoPlayer = (props: { mediaItem: MediaItem }) => {
  const { mediaItem } = props;
  const videoRef = useRef<ReactPlayer>(null);

  // Reload the video when the mediaItem changes (different behavior than with <img>)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(0);
    }
  }, [mediaItem.url]);

  console.log(decode(mediaItem.url));
  return (
    <>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <ReactPlayer
          controls
          playing
          ref={videoRef}
          url={
            mediaItem.type === 'video'
              ? import.meta.env.VITE_FILE_SERVER + mediaItem.url
              : import.meta.env.VITE_STREAM_SERVER + mediaItem.url
          }
          onError={(e) => console.error(e)}
          config={{ file: { attributes: { crossOrigin: 'anonymous' } } }}
        />
      </div>

      <div className="mt-6 space-x-2">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{mediaItem.title}</h3>
          <div className="flex justify-between">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <h4 className="font-bold">{mediaItem.owner.username}</h4>
              <div className="h-1 w-1 rounded-full bg-muted-foreground" />
              <div>{new Date(mediaItem.uploadedAt).toLocaleString('fi')}</div>
            </div>
            <div className="flex items-center space-x-4">
              <VideoButtons mediaItem={mediaItem} />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-muted-foreground">{mediaItem.description}</p>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
