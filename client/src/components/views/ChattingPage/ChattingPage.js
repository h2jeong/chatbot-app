import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { MessageOutlined, EnterOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import { getChats } from "../../../_action/chat_action";
import ChatCard from "./Sections/ChatCard";

const server = "http://localhost:5000";
const socket = io.connect(server);

function ChattingPage() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.user.auth);
  const chats = useSelector(state => state.chat.chats);

  const [ChatMessage, setChatMessage] = useState("");

  useEffect(() => {
    // getChats
    dispatch(getChats());

    socket.on("Output Chat Message", messagesFromBackEnd => {
      console.log(messagesFromBackEnd);
    });
  }, []);

  const onInputChange = e => {
    setChatMessage(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const variable = {
      chatMessage: ChatMessage,
      userId: auth.user._id,
      userName: auth.user.name,
      userImage: auth.user.image,
      nowTime: moment(),
      type: "Text"
    };

    // console.log(variable);
    // 대화 전송하기

    socket.emit("Input Chat Message", variable);
    setChatMessage("");
  };

  const renderCards = () => {
    return chats && chats.map((chat, i) => <ChatCard key={i} {...chat} />);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: 800 }}>
      <div>
        <p style={{ fontSize: "2rem", textAlign: "center" }}> Real Time Chat</p>
      </div>

      <div style={{ width: "100%", margin: "0 auto" }}>
        <div
          className="infinite-container"
          style={{ height: "500px", overflowY: "scroll" }}
        >
          {/* RENDERCHATS */}
          {chats && renderCards()}
          <div
            // ref={el => {
            //   this.messagesEnd = el;
            // }}
            style={{ float: "left", clear: "both" }}
          />
        </div>

        <Row>
          <Form
            layout="inline"
            style={{ width: "100%" }}
            onSubmit={onFormSubmit}
          >
            <Col span={18}>
              <Input
                id="message"
                prefix={
                  <MessageOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Let's start talking"
                type="text"
                value={ChatMessage}
                onChange={onInputChange}
              />
            </Col>
            <Col span={2}>{/* DROPZONE */}</Col>

            <Col span={4}>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={onFormSubmit}
                htmlType="submit"
              >
                <EnterOutlined />
              </Button>
            </Col>
          </Form>
        </Row>
      </div>
    </div>
  );
}

export default withRouter(ChattingPage);
