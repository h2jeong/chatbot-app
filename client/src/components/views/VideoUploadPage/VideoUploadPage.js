import React from "react";
import { useSelector } from "react-redux";
import { Input, Button, Form } from "antd";
import Title from "antd/lib/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import { VIDEO_SERVER } from "../../Config";

function VideoUploadPage(props) {
  const auth = useSelector(state => state.user.auth);
  const onDrop = files => {
    console.log(files);
    let formData = new FormData();
    formData.append("file", files);

    const config = {
      header: {
        "content-type": "multipart/form-data"
      }
    };

    axios.post(`${VIDEO_SERVER}/uploadFiles`, formData, config).then(res => {});
  };

  return (
    <div style={{ width: "700px", maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ margin: "3rem auto" }}>
        <Title level={2}>Upload Video</Title>
        <hr />
      </div>
      <Form onSubmit>
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

          <div>
            <img alt="thumbnail" />
          </div>
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange value />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange value />
        <br />
        <br />
        <select>
          <option key value>
            label
          </option>
        </select>
        <br />
        <br />
        <select>
          <option key value>
            label
          </option>
        </select>
        <br />
        <br />
        {/* available - onClick={onSubmit}, invalid - htmlFor= 'submit'  */}
        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(VideoUploadPage);
