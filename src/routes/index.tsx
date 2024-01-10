import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useAppSelector } from "../redux";

import { Layout } from "antd";
import SidebarContainer from "../containers/Sidebar";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import ProductAdd from "../pages/ProductAdd";
import ProductDetail from "../pages/ProductDetail";
import ProductEdit from "../pages/ProductEdit";

const { Content } = Layout;

const Router: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return (
      <Layout hasSider>
        <SidebarContainer />
        <Content style={{ margin: "16px" }}>
          <Switch>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
            <PrivateRoute path="/product/add" exact>
              <ProductAdd />
            </PrivateRoute>
            <PrivateRoute path="/product/:productId" exact>
              <ProductDetail />
            </PrivateRoute>
            <PrivateRoute path="/product/edit/:productId" exact>
              <ProductEdit />
            </PrivateRoute>
            <PrivateRoute path="/" exact>
              <Home />
            </PrivateRoute>
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
      <PrivateRoute path="/product/add" exact>
        <ProductAdd />
      </PrivateRoute>
      <PrivateRoute path="/product/:productId" exact>
        <ProductDetail />
      </PrivateRoute>
      <PrivateRoute path="/product/edit/:productId" exact>
        <ProductEdit />
      </PrivateRoute>
      <PrivateRoute path="/" exact>
        <Home />
      </PrivateRoute>
    </Switch>
  );

  /* return (
    <Layout hasSider>
      <SidebarContainer />
      <Content style={{ margin: "16px" }}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/signin" exact>
            <SignIn />
          </Route>
          <Route path="/product/add" exact>
            <ProductAdd />
          </Route>
          <Route path="/product/:productId" exact>
            <ProductDetail />
          </Route>
          <Route path="/product/edit/:productId" exact>
            <ProductEdit />
          </Route>
        </Switch>
      </Content>
    </Layout>
  ); */
};

export default Router;
