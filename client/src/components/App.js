import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import { Layout } from "antd";
import NavBar from "./views/NavBar/NavBar";

const { Footer, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <NavBar />
        <Content style={{ padding: "30px 50px" }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
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
