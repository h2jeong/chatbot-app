import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar, message } from "antd";
import axios from "axios";
import { VIDEO_SERVER } from "../../Config";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";
import LikeDislikes from "./Sections/LikeDislikes";
import Comments from "./Sections/Comments";

function VideoDetailPage(props) {
  // console.log(props.match.params);
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState(null);
  const [CommentList, setCommentList] = useState([]);

  useEffect(() => {
    axios.post(`${VIDEO_SERVER}/getVideo`, { videoId }).then(res => {
      if (res.data.success) {
        //console.log(res.data);
        setVideo(res.data.video);
      } else {
        message.error("Failed to get video by Id");
      }
    });

    axios.post("/api/comment/getComments", { videoId }).then(res => {
      if (res.data.success) {
        console.log(res.data);
        setCommentList(res.data.comments);
      } else {
        message.error("Failed to get Comment List");
      }
    });
  }, [videoId]);

  const updateComments = comment => {
    setCommentList(CommentList.concat(comment));
  };

  if (Video) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              src={`http://localhost:5000/${Video.filepath}`}
              controls
              style={{ width: "100%" }}
            />
            {/* actions={[ '배열'에 ReactNode 넣어주기]} */}
            <List.Item
              actions={[
                <LikeDislikes />,
                <Subscriber userTo={Video.writer._id} />
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer.image} />}
                title={Video.title}
                description={Video.description}
              />
            </List.Item>
            {/* comment */}
            <Comments
              comments={CommentList}
              videoId={videoId}
              onUpdate={updateComments}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo videoId={videoId} />
        </Col>
      </Row>
    );
  } else {
    return null;
  }
}
export default VideoDetailPage;
