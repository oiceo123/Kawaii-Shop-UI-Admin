import React from "react";

import "./Home.scss";
import { Col, Row, Pagination } from "antd";
import InputSearchContainer from "../../containers/InputSearch";
import ProductContainer from "../../containers/Product";

const Home: React.FC = () => {
  return (
    <>
      <Row className="web-pages-home-input-search-contianer">
        <Col span={6}>
          <h1>Products</h1>
        </Col>
        <Col offset={12} span={6}>
          <InputSearchContainer />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <ProductContainer />
      </Row>
      <Pagination
        className="web-pages-home-pagination-container"
        defaultCurrent={6}
        total={500}
      />
    </>
  );
};

export default Home;
