// This is for testing purposes only
import SidebarThumbnail from "@/components/sidebar/SidebarThumbnail";
import mediaItems from "@/assets/test.json";
import { MediaItem } from "@sharedTypes/DBTypes";

const SidebarTest = () => {
  const testMediaItems = mediaItems as unknown as MediaItem[];

  return (
    <aside className="border-l bg-muted/40 p-4">
      <h3 className="mb-4 text-lg font-semibold">Playlist</h3>
      <div className="grid gap-4">
        {testMediaItems &&
          testMediaItems.map((mediaItem) => (
            <SidebarThumbnail key={mediaItem._id} mediaItem={mediaItem} />
          ))}
      </div>
    </aside>
  );
};

export default SidebarTest;
