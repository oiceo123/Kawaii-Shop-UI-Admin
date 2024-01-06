import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAppSelector } from "../redux";

import { Layout } from "antd";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SidebarContainer from "../containers/Sidebar";

const { Content } = Layout;

const Router: React.FC = () => {
  const history = useHistory();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      history.push("/");
    } else {
      history.push("signin");
    }
  }, [user, history]);

  if (user) {
    return (
      <Layout hasSider>
        <SidebarContainer />
        <Content style={{ margin: "16px" }}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Content>
      </Layout>
    );
  }

  return (
    <Switch>
      <Route path="/signin" exact>
        <SignIn />
      </Route>
    </Switch>
  );
};

export default Router;
