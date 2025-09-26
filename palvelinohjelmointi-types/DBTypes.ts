type UserLevel = {
  level_id: number;
  level_name: "Admin" | "User" | "Guest";
};

type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  user_level_id: number;
  created_at: Date | string;
};

// type for userdata stored in mongodb
type MongoUser = Pick<User, "user_id" | "username">;

// Type for the metadata of media items
type MediaMetadata = Record<string, string | number>;

// Type for a media item
type MediaItem = {
  _id: string;
  title: string;
  description?: string;
  type: "video" | "live_stream";
  url: string;
  tags: string[];
  metadata: MediaMetadata;
  uploadedAt: Date;
  comments: Comment[];
  upvotes: MongoUser[];
  downvotes: MongoUser[];
  owner: MongoUser;
  screenshots: string[];
};

type Comment = {
  _id: string;
  text: string;
  author: MongoUser;
  replies: Comment[];
  upvotes: MongoUser[];
  downvotes: MongoUser[];
  createdAt: Date;
};

// Type for posting comment
type PostComment = Pick<Comment, "text" | "author">;

type UploadResult = {
  message: string;
  data?: {
    image: string;
  };
};

// type gymnastics to get rid of user_level_id from User type and replace it with level_name from UserLevel type
type UserWithLevel = Omit<User, "user_level_id"> &
  Pick<UserLevel, "level_name">;

type UserWithNoPassword = Omit<UserWithLevel, "password">;

type TokenContent = Pick<User, "user_id"> & Pick<UserLevel, "level_name">;

// for upload server
type FileInfo = {
  filename: string;
  user_id: number;
};

type ServerToClientEvents = {
  addMedia: (message: string) => void;
};

type ClientToServerEvents = {
  update: (message: string) => void;
};

type Credentials = Pick<User, "username" | "password">;

type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => Promise<void> | void;
  // register: username, email and password
  handleRegister: (payload: { username: string; email: string; password: string }) => Promise<void> | void;
  handleLogout: () => void;
  handleAutoLogin: () => Promise<void> | void;
};

type MediaContextType = {
  mediaItems: MediaItem[] | null;
  userMediaItems: MediaItem[] | null;
  singleMediaItem: MediaItem | null;
  setSingleMediaItemId: (id: string) => void;
  updateMediaItem: (
    mediaItem: MediaItem,
    inputs: Pick<MediaItem, "title" | "description"> & {
      tags: string;
    }
  ) => void;
  postMediaItem: (
    file: File,
    inputs: {
      title: string;
      description: string;
      tag: string;
      stream_url: string;
    },
    mediaType: "video" | "live_stream"
  ) => void;
  deleteMediaItem: (id: string) => void;
  refreshSingleMedia: () => void;
};

export type {
  UserLevel,
  User,
  MediaItem,
  Comment,
  UploadResult,
  UserWithLevel,
  UserWithNoPassword,
  TokenContent,
  FileInfo,
  ServerToClientEvents,
  ClientToServerEvents,
  Credentials,
  AuthContextType,
  MediaContextType,
  PostComment,
};
