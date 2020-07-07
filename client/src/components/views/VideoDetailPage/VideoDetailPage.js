import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar, message, Button } from "antd";
import axios from "axios";
import { VIDEO_SERVER } from "../../Config";
import SideVideo from "./Sections/SideVideo";
import { useSelector } from "react-redux";

function VideoDetailPage(props) {
  // console.log(props.match.params);
  const auth = useSelector(state => state.user.auth);
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState(null);
  const [IsSubscribe, setIsSubscribe] = useState(false);
  const [SubscribedCount, setSubscribedCount] = useState(0);

  useEffect(() => {
    axios.post(`${VIDEO_SERVER}/getVideo`, { videoId }).then(res => {
      if (res.data.success) {
        console.log(res.data);
        setVideo(res.data.video);
      } else {
        message.error("Failed to get video by Id");
      }
    });

    axios.post("/api/subscribe/getCount", { videoId }).then(res => {
      if (res.data.success) {
        console.log(res.data);
        setSubscribedCount(res.data.count);
      } else {
        message.error("Failed to get subscribed count");
      }
    });
  }, [videoId]);

  const handleSubscribe = () => {
    if (!auth.isAuth) {
      return message.warning("Log in and subscribe");
    }
    const variable = {
      userTo: Video.writer._id,
      userFrom: auth.user._id,
      videoId: Video._id
    };
    axios.post("/api/subscribe/isSubscribed", variable).then(res => {
      if (res.data.success) {
        console.log(res.data);
        setIsSubscribe(true);
      } else {
        // message.error("Failed to subscribe");
        setIsSubscribe(false);
      }
    });

    if (!IsSubscribe) {
      axios.post("/api/subscribe/onSubscribe", variable).then(res => {
        if (res.data.success) {
          console.log(res.data);
          setIsSubscribe(!IsSubscribe);
          setSubscribedCount(SubscribedCount + 1);
        } else {
          message.error("Failed to subscribe");
        }
      });
    } else {
      axios.post("/api/subscribe/Unsubscribe", variable).then(res => {
        if (res.data.success) {
          console.log(res.data);
          setIsSubscribe(!IsSubscribe);
          setSubscribedCount(SubscribedCount - 1);
        } else {
          message.error("Failed to unsubscribe");
        }
      });
    }
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
                <Button onClick={handleSubscribe}>
                  {SubscribedCount}{" "}
                  {IsSubscribe ? "Cancel subscription" : "Subscription"}
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer.image} />}
                title={Video.title}
                description={Video.description}
              />
            </List.Item>
            {/* comment */}
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return null;
  }
}
export default VideoDetailPage;
