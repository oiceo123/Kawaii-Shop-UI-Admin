import React from "react";
import { Route, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { useAppSelector } from "../redux";

import { Layout } from "antd";

import LoadingComponent from "../components/Loading";
import SidebarContainer from "../containers/Sidebar";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Maintenance from "../pages/Maintenance";
import ProductAdd from "../pages/ProductAdd";
import ProductDetail from "../pages/ProductDetail";
import ProductEdit from "../pages/ProductEdit";
import Users from "../pages/Users";
import UserAdd from "../pages/UserAdd";

const { Content } = Layout;

const Router: React.FC = () => {
  const { user, userLoading } = useAppSelector((state) => state.auth);

  if (userLoading) {
    return <LoadingComponent />;
  }

  if (user) {
    return (
      <Layout hasSider>
        <SidebarContainer />
        <Content style={{ margin: "16px" }}>
          <Switch>
            <PublicRoute path="/signin" exact>
              <SignIn />
            </PublicRoute>
            <Route path="/maintenance" exact>
              <Maintenance />
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
            <PrivateRoute path="/users" exact>
              <Users />
            </PrivateRoute>
            <PrivateRoute path="/users/add" exact>
              <UserAdd />
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
      <PublicRoute path="/signin" exact>
        <SignIn />
      </PublicRoute>
      <Route path="/maintenance" exact>
        <Maintenance />
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
      <PrivateRoute path="/users" exact>
        <Users />
      </PrivateRoute>
      <PrivateRoute path="/users/add" exact>
        <UserAdd />
      </PrivateRoute>
      <PrivateRoute path="/" exact>
        <Home />
      </PrivateRoute>
    </Switch>
  );
};

export default Router;
