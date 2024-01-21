import React from "react";

import { Row, Col } from "antd";

import "./Users.scss";
import UsersContainer from "../../containers/Users";

const Users: React.FC = () => {
  return (
    <>
      <Row className="web-pages-users-header-container">
        <Col span={24}>
          <h1>Users</h1>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <UsersContainer />
        </Col>
      </Row>
    </>
  );
};

export default Users;
