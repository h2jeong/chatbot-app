import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import {
  MessageOutlined,
  EnterOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import { getChats, afterPostMessage } from "../../../_action/chat_action";
import ChatCard from "./Sections/ChatCard";
import Dropzone from "react-dropzone";
import Axios from "axios";

const server = "http://localhost:5000";
const socket = io.connect(server);

function ChattingPage() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.user.auth);
  const chat = useSelector(state => state.chat);

  const [ChatMessage, setChatMessage] = useState("");

  useEffect(() => {
    // getChats
    dispatch(getChats());

    socket.on("Output Chat Message", messagesFromBackEnd => {
      // console.log(messagesFromBackEnd);
      dispatch(afterPostMessage(messagesFromBackEnd));
    });
  }, [dispatch]);

  const onInputChange = e => {
    setChatMessage(e.target.value);
  };

  const onDrop = acceptedFiles => {
    console.log(acceptedFiles);
    // 파일올리기 : FormData - header configuration - send nodejs -
    let formData = new FormData();

    formData.append("file", acceptedFiles[0]);
    const config = { header: { "content-type": "multipart/form-data" } };

    Axios.post("/api/chat/uploadFiles", formData, config).then(res => {
      if (res.data.success) {
        let variable = {
          chatMessage: res.data.url,
          userId: auth.user._id,
          userName: auth.user.name,
          userImage: auth.user.image,
          nowTime: moment(),
          type: "VideoOrImage"
        };
        socket.emit("Input Chat Message", variable);
      } else {
        alert("Failed to upload files");
      }
    });
  };

  const onFormSubmit = e => {
    e.preventDefault();
    let variable = {
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
    return (
      chat.chats && chat.chats.map((chat, i) => <ChatCard key={i} {...chat} />)
    );
  };

  const scrollTo = ref => {
    if (ref /* + other conditions */) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: 800 }}>
      <div>
        <p style={{ fontSize: "2rem", textAlign: "center" }}> Real Time Chat</p>
      </div>

      <div style={{ width: "85%", margin: "0 auto" }}>
        <div
          className="infinite-container"
          style={{ height: "400px", overflowY: "scroll" }}
        >
          {/* RENDERCHATS */}
          {chat.chats && renderCards()}
          <div ref={scrollTo} style={{ float: "left", clear: "both" }} />
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
            <Col span={2}>
              {/* DROPZONE */}
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Button>
                        <UploadOutlined />
                      </Button>
                    </div>
                  </section>
                )}
              </Dropzone>
            </Col>

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
