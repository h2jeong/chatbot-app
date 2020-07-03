import React from "react";
import { Row, Col, List, Avatar } from "antd";

function VideoDetailPage() {
  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <video style={{ width: "100%" }} />
          {/* actions={[ '배열'에 ReactNode 넣어주기]} */}
          <List.Item actions>
            <List.Item.Meta avatar={<Avatar />} title description />
          </List.Item>
          {/* comment */}
        </div>
      </Col>
      <Col lg={6} xs={24}>
        {/* <SideVideo /> */}
      </Col>
    </Row>
  );
}

export default VideoDetailPage;
