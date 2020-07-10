import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
import "./Comment.css";
import InputComment from "./InputComment";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comments(props) {
  const { comments, videoId, onUpdate } = props;
  const auth = useSelector(state => state.user.auth);
  const [Submitting, setSubmitting] = useState(false);

  const handleSubmit = dataToSubmit => {
    console.log("handleSubmit:", dataToSubmit);
    const { content, responseTo } = dataToSubmit;
    if (!content) {
      return message.warning("Plese Write a comment");
    }
    if (!auth.isAuth) {
      return message.warning("Comment after logging");
    }

    setSubmitting(true);
    let comment = {
      writer: auth.user._id,
      content: content,
      videoId: videoId,
      responseTo: responseTo
    };
    console.log(comment);
    // db에 전송하기 - setSubmitting(false);
    axios.post("/api/comment/addComment", comment).then(res => {
      if (res.data.success) {
        console.log(res.data);
        onUpdate(res.data.comment);
      } else {
        message.error("Failed to add comment");
      }
    });
    setSubmitting(false);
  };
  return (
    <>
      {/* commentList */}
      {comments.map(
        (comment, i) =>
          !comment.responseTo && (
            <div key={i}>
              <SingleComment
                comment={comment}
                onSubmit={handleSubmit}
                submitting={Submitting}
              />
              <ReplyComment
                comments={comments}
                commentId={comment._id}
                onSubmit={handleSubmit}
                submitting={Submitting}
              />
            </div>
          )
      )}
      <InputComment onSubmit={handleSubmit} submitting={Submitting} />
    </>
  );
}

export default Comments;
