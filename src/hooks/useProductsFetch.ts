import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import axios from "../api";

export const useProductsFetch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState();

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, productsError };
};
