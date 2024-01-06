import React from "react";
import Router from "./routes";
import { Layout } from "antd";
import SidebarContainer from "./containers/Sidebar";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <>
      <Layout hasSider>
        <SidebarContainer />
        <Content style={{ margin: "16px" }}>
          <Router />
        </Content>
      </Layout>
    </>
  );
};

export default App;
