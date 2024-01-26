import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import type { UserTable } from "../../types/User";
import { useAppSelector, useAppDispatch } from "../../redux";
import { fetchUsers } from "../../redux/slices/userSlice/thunk";
import { alertError } from "../../helpers/alertError";

import type { TableColumnsType } from "antd";

import TableComponent from "../../components/Table";
import LoadingComponent from "../../components/Loading";

const columns: TableColumnsType<UserTable> = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    width: 200,
    fixed: "left",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: 200,
  },
];

const UsersContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { users, usersLoading, usersError } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (usersLoading) {
    return <LoadingComponent />;
  }

  if (usersError) {
    alertError(history)
  }

  return (
    <TableComponent
      columns={columns}
      dataSource={users.map((user) => ({
        key: user.id,
        username: user.username,
        email: user.email,
        role: "admin",
      }))}
    />
  );
};

export default UsersContainer;
