import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
};

export default Router;
