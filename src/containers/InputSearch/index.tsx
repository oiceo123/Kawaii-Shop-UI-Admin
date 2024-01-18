import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";

import SearchComponent from "../../components/Search";
import type { SearchProps } from "antd/es/input/Search";

const InputSearchContainer: React.FC = () => {
  const history = useHistory();

  const query = useQuery();
  const search = query.get("search") || "";
  const sort = query.get("sort") || "ASC";
  const order_by = query.get("order_by") || "price";

  const [searchValue, setSearchValue] = useState(search);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  const handleChange: SearchProps["onChange"] = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch: SearchProps["onSearch"] = (value) => {
    history.push(`/?search=${value}&page=1&order_by=${order_by}&sort=${sort}`);
  };

  return (
    <>
      <SearchComponent
        allowClear
        placeholder="Search"
        size="large"
        style={{ width: "80%" }}
        value={searchValue}
        onSearch={handleSearch}
        onChange={handleChange}
      />
    </>
  );
};

export default InputSearchContainer;
