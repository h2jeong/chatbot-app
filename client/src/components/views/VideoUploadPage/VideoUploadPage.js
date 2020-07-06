import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import Title from "antd/lib/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import { VIDEO_SERVER } from "../../Config";

const privacies = [
  { value: 0, label: "private" },
  { value: 1, label: "public" }
];

const categories = [
  { value: 0, label: "travel" },
  { value: 1, label: "education" },
  { value: 2, label: "food" }
];

function VideoUploadPage(props) {
  const [FilePath, setFilePath] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  const [Duration, setDuration] = useState("");
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Privacy, setPrivacy] = useState(0);
  const [Category, setCategory] = useState("travel");

  const onDrop = files => {
    // console.log(files);
    // using formData - send upload files - record to folder - receive filepath
    // using filepath - send make thumbnails - ffmpeg - record to foler - recieve path & duration

    let formData = new FormData();
    formData.append("file", files[0]);

    const config = { header: { "content-type": "multipart/form-data" } };

    axios.post(`${VIDEO_SERVER}/uploadFiles`, formData, config).then(res => {
      if (res.data.success) {
        setFilePath(res.data.filePath);

        let variable = {
          filePath: res.data.filePath
        };

        axios.post(`${VIDEO_SERVER}/thumbnails`, variable).then(res => {
          if (res.data.success) {
            setThumbnail(res.data.thumbnailPath);
            setDuration(res.data.duration);
          } else {
            message.error("Failed to make thumbnails");
          }
        });
      } else {
        message.warning("Failed to upload files");
      }
    });
  };

  const onTitleChange = e => {
    setVideoTitle(e.currentTarget.value);
  };
  const onDescriptionChange = e => {
    setDescription(e.currentTarget.value);
  };
  const onPrivacyChange = e => {
    setPrivacy(e.currentTarget.value);
  };
  const onCategoryChange = e => {
    setCategory(e.currentTarget.value);
  };

  const onHandleSubmit = e => {
    e.preventDefault();

    let variable = {
      title: VideoTitle,
      description: Description,
      privacy: Privacy,
      category: Category,
      filepath: FilePath,
      duration: Duration,
      thumbnail: Thumbnail
    };

    axios.post(`${VIDEO_SERVER}/uploadVideo`, variable).then(res => {
      if (res.data.success) {
        // console.log(res.data);
        message.success("Upload Video Succeed");
        props.history.push("/");
      } else {
        message.error("Failed to upload video");
      }
    });
  };

  return (
    <div style={{ width: "700px", maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ margin: "3rem auto" }}>
        <Title level={2}>Upload Video</Title>
        <hr />
      </div>
      <Form onSubmit={onHandleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {/* Drop zone */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>
          {/* Thumbnail zone */}
          {Thumbnail && (
            <div>
              <img src={`http://localhost:5000/${Thumbnail}`} alt="thumbnail" />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />
        <br />
        <br />
        <select onChange={onPrivacyChange}>
          {privacies &&
            privacies.map((el, i) => {
              return (
                <option key={i} value={el.value}>
                  {el.label}
                </option>
              );
            })}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {categories &&
            categories.map((el, i) => {
              return (
                <option key={i} value={el.value}>
                  {el.label}
                </option>
              );
            })}
        </select>
        <br />
        <br />
        {/* available - onClick={onSubmit}, invalid - htmlFor= 'submit'  */}
        <Button type="primary" size="large" onClick={onHandleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(VideoUploadPage);
