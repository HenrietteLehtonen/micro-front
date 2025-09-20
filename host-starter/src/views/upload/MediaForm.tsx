import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/hooks/formHooks";
import { UploadResponse } from "@sharedTypes/MessageTypes";
// import useFile and useMedia from mediastore mfe
import { useFile, useMedia } from "mediastore/apiHooks";

const MediaForm = () => {
  const [mediaType, setMediaType] = useState<"video" | "live_stream">("video");
  const [file, setFile] = useState<File | null>(null);

  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const navigate = useNavigate();

  const initValues = {
    title: "",
    description: "",
    tag: "",
    stream_url: "",
  };

  const doUpload = async () => {
    try {
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
      // TODO: redirect to Profile
      navigate("/profile");
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(
    doUpload,
    initValues
  );

  return (
    <CardContent>
      <form onSubmit={handleSubmit}>
        <div className="pb-4">
          <h3 className="text-lg font-bold mb-2">Type</h3>
          <div className="flex items-center space-x-4">
            <div className="flex">
              <Input
                type="radio"
                id="video"
                name="type"
                value="video"
                defaultChecked={mediaType === "video"}
                className="form-radio h-5 w-5 text-gray-600 mr-1"
                onClick={() => setMediaType("video")}
              />
              <Label htmlFor="video" className="text-sm">
                Video
              </Label>
            </div>
            <div className="flex">
              <Input
                type="radio"
                id="live"
                name="type"
                value="live"
                defaultChecked={mediaType === "live_stream"}
                className="form-radio h-5 w-5 text-gray-600 mr-1"
                onClick={() => setMediaType("live_stream")}
              />
              <Label htmlFor="live" className="text-sm">
                Live Stream
              </Label>
            </div>
          </div>
        </div>
        <div className="pb-4">
          <Label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Title for your video"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
          />
        </div>
        <div className="pb-4">
          <Label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </Label>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Describe your video so others can find it"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
          />
        </div>
        <div className="pb-4">
          <Label
            htmlFor="tag"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Tag
          </Label>
          <Input
            type="text"
            name="tag"
            id="tag"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Separate tags with commas"
            onChange={handleInputChange}
          />
        </div>
        {mediaType === "video" ? (
          <div className="pb-4">
            <Label
              htmlFor="file"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              File
            </Label>
            <Input
              className="block w-full text-sm text-gray-900 border-2 border-gray-300 rounded-md shadow-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 px-2 py-2"
              id="file_input"
              type="file"
              name="file"
              accept="video/*"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="pb-4">
            <Label
              htmlFor="stream_url"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Stream URL
            </Label>
            <Input
              type="text"
              name="stream_url"
              id="stream_url"
              placeholder="Your stream URL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className="pt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </CardContent>
  );
};

export default MediaForm;
