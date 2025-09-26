/* eslint-disable react-hooks/exhaustive-deps */
import fetchData from "@/lib/fetchData";
import { MediaItem } from "@sharedTypes/DBTypes";
import {
  LoginResponse,
  MediaResponse,
  UploadResponse,
  UserResponse,
} from "@sharedTypes/MessageTypes";
import { useCallback } from "react";

const useMedia = (
  refreshMedia: boolean,
  refreshSinglemedia: boolean,
  refreshUserMedia: boolean
) => {
  const getMedia = useCallback(async () => {
    const media = await fetchData<MediaItem[]>(
      import.meta.env.VITE_MEDIA_API + "/media"
    );

    console.log("Meedia", media);
    return media;
  }, [refreshMedia]);

  const postMedia = (
    file: UploadResponse,
    inputs: Pick<
      MediaItem,
      "title" | "description" | "type" | "tags" | "screenshots"
    >,
    token: string
  ) => {
    const media: Omit<
      MediaItem,
      "_id" | "owner" | "uploadedAt" | "comments" | "upvotes" | "downvotes"
    > = {
      title: inputs.title,
      description: inputs.description,
      url: file.data.filename,
      type: inputs.type,
      tags: inputs.tags,
      metadata: {
        filename: file.data.filename,
        mimetype: file.data.media_type,
        filesize: file.data.filesize,
      },
      screenshots: inputs.screenshots,
    };

    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(media),
    };
    return fetchData<MediaResponse>(
      import.meta.env.VITE_MEDIA_API + "/media",
      options
    );
  };

  const getSingleMedia = useCallback(
    async (id: string) => {
      return await fetchData<MediaItem>(
        import.meta.env.VITE_MEDIA_API + "/media/" + id
      );
    },
    [refreshSinglemedia]
  );

  const getMediaByUser = useCallback(
    async (id: number) => {
      return await fetchData<MediaItem[]>(
        import.meta.env.VITE_MEDIA_API + "/media/user/" + id
      );
    },
    [refreshUserMedia]
  );

  const deleteMedia = async (id: string, token: string) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return await fetchData<MediaResponse>(
      import.meta.env.VITE_MEDIA_API + "/media/" + id,
      options
    );
  };

  const putMedia = async (
    id: string,
    inputs: Pick<MediaItem, "title" | "description" | "tags">,
    token: string
  ) => {
    const options = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData<MediaResponse>(
      import.meta.env.VITE_MEDIA_API + "/media/" + id,
      options
    );
  };

  return {
    getMedia,
    postMedia,
    getSingleMedia,
    getMediaByUser,
    putMedia,
    deleteMedia,
  };
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + "/users/token/",
      options
    );
  };

  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + "/users",
      options
    );
  };

  const getUsernameAvailable = async (username: string) => {
    return await fetchData<{ available: boolean }>(
      import.meta.env.VITE_AUTH_API + "/users/username/" + username
    );
  };

  const getEmailAvailable = async (email: string) => {
    return await fetchData<{ available: boolean }>(
      import.meta.env.VITE_AUTH_API + "/users/email/" + email
    );
  };

  return { getUserByToken, postUser, getUsernameAvailable, getEmailAvailable };
};

const useAuthentication = () => {
  const postLogin = async (creds: { username: string; password: string }) => {
    return await fetchData<LoginResponse>(
      import.meta.env.VITE_AUTH_API + "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(creds),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return { postLogin };
};

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("file", file);
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };
    return await fetchData<UploadResponse>(
      import.meta.env.VITE_UPLOAD_SERVER + "/upload",
      options
    );
  };

  return { postFile };
};

const useComment = () => {
  const postComment = async (text: string, media_id: string, token: string) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ text, media_id }),
    };
    return await fetchData<MediaResponse>(
      import.meta.env.VITE_MEDIA_API + "/comments",
      options
    );
  };

  const postReply = async (text: string, parent_id: string, token: string) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ text, parent_id }),
    };
    return await fetchData<MediaResponse>(
      import.meta.env.VITE_MEDIA_API + "/comments/replies",
      options
    );
  };

  return { postComment, postReply };
};

export { useMedia, useUser, useAuthentication, useFile, useComment };
