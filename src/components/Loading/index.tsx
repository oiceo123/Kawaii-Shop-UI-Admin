import React from "react";
import { Flex, Spin } from "antd";

const LoadingComponent: React.FC = () => {
  return (
    <Flex justify="center" vertical style={{ height: "100vh" }}>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </Flex>
  );
};

export default LoadingComponent;
