import React, { useState } from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import InputComment from "./InputComment";
import LikeUnlikes from "./LikeUnlikes";

function SingleComment(props) {
  const { comment, onSubmit } = props;
  const [OpenInput, setOpenInput] = useState(false);
  const handleOpenInput = () => {
    setOpenInput(!OpenInput);
  };

  const actions = [
    <LikeUnlikes commentId={comment._id} />,
    <span key="comment-basic-reply-to" onClick={handleOpenInput}>
      Reply to
    </span>
  ];

  return (
    <>
      <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image} alt={comment.writer.name} />}
        content={<p>{comment.content}</p>}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
      {OpenInput && (
        <InputComment
          responseTo={comment._id}
          onSubmit={dataToSubmit => {
            onSubmit(dataToSubmit);
            handleOpenInput();
          }}
        />
      )}
    </>
  );
}

export default SingleComment;
