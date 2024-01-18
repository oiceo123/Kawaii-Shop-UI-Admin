import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd/es/select";

interface Props {
  defaultValue?: SelectProps["defaultValue"];
  style?: SelectProps["style"];
  onChange?: SelectProps["onChange"];
  options: SelectProps["options"];
  size?: SelectProps["size"];
  value?: SelectProps["value"]
}

const SelectComponent: React.FC<Props> = (props) => {
  const { defaultValue, style, onChange, options, size, value } = props;
  return (
    <Select
      defaultValue={defaultValue}
      style={style}
      onChange={onChange}
      options={options}
      size={size}
      value={value}
    />
  );
};

export default SelectComponent;
