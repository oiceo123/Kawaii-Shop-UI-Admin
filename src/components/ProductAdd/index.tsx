import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import type { ProductAddForm } from "../../types/Product";

import "./ProductAdd.scss";
import { Form, Input, InputNumber, Select } from "antd";
import type { FormProps } from "antd";

interface Props {
  onProductAdd: FormProps<ProductAddForm>["onFinish"];
}

const ProductAddComponent: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  const { onProductAdd } = props;

  return (
    <Form
      form={form}
      name="product-add"
      layout="vertical"
      onFinish={onProductAdd}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="category" label="Category">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="price" label="Price">
        <InputNumber style={{ width: "100%" }} controls={false} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        className="web-components-productAdd-container"
      >
        <ReactQuill theme="snow" style={{ textAlign: "left" }} />
      </Form.Item>
    </Form>
  );
};

export default ProductAddComponent;
