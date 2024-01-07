import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useAppSelector } from "../redux";

import { Layout } from "antd";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SidebarContainer from "../containers/Sidebar";

const { Content } = Layout;

const Router: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return (
      <Layout hasSider>
        <SidebarContainer />
        <Content style={{ margin: "16px" }}>
          <Switch>
            <PrivateRoute path="/" exact>
              <Home />
            </PrivateRoute>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
          </Switch>
        </Content>
      </Layout>
    );
  }

  return (
    <Switch>
      <PrivateRoute path="/" exact>
        <Home />
      </PrivateRoute>
      <Route path="/signin" exact>
        <SignIn />
      </Route>
    </Switch>
  );
};

export default Router;
