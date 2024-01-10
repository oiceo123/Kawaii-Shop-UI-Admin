import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductFetch } from "../../hooks";

import Swal from "sweetalert2";
import { Row, Col, Card } from "antd";
import "./ProductDetail.scss";
import ImageGroupComponent from "../../components/ImageGroup";
import ProductDetailComponent from "../../components/ProductDetail";

type ParamsType = {
  productId: string;
};

const ProductDetail: React.FC = () => {
  const history = useHistory();
  const { productId } = useParams<ParamsType>();
  const { product, error } = useProductFetch(productId);

  if (error) {
    Swal.fire({
      icon: "error",
      text: "An error occurred. Please try again later.",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) history.replace("/signin");
    });
  }

  return (
    <Row justify="center">
      <Col span={24}>
        <Row className="web-pages-productDetail-image-container">
          <Col span={10} className="web-pages-productDetail-col-image">
            <ImageGroupComponent
              images={product?.images.map((image) => image.url) || []}
            />
          </Col>
          <Col span={14} className="web-pages-productDetail-col-detail">
            <ProductDetailComponent
              title={product?.title || ""}
              price={product?.price || 9999999}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card
              title="Product Detail"
              className="web-pages-productDetail-description-container"
            >
              {product?.description}
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;
