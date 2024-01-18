import React from "react";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";

interface Props {
  allowClear?: SearchProps["allowClear"];
  size?: SearchProps["size"];
  placeholder?: SearchProps["placeholder"];
  style?: SearchProps["style"];
  defaultValue?: SearchProps["defaultValue"];
  value?: SearchProps["value"];
  onSearch?: SearchProps["onSearch"];
  onChange?: SearchProps["onChange"];
}

const { Search } = Input;

const SearchComponent: React.FC<Props> = (props) => {
  const {
    allowClear,
    placeholder,
    size,
    style,
    defaultValue,
    value,
    onSearch,
    onChange,
  } = props;

  return (
    <Search
      allowClear={allowClear}
      placeholder={placeholder}
      size={size}
      style={style}
      defaultValue={defaultValue}
      value={value}
      onSearch={onSearch}
      onChange={onChange}
    />
  );
};

export default SearchComponent;
