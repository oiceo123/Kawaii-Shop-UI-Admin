import React from "react";

import "./ProdcutEdit.scss";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import ProductEditContainer from "../../containers/ProductEdit";

type ParamsType = {
  productId: string;
};

const ProductEdit: React.FC = () => {
  const { productId } = useParams<ParamsType>();

  return (
    <div>
      <h1 style={{ marginBottom: "26px" }}>Edit Product</h1>
      <Row justify="center">
        <Col span={22} className="web-pages-productEdit-container">
          <Row>
            <Col span={24}>
              <ProductEditContainer productId={productId} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductEdit;
