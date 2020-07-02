import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { MessageOutlined, EnterOutlined } from "@ant-design/icons";

function ChattingPage() {
  const [ChatMessage, setChatMessage] = useState("");
  useEffect(() => {
    // getChats
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: 800 }}>
      <div>
        <p style={{ fontSize: "2rem", textAlign: "center" }}> Real Time Chat</p>
      </div>

      <div style={{ width: "100%", margin: "0 auto" }}>
        <div
          className="infinite-container"
          style={{ height: "500px", overflowY: "scroll" }}
        >
          {/* RENDERCHATS */}
          <div
            // ref={el => {
            //   this.messagesEnd = el;
            // }}
            style={{ float: "left", clear: "both" }}
          />
        </div>

        <Row>
          <Form layout="inline" style={{ width: "100%" }} onSubmit>
            <Col span={18}>
              <Input
                id="message"
                prefix={
                  <MessageOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Let's start talking"
                type="text"
                value={ChatMessage}
                onChange
              />
            </Col>
            <Col span={2}>{/* DROPZONE */}</Col>

            <Col span={4}>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick
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

export default ChattingPage;
