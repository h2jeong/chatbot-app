import React from "react";
import { Comment, Avatar, Tooltip } from "antd";
import moment from "moment";

function ChatCard(props) {
  // createdAt: "2020-07-02T15:32:21.285Z"
  // message: "dfd"
  // sender: {role: 0, _id: "5efab8f0fefd085edf6802b5", email: "bbb@naver.com", password: "$2b$10$PjgMiLMAQWDh/QT9cj7c1.rVAG4Rge3bgKJknDbqrzwVmuAlnHvNa", name: "bbb", …}
  // type: "Image"
  // updatedAt: "2020-07-02T15:32:21.285Z"
  // __v: 0
  // _id: "5efdfe059485314188977e1d"

  return (
    <div style={{ width: "100%" }}>
      <Comment
        author={props.sender.name}
        avatar={<Avatar src={props.sender.image} alt={props.sender.name} />}
        content={<p>{props.message}</p>}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
}

export default ChatCard;
