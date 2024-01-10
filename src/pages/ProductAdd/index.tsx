import React from "react";

import "./ProductAdd.scss";
import { Row, Col } from "antd";
import ProductAddContainer from "../../containers/ProductAdd";

const ProductAdd: React.FC = () => {
  return (
    <div>
      <h1 style={{ marginBottom: "26px" }}>Add Product</h1>
      <Row justify="center">
        <Col span={22} className="web-pages-productAdd-container">
          <Row>
            <Col span={24}>
              <ProductAddContainer />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductAdd;
