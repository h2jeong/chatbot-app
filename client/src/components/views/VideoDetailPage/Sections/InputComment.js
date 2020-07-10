import React, { useState } from "react";
import { Form, Button, Input } from "antd";

const { TextArea } = Input;

function InputComment(props) {
  console.log("inputComment:", props);
  const [Value, setValue] = useState("");
  const handleChange = e => {
    setValue(e.target.value);
  };
  const onSubmit = () => {
    if (props.responseTo) {
      props.onSubmit({ content: Value, responseTo: props.responseTo });
    } else {
      props.onSubmit({ content: Value });
    }
    setValue("");
  };

  return (
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
  );
}

export default InputComment;
