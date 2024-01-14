import React from "react";

import "./UploadImage.scss";
/* import ImgCrop from "antd-img-crop"; */
import { Modal, Upload } from "antd";
import type { UploadProps } from "antd/es/upload/interface";

interface Props {
  accept: UploadProps["accept"];
  action: UploadProps["action"];
  beforeUpload: UploadProps["beforeUpload"];
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
    accept,
    action,
    beforeUpload,
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
      <Upload
        multiple
        accept={accept}
        action={action}
        beforeUpload={beforeUpload}
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
      <Modal
        open={previewOpen}
        onCancel={handleCancel}
        modalRender={() => <img style={{ width: "100%" }} src={previewImage} />}
      />
    </>
  );
};

export default UploadImageComponent;
