import React from "react";

import "./Empty.scss";
import { Empty } from "antd";
import type { EmptyProps } from "antd";

interface Props {
  image?: EmptyProps["image"];
  imageStyle?: EmptyProps["imageStyle"];
  style?: React.CSSProperties;
}

const EmptyComponent: React.FC<Props> = (props) => {
  const { image, imageStyle, style } = props;
  return (
    <Empty
      className="web-components-empty-container"
      image={image}
      imageStyle={imageStyle}
      style={style}
    />
  );
};

export default EmptyComponent;
