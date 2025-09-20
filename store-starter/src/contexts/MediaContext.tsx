import { useFile, useMedia } from "@/hooks/apiHooks";
// Break circular import: don't import useUserContext (which imports MediaContext)
// Instead, read UserContext directly here.
import { UserContext } from "@/contexts/UserContext";
import { MediaContextType, MediaItem } from "@sharedTypes/DBTypes";
import { UploadResponse } from "@sharedTypes/MessageTypes";
import { createContext, useContext, useEffect, useState } from "react";

const MediaContext = createContext<MediaContextType | null>(null);

const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[] | null>(null);
  const [singleMediaItem, setSingleMediaItem] = useState<MediaItem | null>(
    null
  );
  const [singleMediaItemId, setSingleMediaItemId] = useState<string | null>(
    null
  );
  const [userMediaItems, setUserMediaItems] = useState<MediaItem[] | null>(
    null
  );
  const [refreshMediaItems, setRefreshMediaItems] = useState<boolean>(false);
  const [refreshSingleMediaItem, setRefreshSingleMediaItem] =
    useState<boolean>(false);
  const [refreshUserMediaItems, setRefreshUserMediaItems] =
    useState<boolean>(false);

  const {
    getMedia,
    getSingleMedia,
    getMediaByUser,
    putMedia,
    postMedia,
    deleteMedia,
  } = useMedia(
    refreshMediaItems,
    refreshSingleMediaItem,
    refreshUserMediaItems
  );

  const { postFile } = useFile();

  // Access user from UserContext without going through hooks that import this file
  // purkkapaikka
  const userCtx = useContext(UserContext);
  const user = userCtx?.user ?? null;

  // get all media items ****************************************************
  useEffect(() => {
    const getAllMediaItems = async () => {
      try {
        const media = await getMedia();
        if (!media) {
          return;
        }
        setMediaItems(media);
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    getAllMediaItems();
  }, [refreshMediaItems, getMedia]);

  // ***********************************************************************

  // get single media item *************************************************
  useEffect(() => {
    if (!singleMediaItemId) {
      return;
    }

    const getSingleMediaItem = async (id: string) => {
      try {
        const media = await getSingleMedia(id);
        if (!media) {
          return;
        }

        console.log("updateSingleMediaItem", media);
        setSingleMediaItem(media);
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    getSingleMediaItem(singleMediaItemId);
  }, [singleMediaItemId, getSingleMedia]);

  // ****************************************************************

  // get user's media items ******************************************

  useEffect(() => {
    if (!user) {
      return;
    }
    const getUserMediaItems = async (id: number) => {
      try {
        const media = await getMediaByUser(id);
        if (!media) {
          return;
        }
        setUserMediaItems(media);
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    getUserMediaItems(user.user_id);
  }, [user, getMediaByUser]);
  // ****************************************************************

  // update media item ************************************************
  const updateMediaItem = async (
    mediaItem: MediaItem,
    inputs: Pick<MediaItem, "title" | "description"> & {
      tags: string;
    }
  ): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const mediaInput = {
      title: inputs.title,
      description: inputs.description,
      tags: inputs.tags.split(",").map((tag) => tag.trim()),
    };
    await putMedia(mediaItem._id, mediaInput, token);
    setRefreshMediaItems(!refreshMediaItems);
    setRefreshSingleMediaItem(!refreshSingleMediaItem);
    setRefreshUserMediaItems(!refreshUserMediaItems);
  };
  // ****************************************************************

  // post media item **************************************************
  const postMediaItem = async (
    file: File,
    inputs: {
      title: string;
      description: string;
      tag: string;
      stream_url: string;
    },
    mediaType: "video" | "live_stream"
  ): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token || (!file && !inputs.stream_url)) {
      return;
    }

    // if mediaType is video, post the file else post the stream_url
    let fileResult: UploadResponse = {
      message: "",
      data: {
        filename: inputs.stream_url,
        media_type: "application/dash+xml",
        filesize: 0,
      },
    };
    if (mediaType === "video" && file) {
      fileResult = await postFile(file, token);
    }

    console.log(fileResult);

    if (!fileResult.data) {
      alert(fileResult.message);
      return;
    }

    // mediainputs with tags as an array
    const mediaInputs = {
      title: inputs.title,
      description: inputs.description,
      type: mediaType,
      tags: inputs.tag.split(",").map((tag) => tag.trim()),
      screenshots: fileResult.data.screenshots || [],
    };

    const mediaResult = await postMedia(fileResult, mediaInputs, token);
    alert(mediaResult.message);
    setRefreshMediaItems(!refreshMediaItems);
    setRefreshSingleMediaItem(!refreshSingleMediaItem);
    setRefreshUserMediaItems(!refreshUserMediaItems);
  };
  // ****************************************************************

  // delete media item ************************************************
  const deleteMediaItem = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    await deleteMedia(id, token);
    setRefreshMediaItems(!refreshMediaItems);
    setRefreshSingleMediaItem(!refreshSingleMediaItem);
    setRefreshUserMediaItems(!refreshUserMediaItems);
  };
  // ****************************************************************

  // refresh single media item after commenting etc. *************************

  const refreshSingleMedia = () => {
    setRefreshSingleMediaItem(!refreshSingleMediaItem);
  };

  // *******************************************

  return (
    <MediaContext.Provider
      value={{
        mediaItems,
        userMediaItems,
        singleMediaItem,
        setSingleMediaItemId,
        updateMediaItem,
        postMediaItem,
        deleteMediaItem,
        refreshSingleMedia,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaProvider };
