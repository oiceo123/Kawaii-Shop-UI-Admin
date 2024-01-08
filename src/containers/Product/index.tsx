import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useProductsFetch } from "../../hooks/useProductsFetch";

import Swal from "sweetalert2";
import { Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CardComponent from "../../components/Card";

const ProductContainer: React.FC = () => {
  const history = useHistory();
  const { products, error } = useProductsFetch();

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
    <>
      {products &&
        products.map((product) => (
          <Col span={6}>
            <Link to={`product/${product.id}`}>
              <CardComponent
                title={product.title}
                cover={product.images[0].url}
                description={product.description}
                actions={[
                  <Link to={`product/edit/${product.id}`}>
                    <EditOutlined
                      key="edit"
                      style={{ fontSize: "1rem", color: "#43acf7" }}
                    />
                  </Link>,
                  <DeleteOutlined
                    key="delete"
                    style={{ fontSize: "1rem", color: "red" }}
                  />,
                ]}
              />
            </Link>
          </Col>
        ))}
    </>
  );
};

export default ProductContainer;
