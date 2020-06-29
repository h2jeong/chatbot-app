import React, { useState } from "react";
import { Layout, Menu, message } from "antd";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_action/user_action";

import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  PoweroffOutlined
} from "@ant-design/icons";

const { Header } = Layout;

function NavBar() {
  const dispatch = useDispatch();
  const [IsAuth, setIsAuth] = useState(false);
  const onHandleLogout = () => {
    dispatch(logoutUser()).then(res => {
      console.log(res.payload);
      if (res.payload.success) {
        message.success("Logout Succeed");
        // props.history.push("/");
      } else {
        message.error("Logout Failed. ");
        console.log(res.payload.message);
      }
    });
  };
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
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            <span onClick={onHandleLogout}>Log out</span>
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
            <span onClick={onHandleLogout}>Log out</span>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default NavBar;
