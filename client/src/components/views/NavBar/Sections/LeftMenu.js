import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  PushpinOutlined,
  CommentOutlined
} from "@ant-design/icons";

function LeftMenu() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="subscribe" icon={<PushpinOutlined />}>
        <a href="/subscribe">Subscription</a>
      </Menu.Item>
      <Menu.Item key="chat" icon={<CommentOutlined />}>
        <a href="/chat">Chatting</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
