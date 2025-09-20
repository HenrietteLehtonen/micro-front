import { Button } from "@/components/ui/button";
import { useForm } from "@/hooks/formHooks";
import { Textarea } from "../ui/textarea";
// import useComment from mediastore mfe
// import useMediaContext from mediastore mfe
import { useComment } from "mediastore/apiHooks";
import { useMediaContext } from "mediastore/contextHooks";

const CommentForm = (props: { mediaItemId?: string; replyToId?: string }) => {
  const { postComment, postReply } = useComment();
  const { refreshSingleMedia } = useMediaContext();
  const { mediaItemId, replyToId } = props;

  const initValues = { text: "" };

  const doComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (mediaItemId) {
      await postComment(inputs.text, mediaItemId, token);
    } else if (replyToId) {
      await postReply(inputs.text, replyToId, token);
    }
    inputs.text = "";
    refreshSingleMedia();
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(
    doComment,
    initValues
  );

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 p-4">
      <Textarea
        name="text"
        value={inputs.text}
        onChange={handleInputChange}
        placeholder="Add your comment..."
        className="w-full rounded-md border border-muted p-2 text-sm"
      />
      <div className="w-full flex justify-end pt-3">
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
};

export default CommentForm;
