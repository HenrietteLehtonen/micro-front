import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@/hooks/formHooks";
import { MediaItem } from "@sharedTypes/DBTypes";
import { useState } from "react";
import { LuPen } from "react-icons/lu";
// import useMedia from mediastore mfe
import { useMedia } from "mediastore/apiHooks";

const ModifyMedia = (props: {
  mediaItem: MediaItem;
  refreshMedia: () => void;
}) => {
  const { mediaItem, refreshMedia } = props;
  const { putMedia } = useMedia();
  const [open, setOpen] = useState(false);

  const initValues: Pick<MediaItem, "title" | "description"> & {
    tags: string;
  } = {
    title: mediaItem.title,
    description: mediaItem.description,
    tags: mediaItem.tags.join(", "),
  };

  const doModify = async () => {
    console.log(inputs);
    try {
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
      setOpen(false);
      refreshMedia();
    } catch (error) {
      console.error("doModify failed", error);
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(
    doModify,
    initValues
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <LuPen className="h-5 w-5" />
        <span className="sr-only">Delete</span>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogDescription>
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">
                    Modify your video details.
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4 px-6 py-8">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      value={inputs.title}
                      placeholder="Title for your video"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      type="text"
                      name="description"
                      id="description"
                      value={inputs.description}
                      placeholder="Description for your video"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      type="text"
                      name="tags"
                      id="tags"
                      value={inputs.tags}
                      placeholder="Tags for your video"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost">Save</Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyMedia;
