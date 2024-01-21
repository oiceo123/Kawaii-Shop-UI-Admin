import React from "react";

import { Row, Col } from "antd";

import "./UserAdd.scss";
import UserAddContainer from "../../containers/UserAdd";

const UserAdd: React.FC = () => {
  return (
    <>
      <Row className="web-pages-userAdd-header-container">
        <Col span={24}>
          <h1>Add User</h1>
        </Col>
      </Row>
      <Row justify='center'>
        <Col span={22} className="web-pages-userAdd-form-container">
          <UserAddContainer />
        </Col>
      </Row>
    </>
  );
};

export default UserAdd;
