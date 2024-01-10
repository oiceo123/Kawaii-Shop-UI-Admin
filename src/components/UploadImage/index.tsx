import React from "react";

import "./UploadImage.scss";
import ImgCrop from "antd-img-crop";
import { Modal, Upload } from "antd";
import type { UploadProps } from "antd/es/upload/interface";

interface Props {
  action: UploadProps["action"];
  headers: UploadProps["headers"];
  name: UploadProps["name"];
  data: UploadProps["data"];
  listType: UploadProps["listType"];
  fileList: UploadProps["fileList"];
  maxCount: UploadProps["maxCount"];
  onPreview: UploadProps["onPreview"];
  onChange: UploadProps["onChange"];
  uploadButton: React.ReactNode;
  previewOpen: boolean;
  handleCancel: () => void;
  previewImage: string;
}

const UploadImageComponent: React.FC<Props> = (props) => {
  const {
    action,
    data,
    fileList,
    maxCount,
    headers,
    listType,
    name,
    onChange,
    onPreview,
    uploadButton,
    handleCancel,
    previewImage,
    previewOpen,
  } = props;

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          action={action}
          headers={headers}
          name={name}
          data={data}
          listType={listType}
          fileList={fileList}
          maxCount={maxCount}
          onPreview={onPreview}
          onChange={onChange}
          className="web-components-uploadImage-container"
        >
          {fileList!.length >= maxCount! ? null : uploadButton}
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        onCancel={handleCancel}
        modalRender={() => <img style={{ width: "100%" }} src={previewImage} />}
      />
    </>
  );
};

export default UploadImageComponent;
