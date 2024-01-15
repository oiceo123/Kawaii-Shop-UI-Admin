import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../../api";
import type { Product } from "../../types/Product";

import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CardComponent from "../../components/Card";

const ProductContainer: React.FC = () => {
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState();

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      if (res.data.data) {
        setProducts(res.data.data);
      }
    } catch (error) {
      setProductsError(error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await axios.delete(`/products/${id}`);
      if (res.status === 204) {
        Toast.fire({
          icon: "success",
          title: "Product successfully deleted",
        });
        fetchProducts();
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to delete product",
      });
    }
  };

  const handleEdit = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    history.push(`/product/edit/${id}`);
  };

  const handleDelete = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    event.stopPropagation();

    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this product?",
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      showCancelButton: true,
      focusCancel: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    });
  };

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
                  <div onClick={(event) => handleEdit(event, product.id)}>
                    <EditOutlined
                      key="edit"
                      style={{ fontSize: "1rem", color: "#43acf7" }}
                    />
                  </div>,
                  <div onClick={(event) => handleDelete(event, product.id)}>
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
