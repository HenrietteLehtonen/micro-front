import { MediaItem } from "@sharedTypes/DBTypes";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import DeleteMedia from "./DeleteMedia";
import ModifyMedia from "./ModifyMedia";
// import ThumbCarousel from front_and_sidebar mfe
import ThumbCarousel from "front_and_sidebar/ThumbCarousel";

const ProfileThumbnail = (props: {
  mediaItem: MediaItem;
  refreshMedia: () => void;
}) => {
  const { mediaItem, refreshMedia } = props;

  return (
    <Card className="w-1/3 p-4 border-0 shadow-none">
      <CardHeader className="p-0">
        <Link to={"/single/" + mediaItem._id}>
          <span className="sr-only">View</span>
          <ThumbCarousel
            images={mediaItem.screenshots}
            alt={mediaItem.title}
            className="object-cover rounded-lg aspect-video"
            crossOrigin="anonymous"
          />
        </Link>
      </CardHeader>
      <CardContent className="text-left p-2">
        <div className="flex flex-wrap">
          <section className="w-2/3">
            <div className="font-medium line-clamp-2">{mediaItem.title}</div>
            <div className="text-xs text-muted-foreground line-clamp-1">
              {mediaItem.owner.username}
              <div className="text-xs text-muted-foreground line-clamp-1">
                {new Date(mediaItem.uploadedAt).toLocaleString("fi-FI")}
              </div>
            </div>
          </section>
          <section className="w-1/3 flex justify-around">
            <DeleteMedia mediaItem={mediaItem} refreshMedia={refreshMedia} />
            <ModifyMedia mediaItem={mediaItem} refreshMedia={refreshMedia} />
          </section>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileThumbnail;
