import React, { useEffect, useState, createElement } from "react";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled
} from "@ant-design/icons";
import { Tooltip, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

function LikeDislikes(props) {
  const { videoId, commentId } = props;
  // console.log(props);
  const auth = useSelector(state => state.user.auth);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  useEffect(() => {
    const countVariable = videoId ? { videoId } : { commentId };
    // 수량 체크
    axios.post("/api/like/getLikes", countVariable).then(res => {
      if (res.data.success) {
        setLikes(res.data.likes.length);
        if (auth.isAuth) {
          if (res.data.likes.some(like => like.userFrom === auth.user._id)) {
            setAction("liked");
          }
        }
      } else {
        message.error("Failed to get likes");
      }
    });
    axios.post("/api/like/getUnlikes", countVariable).then(res => {
      if (res.data.success) {
        setDislikes(res.data.unlikes.length);
        if (auth.isAuth) {
          if (
            res.data.unlikes.some(unlike => unlike.userFrom === auth.user._id)
          ) {
            setAction("disliked");
          }
        }
      } else {
        message.error("Failed to get dislikes");
      }
    });
    // 내가 체크했는지
  }, []);

  const variable = auth.isAuth
    ? videoId
      ? { userFrom: auth.user._id, videoId }
      : { userFrom: auth.user._id, commentId }
    : null;

  const like = () => {
    //console.log(variable);
    if (action !== "liked") {
      axios.post("/api/like/addLike", variable).then(res => {
        if (res.data.success) {
          setLikes(likes + 1);
          setAction("liked");
          if (action === "disliked") {
            setAction("liked");
            setDislikes(dislikes - 1);
          }
        } else {
          message.error("Failed to add like");
        }
      });
    } else {
      axios.post("/api/like/reduceLike", variable).then(res => {
        if (res.data.success) {
          setLikes(likes - 1);
          setAction("null");
        } else {
          message.error("Failed to reduce like");
        }
      });
    }
  };

  const dislike = () => {
    if (action !== "disliked") {
      axios.post("/api/like/addUnlike", variable).then(res => {
        if (res.data.success) {
          setDislikes(dislikes + 1);
          setAction("disliked");
          if (action === "liked") {
            setAction("disliked");
            setLikes(likes - 1);
          }
        } else {
          message.error("Failed to add dislike");
        }
      });
    } else {
      axios.post("/api/like/reduceUnlike", variable).then(res => {
        if (res.data.success) {
          setDislikes(dislikes - 1);
          setAction("null");
        } else {
          message.error("Failed to reduse dislike");
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {createElement(action === "liked" ? LikeFilled : LikeOutlined, {
            onClick: like
          })}
        </Tooltip>
        <span className="comment-action">{likes}</span>
      </span>
      <span key="comment-basic-dislike" style={{ margin: "0 0.5rem" }}>
        <Tooltip title="Dislike">
          {React.createElement(
            action === "disliked" ? DislikeFilled : DislikeOutlined,
            {
              onClick: dislike
            }
          )}
        </Tooltip>
        <span className="comment-action">{dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislikes;
