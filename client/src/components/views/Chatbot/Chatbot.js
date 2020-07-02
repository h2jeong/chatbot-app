import React from "react";
import Title from "antd/lib/typography/Title";
import { RobotOutlined } from "@ant-design/icons";
import ChatBox from "./Sections/ChatBox";

function Chatbot() {
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Title level={2}>
          Chat Bot App&nbsp;
          <RobotOutlined />
        </Title>
      </div>
      <div style={{ displqy: "flex", justifyContent: "center" }}>
        <ChatBox />
      </div>
    </div>
  );
}

export default Chatbot;
