import SidebarThumbnail from "./SidebarThumbnail";
import { MediaItem } from "@sharedTypes/DBTypes";

const Sidebar = (props: { mediaItems: MediaItem[] }) => {
  const { mediaItems = [] } = props;

  return (
    <aside className="border-l bg-muted/40 p-4">
      <h3 className="mb-4 text-lg font-semibold">Playlist</h3>
      <div className="grid gap-4">
        {mediaItems &&
          mediaItems.map((mediaItem) => (
            <SidebarThumbnail key={mediaItem._id} mediaItem={mediaItem} />
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;
