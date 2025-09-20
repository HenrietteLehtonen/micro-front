import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { MediaItem } from "@sharedTypes/DBTypes";
import { LuTrash } from "react-icons/lu";
// TODO: import useMedia from mediastore mfe
import { useMedia } from "mediastore/apiHooks";

const DeleteMedia = (props: {
  mediaItem: MediaItem;
  refreshMedia: () => void;
}) => {
  const { mediaItem, refreshMedia } = props;

  const { deleteMedia } = useMedia();

  const deleteHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const result = await deleteMedia(mediaItem._id, token);
      alert(result.message);
      refreshMedia();
    } catch (e) {
      console.error("delete failed", (e as Error).message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <LuTrash className="h-5 w-5" />
        <span className="sr-only">Delete</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            video from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={deleteHandler}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMedia;
