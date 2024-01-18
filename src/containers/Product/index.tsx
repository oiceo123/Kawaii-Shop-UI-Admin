import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../../api";
import type { Product, ProductFilter } from "../../types/Product";
import { useQuery } from "../../hooks/useQuery";

import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { Col, Pagination, Empty } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CardComponent from "../../components/Card";
import EmptyComponent from "../../components/Empty";

const ProductContainer: React.FC = () => {
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState();
  const [total, setTotal] = useState(0);

  const query = useQuery();
  const search = query.get("search") || "";
  const page = parseInt(query.get("page") || "1");
  const sort = query.get("sort") || "ASC";
  const order_by = query.get("order_by") || "price";

  useEffect(() => {
    fetchProducts({
      search,
      page,
      sort,
      order_by,
    });
  }, [search, page, sort, order_by]);

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

  const fetchProducts = async ({
    search = "",
    page = 1,
    limit = 10,
    order_by = "price",
    sort = "ASC",
  }: ProductFilter = {}) => {
    try {
      const options = {
        params: {
          search,
          page,
          limit,
          order_by,
          sort,
        },
      };

      const res = await axios.get("/products", options);
      if (res.data.data) {
        setProducts(res.data.data);
        setTotal(res.data.total_item);
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

  const handlePaginate = (page: number) => {
    if (search) {
      history.push(
        `/?search=${search}&page=${page}&order_by=${order_by}&sort=${sort}`
      );
    } else {
      history.push(`/?page=${page}&order_by=${order_by}&sort=${sort}`);
    }
  };

  return (
    <>
      {products && products.length > 0 ? (
        <>
          {products.map((product) => (
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
          <Pagination
            style={{ display: "block", width: "100%" }}
            className="web-pages-home-pagination-container"
            current={page}
            total={total}
            onChange={handlePaginate}
          />
        </>
      ) : (
        <EmptyComponent
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{ height: "75px" }}
          style={{ width: "100%", marginTop: "40px" }}
        />
      )}
    </>
  );
};

export default ProductContainer;
