import Comment from './Comment';
import { MediaItem } from '@sharedTypes/DBTypes';
import CommentForm from './CommentForm';
import React from 'react';

const CommentArea = (props: { mediaItem: MediaItem }) => {
  const { mediaItem } = props;
  return (
    <>
      <div className="mt-4">
        <h4 className="text-lg font-medium mb-2">Comments</h4>
        <CommentForm mediaItemId={mediaItem._id} />
      </div>
      <div className="mt-6 space-y-4">
        {mediaItem.comments.map((comment) => {
          return (
            <React.Fragment key={comment._id}>
              {comment.replies.length > 0 ? (
                <>
                  <Comment comment={comment} reply={0} />
                  {comment.replies.map((reply) => (
                    <React.Fragment key={reply._id}>
                      <Comment comment={reply} reply={1} />
                      {reply.replies.map((replyOfReply) => (
                        <Comment
                          key={replyOfReply._id}
                          comment={replyOfReply}
                          reply={2}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <Comment comment={comment} reply={0} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default CommentArea;
