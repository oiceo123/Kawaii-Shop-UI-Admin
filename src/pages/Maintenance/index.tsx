import React, { useEffect } from "react";
import axios from "../../api";
import { useAppDispatch } from "../../redux";
import { logout } from "../../redux/slices/authSlice";
import "./Maintenance.scss";

import { Row, Col } from "antd";
import { ToolTwoTone } from "@ant-design/icons";

const Maintenance: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    const res = await axios.post(
      "/users/signout",
      { oauth_id: localStorage.getItem("oid") },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (res.status === 200) {
      localStorage.removeItem("uid");
      localStorage.removeItem("oid");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      dispatch(logout());
    }
  };

  return (
    <Row align="middle" className="web-pages-maintenance-container">
      <Col span={24} className="web-pages-maintenance-body">
        <ToolTwoTone className="web-pages-maintenance-body-icon" />
        <div className="web-pages-maintenance-body-title">
          The platform is under maintenance
        </div>
        <div className="web-pages-maintenance-body-subtitle">
          It will be available as soon as possible
        </div>
      </Col>
    </Row>
  );
};

export default Maintenance;
