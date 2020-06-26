import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_action/user_action";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

function LoginPage(props) {
  const dispatch = useDispatch();

  const onFinish = values => {
    console.log("Success:", values);
    dispatch(loginUser(values)).then(res => {
      if (res.payload.success) {
        message.success("Login Succeed");
        console.log("userId:", res.payload.userId);
        props.history.push("/");
      } else {
        message.error("Login Failed. ", res.payload.err);
      }
    });
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginPage;
