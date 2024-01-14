import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import type { ProductAddForm } from "../../types/Product";
import type { Category } from "../../types/Category";

import "./ProductAdd.scss";
import { Form, Input, InputNumber, Select, Button } from "antd";

interface Props {
  buttonTitle: string;
  categories: Category[];
  valueTitle?: string;
  valueCategory?: { value: number; label: string };
  valuePrice?: number;
  valueDescription?: string;
  onFinish: (values: ProductAddForm) => Promise<boolean | undefined>;
}

const ProductFormComponent: React.FC<Props> = (props) => {
  const {
    buttonTitle,
    categories,
    valueTitle,
    valueCategory,
    valuePrice,
    valueDescription,
    onFinish,
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("title", valueTitle);
    form.setFieldValue("category", valueCategory);
    form.setFieldValue("price", valuePrice);
    form.setFieldValue("description", valueDescription);
  }, []);

  return (
    <Form
      form={form}
      name="form-add-or-edit"
      layout="vertical"
      onFinish={async () => {
        try {
          const res = await onFinish!({
            title: form.getFieldValue("title"),
            category: {
              id: form.getFieldValue("category").value
                ? form.getFieldValue("category").value
                : form.getFieldValue("category"),
            },
            price: form.getFieldValue("price"),
            description: form.getFieldValue("description"),
          });
          if (res) {
            form.resetFields();
          }
        } catch (error) {
          console.error("เกิดข้อผิดพลาด");
        }
      }}
      scrollToFirstError
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="category" label="Category">
        <Select
          allowClear
          showSearch
          placeholder="Select Category"
          filterOption={(input, option) =>
            ((option?.label as string) ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            ((optionA?.label as string) ?? "")
              .toLowerCase()
              .localeCompare(((optionB?.label as string) ?? "").toLowerCase())
          }
          options={categories.map((category) => {
            return { value: category.id, label: category.title };
          })}
        />
      </Form.Item>
      <Form.Item name="price" label="Price">
        <InputNumber style={{ width: "100%" }} controls={false} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        className="web-components-productAdd-description-container"
      >
        <ReactQuill theme="snow" style={{ textAlign: "left" }} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: "0" }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: "100%" }}
        >
          {buttonTitle}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductFormComponent;
