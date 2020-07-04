import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Avatar, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Title from "antd/lib/typography/Title";

function SubscriptionPage() {
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Subscribed Videos </Title>
      <hr />

      <Row gutter={16}>
        <Col lg={6} md={8} xs={24}>
          <div style={{ position: "relative" }}>
            <a href="http://www.naver.com">
              <img style={{ width: "100%" }} alt="thumbnail" />
              <div
                className=" duration"
                style={{
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  margin: "4px",
                  color: "#fff",
                  backgroundColor: "rgba(17, 17, 17, 0.8)",
                  opacity: 0.8,
                  padding: "2px 4px",
                  borderRadius: "2px",
                  letterSpacing: "0.5px",
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "12px"
                }}
              >
                <span>time</span>
              </div>
            </a>
          </div>
          <br />
          <Meta avatar={<Avatar />} title />
          <span>name </span>
          <br />
          <span style={{ marginLeft: "3rem" }}> views</span>-{" "}
          <span> date </span>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(SubscriptionPage);
