import React from "react";
import { Input } from "antd";
import type { InputProps } from "antd";

interface Props {
  size?: InputProps["size"];
  placeholder?: InputProps["placeholder"];
  suffix?: InputProps["suffix"];
  style?: InputProps["style"];
}

const CustomInputComponent: React.FC<Props> = (props) => {
  const { size, placeholder, suffix, style } = props;
  return (
    <Input
      size={size}
      placeholder={placeholder}
      suffix={suffix}
      style={style}
    />
  );
};

export default CustomInputComponent;
