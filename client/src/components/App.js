import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import { Layout } from "antd";
import NavBar from "./views/NavBar/NavBar";
import auth from "../hoc/auth";
import Chatbot from "./views/Chatbot/Chatbot";
import ChattingPage from "./views/ChattingPage/ChattingPage";

const { Footer, Content, Header } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header style={{ padding: "0 50px", background: "white" }}>
          <NavBar />
        </Header>
        <Content style={{ padding: "30px 50px" }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/" component={auth(LandingPage, null)} />
              <Route path="/login" component={auth(LoginPage, false)} />
              <Route path="/register" component={auth(RegisterPage, false)} />
              <Route path="/chat" component={auth(Chatbot, true)} />
              <Route path="/chatting" component={auth(ChattingPage, null)} />
            </Switch>
          </div>
        </Content>
        <Footer
          style={{ textAlign: "center", background: "#1890ff", color: "white" }}
        >
          Footer
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
