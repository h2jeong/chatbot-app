import React from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const { comments, commentId, onSubmit, submitting } = props;

  return (
    <>
      {comments.filter(comment => comment.responseTo === commentId).length >
        0 && (
        <p style={{ fontSize: "14px", margin: 0, color: "gray" }} onClick>
          View
          {comments.filter(comment => comment.responseTo === commentId).length}
          more comment(s)
        </p>
      )}
      {comments.map(
        (comment, i) =>
          comment.responseTo === commentId && (
            <div key={i} style={{ width: "80%", marginLeft: "40px" }}>
              <SingleComment
                comment={comment}
                onSubmit={onSubmit}
                submitting={submitting}
              />
              <ReplyComment {...props} commentId={comment._id} />
            </div>
          )
      )}
    </>
  );
}

export default ReplyComment;
