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
import FooterComponent from "./views/Footer/Footer";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <NavBar />

        <Content style={{ padding: "30px 50px" }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/" component={auth(LandingPage, null)} />
              <Route path="/login" component={auth(LoginPage, false)} />
              <Route path="/register" component={auth(RegisterPage, false)} />
              <Route path="/chatbot" component={auth(Chatbot, null)} />
              <Route path="/chat" component={auth(ChattingPage, true)} />
              <Route
                path="/subscribe"
                component={auth(SubscriptionPage, true)}
              />
              <Route path="/upload" component={auth(VideoUploadPage, true)} />
              <Route
                path="/video/:videoId"
                component={auth(VideoDetailPage, null)}
              />
            </Switch>
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
