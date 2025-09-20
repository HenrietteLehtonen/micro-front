import { LuLogOut, LuMail } from "react-icons/lu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MediaItem } from "@sharedTypes/DBTypes";
import ProfileThumbnail from "./ProfileThumbnail";
// import useMedia from mediastore mfe
import { useMedia } from "mediastore/apiHooks";
// import useUserContext from mediastore mfe
import { useUserContext } from "mediastore/contextHooks";

const UserInfo = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { user, handleLogout } = useUserContext();
  const { getMediaByUser } = useMedia();

  useEffect(() => {
    if (user) {
      getMediaByUser(user.user_id).then((data: MediaItem[]) => {
        setMediaItems(data);
      });
    }
  }, [user, getMediaByUser, refresh]);

  const refreshMedia = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      {user && (
        <>
          <div className="bg-muted rounded-t-lg p-6 flex items-center gap-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <Button onClick={handleLogout} className="rounded-full">
                  Logout &nbsp;
                  <LuLogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-background rounded-b-lg p-6 grid gap-6">
            <div className="grid gap-2">
              <h2 className="text-lg font-semibold">Contact</h2>
              <div className="grid gap-1 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <LuMail className="h-5 w-5" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <h2 className="text-lg font-semibold">Videos</h2>
              <div className="flex flex-wrap">
                {mediaItems.map((mediaItem) => (
                  <ProfileThumbnail
                    key={mediaItem._id}
                    mediaItem={mediaItem}
                    refreshMedia={refreshMedia}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserInfo;
