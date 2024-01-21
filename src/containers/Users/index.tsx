import React, { useEffect, useState } from "react";
import axios from "../../api";
import { useHistory } from "react-router-dom";
import type { User, UserTable } from "../../types/User";

import type { TableColumnsType } from "antd";

import TableComponent from "../../components/Table";
import Swal from "sweetalert2";

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
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users/admin/profiles");
      if (res.data) {
        setUsers(res.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "An error occurred. Please try again later.",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) history.replace("/signin");
      });
    }
  };

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
