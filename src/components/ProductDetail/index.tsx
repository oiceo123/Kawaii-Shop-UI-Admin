import React from "react";

import "./ProductDetail.scss";
import { Row, Col, Flex, InputNumber, Button } from "antd";
import { StarOutlined, ShoppingCartOutlined } from "@ant-design/icons";

type Props = {
  title: string;
  price: number;
};

const ProductDetailComponent: React.FC<Props> = (props) => {
  const { title, price } = props;

  return (
    <Flex
      className="web-components-productDetail-container "
      justify="space-between"
      vertical
    >
      <div>
        <Row>
          <Col span={24} className="web-components-productDetail-title">
            {title}
          </Col>
        </Row>
        <Row className="web-components-productDetail-row">
          <Col span={5} className="web-components-productDetail-star">
            <span
              className="web-components-productDetail-font-green"
              style={{ marginRight: "8px" }}
            >
              0.0
            </span>
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
          </Col>
          <Col span={6} className="web-components-productDetail-rating">
            <span>0 </span>
            <span className="web-components-productDetail-font-gray">
              Rating
            </span>
          </Col>
          <Col span={5} className="web-components-productDetail-sold">
            <span>0 </span>
            <span className="web-components-productDetail-font-gray">Sold</span>
          </Col>
        </Row>
        <Row className="web-components-productDetail-row">
          <Col span={24} className="web-components-productDetail-price">
            &#3647; {price}
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col span={24}>
            <Row align="middle">
              <Col
                span={4}
                className="web-components-productDetail-quantity web-components-productDetail-font-gray"
              >
                Quantity
              </Col>
              <Col span={4} className="web-components-productDetail-quantity">
                <InputNumber
                  controls={false}
                  addonBefore="-"
                  addonAfter="+"
                  defaultValue={1}
                  min={1}
                  max={100}
                />
              </Col>
              <Col
                span={13}
                style={{ paddingLeft: "24px" }}
                className="web-components-productDetail-quantity web-components-productDetail-font-gray"
              >
                Remaining product 2 item
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col span={24} className="web-components-productDetail-button-group">
            <Button
              icon={<ShoppingCartOutlined style={{ fontSize: "1.25rem" }} />}
              className="web-components-productDetail-button-cart"
              disabled
            >
              Add To Cart
            </Button>
            <Button className="web-components-productDetail-button-buy" disabled>
              Buy Now
            </Button>
          </Col>
        </Row>
      </div>
    </Flex>
  );
};

export default ProductDetailComponent;
