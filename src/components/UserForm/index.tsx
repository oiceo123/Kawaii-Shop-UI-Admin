import React, { useState } from "react";

import { AutoComplete, Form, Input, Select } from "antd";

const { Option } = Select;

const UserFormComponent: React.FC = () => {
  const [form] = Form.useForm();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onEmailChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}@kawaii${domain}`)
      );
    }
  };

  const emailOptions = autoCompleteResult.map((email) => ({
    label: email,
    value: email,
  }));

  return (
    <Form
      form={form}
      name="add-user"
      layout="vertical"
      size="large"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[{ required: true, message: "Please enter your email." }]}
      >
        <AutoComplete
          options={emailOptions}
          onChange={onEmailChange}
          placeholder="Please enter your email"
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default UserFormComponent;
