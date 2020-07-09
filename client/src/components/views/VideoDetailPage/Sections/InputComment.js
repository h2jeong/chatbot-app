import React, { useState } from "react";
import { Comment, Avatar, Form, Button, Input } from "antd";

const { TextArea } = Input;

function InputComment(props) {
  const [Value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };
  const onSubmit = () => {
    props.onSubmit(Value);
    setValue("");
  };
  return (
    <Comment
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={
        <>
          <Form.Item>
            <TextArea rows={4} onChange={handleChange} value={Value} />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={props.submitting}
              onClick={onSubmit}
              type="primary"
            >
              Add Comment
            </Button>
          </Form.Item>
        </>
      }
    />
  );
}

export default InputComment;
