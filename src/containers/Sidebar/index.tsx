import React from "react";
import axios from "../../api";
import { useAppDispatch } from "../../redux";
import { logout } from "../../redux/slices/authSlice";
import { useHistory } from "react-router-dom";

import {
  AppstoreOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import SidebarComponent from "../../components/Sidebar";
import Swal from "sweetalert2";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const SidebarContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "/users/signout",
        { oauth_id: localStorage.getItem("oid") },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (res.status === 200) {
        localStorage.removeItem("uid");
        localStorage.removeItem("oid");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(logout());
        history.push("/signin");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "An error occurred. Please try again later.",
      });
    }
  };

  const items: MenuItem[] = [
    getItem("Products", "Products", <AppstoreOutlined />, [
      getItem("Overview", "Overview Products", <AppstoreOutlined />),
      getItem("Add Proudct", "Add Proudct", <AppstoreAddOutlined />),
    ]),
    getItem("Users", "Users", <UserOutlined />, [
      getItem("Overview", "Overview Users", <UserOutlined />),
      getItem("Add User", "Add User", <UserAddOutlined />),
    ]),
    getItem("Logout", "Logout", <LogoutOutlined />),
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Overview Products") {
      history.push("/");
    }
    if (e.key === "Add Proudct") {
      history.push("/product/add");
    }
    if (e.key === "Overview Users") {
      history.push("/users");
    }
    if (e.key === "Add User") {
      history.push("/users/add");
    }
    if (e.key === "Logout") {
      handleLogout();
    }
  };

  return <SidebarComponent items={items} onClick={onClick} />;
};

export default SidebarContainer;
