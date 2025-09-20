import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LuReply, LuThumbsDown, LuThumbsUp } from 'react-icons/lu';
import { Comment as CommentType } from '@sharedTypes/DBTypes';
import CommentForm from './CommentForm';
import { useState } from 'react';

const Comment = (props: { reply: number; comment: CommentType }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { reply, comment } = props;

  console.log(reply, comment);
  return (
    <div
      className={`flex items-start space-x-4 bg-slate-100 p-4 ${
        reply == 1 && 'ml-8 bg-slate-200'
      } ${reply == 2 && 'ml-16 bg-slate-300'}`}
    >
      <Avatar className="w-8 h-8 border">
        <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
      <div className="space-y-2 flex-1">
        <div className="font-medium flex items-center justify-between">
          <span>{comment.author.username}</span>
        </div>
        <p className="text-muted-foreground">{comment.text}</p>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Button variant="ghost" size="icon">
            <LuThumbsUp className="w-4 h-4" />
            <span className="sr-only">Upvote</span>
            <span className="ml-1 text-sm">{comment.upvotes.length}</span>
          </Button>
          <Button variant="ghost" size="icon">
            <LuThumbsDown className="w-4 h-4" />
            <span className="sr-only">Downvote</span>
            <span className="ml-1 text-sm">{comment.downvotes.length}</span>
          </Button>
          {reply < 2 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowReplyForm(!showReplyForm);
              }}
            >
              <LuReply className="w-4 h-4" />
              <span className="sr-only">Reply</span>
            </Button>
          )}
        </div>
        <div>
          {reply < 2 && showReplyForm && (
            <CommentForm replyToId={comment._id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
