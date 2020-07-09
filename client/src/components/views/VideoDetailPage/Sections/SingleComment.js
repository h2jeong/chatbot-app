import React from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import LikeDislikes from "./LikeDislikes";

function SingleComment(props) {
  const actions = [
    <LikeDislikes />,
    <span key="comment-basic-reply-to">Reply to</span>
  ];

  return (
    <Comment
      actions={actions}
      author={<a>{props.comment.writer.name}</a>}
      avatar={
        <Avatar
          src={props.comment.writer.image}
          alt={props.comment.writer.name}
        />
      }
      content={<p>{props.comment.content}</p>}
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

export default SingleComment;
