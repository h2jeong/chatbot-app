import React from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { EllipsisOutlined } from "@ant-design/icons";

function CardComponent(props) {
  return (
    <Card
      style={{ width: 299, display: "inline-block" }}
      cover={
        <img
          src={props.cardInfo.fields.image.stringValue}
          alt={props.cardInfo.fields.description.stringValue}
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

// "values": [
//     {
//         "structValue": {
//             "fields": {
//                 "description": {
//                     "stringValue": "[Ep.125] 펭수의 이장 일기 (ENG)",
//                     "kind": "stringValue"
//                 },
//                 "image": {
//                     "stringValue": "https://yt3.ggpht.com/a/AATXAJz_WMq14sCE1e8fNpAAIKUyKRlZ1sT0ztc4fv2DDQ=s288-c-k-c0xffffffff-no-rj-mo",
//                     "kind": "stringValue"
//                 },
//                 "link": {
//                     "stringValue": "https://www.youtube.com/watch?v=BF_CCavEymc&t=0s",
//                     "kind": "stringValue"
//                 },
//                 "stack": {
//                     "stringValue": "MERN STACK",
//                     "kind": "stringValue"
//                 }
//             }
//         },
//         "kind": "structValue"
//     }
// ]
