import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useProductsFetch } from "../../hooks";

import Swal from "sweetalert2";
import { Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CardComponent from "../../components/Card";

const ProductContainer: React.FC = () => {
  const history = useHistory();
  const { products, productsError } = useProductsFetch();

  if (productsError) {
    Swal.fire({
      icon: "error",
      text: "An error occurred. Please try again later.",
      confirmButtonText: "OK",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) history.replace("/signin");
    });
  }

  return (
    <>
      {products &&
        products.map((product) => (
          <Col span={6} key={product.id}>
            <Link to={`/product/${product.id}`}>
              <CardComponent
                title={product.title}
                cover={product.images[0].url}
                actions={[
                  <div
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      history.push(`/product/edit/${product.id}`);
                    }}
                  >
                    <EditOutlined
                      key="edit"
                      style={{ fontSize: "1rem", color: "#43acf7" }}
                    />
                  </div>,
                  <div>
                    <DeleteOutlined
                      key="delete"
                      style={{ fontSize: "1rem", color: "red" }}
                    />
                    ,
                  </div>,
                ]}
              />
            </Link>
          </Col>
        ))}
    </>
  );
};

export default ProductContainer;
