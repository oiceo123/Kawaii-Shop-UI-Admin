import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SelectComponent from "../../components/Select";
import { useQuery } from "../../hooks/useQuery";

const options = [
  { value: 1, label: "Sorting: Price Low - High" },
  { value: 2, label: "Sorting: Price High - Low" },
];

const SelectSortContainer: React.FC = () => {
  const history = useHistory();
  const [selectedValue, setSelectedValue] = useState(1);

  const query = useQuery();
  const search = query.get("search") || "";
  const page = query.get("page") || 1;
  const sort = query.get("sort") || "ASC";
  const order_by = query.get("order_by") || "price";

  useEffect(() => {
    let defaultValue = 1;
    if (order_by === "price" && sort === "DESC") {
      defaultValue = 2;
    }

    setSelectedValue(defaultValue);
  }, [order_by, sort]);

  const handleChange = (value: number) => {
    if (value === 1) {
      history.push(`/?search=${search}&page=${page}&order_by=price&sort=ASC`);
    } else {
      history.push(`/?search=${search}&page=${page}&order_by=price&sort=DESC`);
    }
  };

  return (
    <div>
      <SelectComponent
        style={{ width: "90%", textAlign: "left" }}
        onChange={handleChange}
        options={options}
        size="large"
        value={selectedValue}
      />
    </div>
  );
};

export default SelectSortContainer;
