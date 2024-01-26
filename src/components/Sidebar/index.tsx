import React, { useState } from "react";
import "./Sidebar.scss";
import { Flex, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import logo from "../../assets/png/logo.png";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;

interface Props {
  items: MenuItem[];
  onClick: MenuProps["onClick"];
}

const SidebarComponent: React.FC<Props> = ({ items, onClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="web-components-sidebar-container"
    >
      <div className="web-components-sidebar-logo">
        {!collapsed ? (
          <Flex align="center" justify="center">
            <ShopOutlined style={{ fontSize: "16px" }} />
            <img src={logo} style={{ marginLeft: "10px" }} />
          </Flex>
        ) : (
          <ShopOutlined style={{ fontSize: "16px", height: "21px" }} />
        )}
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["Overview Products"]}
        mode="inline"
        items={items}
        onClick={onClick}
        className="web-components-sidebar-list"
      />
    </Sider>
  );
};

export default SidebarComponent;
