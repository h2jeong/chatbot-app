import React, { useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const { comments, commentId, onSubmit } = props;
  const [Show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!Show);
  };

  const filtedList = comments.filter(
    comment => comment.responseTo === commentId
  );

  if (filtedList.length > 0) {
    return (
      <>
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={handleShow}
        >
          View <span style={{ color: "black" }}>{filtedList.length}</span> more
          comment(s)
        </p>
        {Show &&
          filtedList.map((comment, i) => (
            <div key={i} style={{ width: "80%", marginLeft: "40px" }}>
              <SingleComment comment={comment} onSubmit={onSubmit} />
              <ReplyComment {...props} commentId={comment._id} />
            </div>
          ))}
      </>
    );
  } else {
    return null;
  }
}

export default ReplyComment;
