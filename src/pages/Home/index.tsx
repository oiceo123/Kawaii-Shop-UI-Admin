import React from "react";

import "./Home.scss";
import { Col, Row } from "antd";
import InputSearchContainer from "../../containers/InputSearch";
import ProductContainer from "../../containers/Product";
import SelectSortContainer from "../../containers/SelectSort";

const Home: React.FC = () => {
  return (
    <>
      <Row className="web-pages-home-input-search-contianer">
        <Col span={5}>
          <h1>Products</h1>
        </Col>
        <Col span={13} style={{ textAlign: "center" }}>
          <InputSearchContainer />
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <SelectSortContainer />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <ProductContainer />
      </Row>
    </>
  );
};

export default Home;
