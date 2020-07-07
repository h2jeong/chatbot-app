import React, { useState, useEffect } from "react";
import axios from "axios";
import { VIDEO_SERVER } from "../../../Config";
import moment from "moment";

function SideVideo(props) {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`${VIDEO_SERVER}/getVideos`).then(res => {
      if (res.data.success) {
        setVideos(res.data.videos);
      } else {
        alert("Failed to get videos");
      }
    });
  }, []);

  const renderSideVideos = () => {
    return Videos.filter(video => video._id !== props.videoId).map(
      (video, i) => (
        <div
          key={i}
          style={{ display: "flex", marginTop: "1rem", padding: "0 2rem" }}
        >
          <div style={{ width: "40%", marginRight: "1rem" }}>
            <a href={`/video/${video._id}`} style={{ color: "gray" }}>
              <img
                style={{ width: "100%" }}
                src={`http://localhost:5000/${video.thumbnail}`}
                alt="thumbnail"
              />
            </a>
          </div>

          <div style={{ width: "50%" }}>
            <a href={`/video/${video._id}`} style={{ color: "gray" }}>
              <span style={{ fontSize: "1rem", color: "black" }}>
                {video.title}{" "}
              </span>
              <br />
              <span>{video.writer.name}</span>
              <br />
              <span>{video.views}</span>
              <br />
              <span>
                {moment
                  .utc(moment.duration(video.duration, "s").asMilliseconds())
                  .format("HH:mm:ss")}
              </span>
              <br />
            </a>
          </div>
        </div>
      )
    );
  };

  return <div style={{ marginTop: "3rem" }}>{renderSideVideos()}</div>;
}

export default SideVideo;
