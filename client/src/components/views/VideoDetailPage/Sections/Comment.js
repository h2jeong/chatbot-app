import React, { useState, useEffect } from "react";
import "./Comment.css";
import InputComment from "./InputComment";
import SingleComment from "./SingleComment";
import axios from "axios";
import { message } from "antd";
import { useSelector } from "react-redux";

function CommentComponent(props) {
  const auth = useSelector(state => state.user.auth);

  const [Comments, setComments] = useState([]);
  const [Submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .post("/api/comment/getComments", { videoId: props.videoId })
      .then(res => {
        if (res.data.success) {
          console.log(res.data);
          setComments(res.data.comments);
        } else {
          message.error("Failed to get Comment List");
        }
      });
  }, []);

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
        setComments(Comments.concat(res.data.comment));
      } else {
        message.error("Failed to add comment");
      }
    });
    setSubmitting(false);
  };

  return (
    <>
      {/* commentList */}
      {Comments.length > 0 &&
        Comments.map((comment, i) => (
          <SingleComment key={i} comment={comment} />
        ))}
      <InputComment onSubmit={handleSubmit} submitting={Submitting} />
    </>
  );
}

export default CommentComponent;
