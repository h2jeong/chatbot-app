import React from "react";
import Meta from "antd/lib/card/Meta";
import { Avatar, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";

function LandingPage() {
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recomanded</Title>
      <hr />
      <Row gutter={[32, 16]}>
        <Col lg={6} md={8} xs={24}>
          <div style={{ position: "relative" }}>
            <a>
              <img style={{ width: "100%" }} alt="thumbnail" />
            </a>
            <div className="duration">
              <span>duration</span>
            </div>
          </div>
          <br />
          <Meta avatar={<Avatar />} title descripteion />
          <span>name</span>
          <br />
          <span style={{ marginLeft: "3rem" }}>views </span> ・
          <span> date</span>
        </Col>
      </Row>
    </div>
  );
}

export default LandingPage;
