import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
import "./Comment.css";
import InputComment from "./InputComment";

function Comments(props) {
  const auth = useSelector(state => state.user.auth);
  const [Submitting, setSubmitting] = useState(false);

  const handleSubmit = content => {
    console.log("handleSubmit:", content);
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
      videoId: props.videoId
      // commentId: props.commentId
    };
    console.log(comment);
    // db에 전송하기 - setSubmitting(false);
    axios.post("/api/comment/addComment", comment).then(res => {
      if (res.data.success) {
        console.log(res.data);
        props.onUpdate(res.data.comment);
      } else {
        message.error("Failed to add comment");
      }
    });
    setSubmitting(false);
  };
  return (
    <>
      {/* commentList */}
      {props.comments.map((comment, i) => (
        <p key={i}>{comment.content}</p>
      ))}
      <InputComment onSubmit={handleSubmit} submitting={Submitting} />
    </>
  );
}

export default Comments;
