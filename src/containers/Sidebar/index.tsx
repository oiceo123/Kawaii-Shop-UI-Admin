import React from "react";
import {
  AppstoreOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import SidebarComponent from "../../components/Sidebar";

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

const items: MenuItem[] = [
  getItem("Products", "1", <AppstoreOutlined />),
  getItem("Add Proudct", "2", <AppstoreAddOutlined />),
  getItem("User", "3", <UserOutlined />),
  getItem("Logout", "4", <LogoutOutlined />),
];

const SidebarContainer: React.FC = () => {
  return <SidebarComponent items={items} />;
};

export default SidebarContainer;
