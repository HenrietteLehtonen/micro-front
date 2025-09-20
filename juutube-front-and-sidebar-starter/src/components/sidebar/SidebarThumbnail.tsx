import { MediaItem } from "@sharedTypes/DBTypes";
import { Link } from "react-router-dom";
import ThumbCarousel from "../thumb-carousel/ThumbCarousel";

const SidebarThumbnail = (props: { mediaItem: MediaItem }) => {
  const { mediaItem } = props;

  return (
    <div className="relative flex items-start gap-4">
      <Link to={"/single/" + mediaItem._id}>
        <span className="sr-only">View</span>
        <ThumbCarousel
          images={mediaItem.screenshots}
          width={168}
          height={94}
          className="object-cover rounded-lg aspect-video"
        />
      </Link>
      <div className="text-sm">
        <div className="font-medium line-clamp-2">{mediaItem.title}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {mediaItem.owner.username}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {new Date(mediaItem.uploadedAt).toLocaleString("fi-FI")}
        </div>
      </div>
    </div>
  );
};

export default SidebarThumbnail;
