import React, { useState } from "react";
import { getBase64 } from "../../helpers/getBase64";
import type { ProductAddForm } from "../../types/Product";

import Swal from "sweetalert2";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import UploadImageComponent from "../../components/UploadImage";
import ProductAddComponent from "../../components/ProductAdd";

const ProductAddContainer: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => {
    setPreviewImage("");
    setPreviewOpen(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({
    file,
    fileList: newFileList,
  }) => {
    if (file.status === "done") {
      newFileList[newFileList.length - 1] = {
        ...newFileList[newFileList.length - 1],
        url: file.response[0].url,
      };
    }
    if (file.status === "error") {
      newFileList.pop();
      Swal.fire({
        icon: "error",
        text:
          file.response?.message ||
          "An error occurred. Please try again later.",
      });
    }
    setFileList(newFileList);
  };

  const uploadButton = (
    <button
      style={{
        display: "block",
        height: "100%",
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Image</div>
    </button>
  );

  const onProductAdd = async (value: ProductAddForm) => {
    const { title, category, price, description } = value;
    console.log("title", title);
    console.log("category", category);
    console.log("price", price);
    console.log("description", description);
  };

  return (
    <>
      <UploadImageComponent
        action={`${import.meta.env.VITE_API_URL}/files/upload`}
        headers={{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }}
        name="files"
        data={{ destination: "images/products" }}
        listType="picture-card"
        fileList={fileList}
        maxCount={10}
        onPreview={handlePreview}
        onChange={handleChange}
        handleCancel={handleCancel}
        previewImage={previewImage}
        previewOpen={previewOpen}
        uploadButton={uploadButton}
      />
      <ProductAddComponent onProductAdd={onProductAdd} />
    </>
  );
};

export default ProductAddContainer;
