import React, { /* useEffect, */ useState } from "react";
import axios from "../../api";
import { useHistory } from "react-router-dom";
import { getBase64 } from "../../helpers/getBase64";
import type { Image, ProductAddForm } from "../../types/Product";
import { useCategoriesFetch, useProductFetch } from "../../hooks";

import Swal from "sweetalert2";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import UploadImageComponent from "../../components/UploadImage";
import ProductFormComponent from "../../components/ProductForm";
import LoadingComponent from "../../components/Loading";

interface Props {
  productId: string;
}

const ProductEditContainer: React.FC<Props> = ({ productId }) => {
  const history = useHistory();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const { categories, categoriesError } = useCategoriesFetch();
  const { product, productError } = useProductFetch(productId);

  /* useEffect(() => {
    if (product) {
      setFileList(product.images);
      setImages(
        product.images.map((image) => ({
          filename: image.filename,
          url: image.url,
        }))
      );
    }
  }, [product]); */

  if (categoriesError || productError) {
    Swal.fire({
      icon: "error",
      text: "An error occurred. Please try again later.",
      confirmButtonText: "OK",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) history.replace("/signin");
    });
  }

  const handleBeforeUpload: UploadProps["beforeUpload"] = async (file) => {
    if (file.size > import.meta.env.VITE_FILE_LIMIT) {
      Swal.fire({
        icon: "error",
        text: "file size must less than 2 MB",
      });
      return Upload.LIST_IGNORE;
    }
    return true;
  };

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
      setImages([...images, file.response[0]]);
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

  const onProductEdit = async (value: ProductAddForm) => {
    try {
      const { title, category, price, description } = value;
      const res = await axios.patch(`/products/${productId}`, {
        title,
        description,
        category,
        price,
        images,
      });

      if (res.data) {
        setFileList([]);
        Swal.fire({
          icon: "success",
          text: "Product addition successful",
          confirmButtonText: "OK",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "An error occurred. Please try again later.",
      });
      return Promise.reject(false);
    }
  };

  if (!product) {
    return <LoadingComponent />;
  }

  return (
    <>
      <UploadImageComponent
        accept="image/png, image/jpg, image/jpeg"
        action={`${import.meta.env.VITE_API_URL}/files/upload`}
        headers={{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }}
        name="files"
        data={{ destination: "images/products" }}
        listType="picture-card"
        fileList={fileList}
        maxCount={10}
        beforeUpload={handleBeforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
        handleCancel={handleCancel}
        previewImage={previewImage}
        previewOpen={previewOpen}
        uploadButton={uploadButton}
      />
      <ProductFormComponent
        buttonTitle="Edit Product"
        categories={categories}
        valueCategory={{
          value: product?.category.id || 0,
          label: product?.category.title || "",
        }}
        valueDescription={product?.description || ""}
        valuePrice={product?.price || 9999999}
        valueTitle={product?.title || ""}
        onFinish={onProductEdit}
      />
    </>
  );
};

export default ProductEditContainer;
