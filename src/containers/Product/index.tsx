import React, { useEffect, useState } from "react";
import axios from "../../api";
import { Link } from "react-router-dom";
import type { Product } from "../../types/Product";

import Swal from "sweetalert2";
import { Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CardComponent from "../../components/Card";


const ProductContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get("/products");
      if (res.data.data) {
        setProducts(res.data.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "An error occurred. Please try again later.",
      });
    }
  };

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
