import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const InputSearchComponent: React.FC = () => {
  return (
    <Input
      size="large"
      placeholder="Search"
      suffix={<SearchOutlined />}
      /* bordered={false} */
    />
  );
};

export default InputSearchComponent;
