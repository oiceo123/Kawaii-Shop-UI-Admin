import React from "react";
import type { SignInFieldType } from "../../pages/SignIn";

import "./SignIn.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Flex, Button, Form, Input, Typography } from "antd";

const { Title } = Typography;

interface Props {
  onSignIn: (values: SignInFieldType) => Promise<void>;
}

const SignInComponent: React.FC<Props> = ({ onSignIn }) => {
  const [form] = Form.useForm();

  return (
    <Flex vertical className="web-components-sign-in-container">
      <Title level={2}>Sign in</Title>
      <Form
        form={form}
        name="sign-in"
        onFinish={onSignIn}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Flex vertical style={{ width: "100%" }}>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default SignInComponent;
