import React from "react";
import type { UserTable } from "../../types/User";

import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface Props {
  columns: TableColumnsType<UserTable>;
  dataSource: UserTable[];
}

const TableComponent: React.FC<Props> = (props) => {
  const { columns, dataSource } = props;
  return <Table columns={columns} dataSource={dataSource} />;
};

export default TableComponent;
