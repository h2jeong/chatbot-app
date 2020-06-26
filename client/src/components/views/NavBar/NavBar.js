import React, { useState } from "react";
import { Layout, Menu } from "antd";

import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  PoweroffOutlined
} from "@ant-design/icons";

const { Header } = Layout;

function NavBar() {
  const [IsAuth, setIsAuth] = useState(false);

  if (!IsAuth) {
    return (
      <Header style={{ padding: "0 50px", background: "white" }}>
        <Menu mode="horizontal">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="login" icon={<PoweroffOutlined />}>
            <a href="/login">Log In</a>
          </Menu.Item>
          <Menu.Item key="register" icon={<UserAddOutlined />}>
            <a href="/register">Register</a>
          </Menu.Item>
        </Menu>
      </Header>
    );
  } else {
    return (
      <Header style={{ padding: 0 }}>
        <Menu mode="horizontal" selectedKeys={["home"]}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            <a href="/logout">Log out</a>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default NavBar;
