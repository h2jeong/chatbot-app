import React from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { EllipsisOutlined } from "@ant-design/icons";

function CardComponent(props) {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt={props.cardInfo.fields.description.stringValue}
          src={props.cardInfo.fields.image.stringValue}
        />
      }
      actions={[
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={props.cardInfo.fields.link.stringValue}
        >
          <EllipsisOutlined />
        </a>
      ]}
    >
      <Meta
        title={props.cardInfo.fields.stack.stringValue}
        description={props.cardInfo.fields.description.stringValue}
      />
    </Card>
  );
}

export default CardComponent;
