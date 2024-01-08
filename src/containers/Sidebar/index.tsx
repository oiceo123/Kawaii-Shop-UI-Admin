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
    getItem("Products", "Products", <AppstoreOutlined />),
    getItem("Add Proudct", "Add Proudct", <AppstoreAddOutlined />),
    getItem("User", "User", <UserOutlined />),
    getItem("Logout", "Logout", <LogoutOutlined />),
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Products") {
      history.push("/");
    }
    if (e.key === "Logout") {
      handleLogout();
    }
  };

  return <SidebarComponent items={items} onClick={onClick} />;
};

export default SidebarContainer;
