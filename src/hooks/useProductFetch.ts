import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import axios from "../api";

export const useProductFetch = (productId: string) => {
  const [product, setProduct] = useState<Product>();
  const [productError, setProductError] = useState();

  const fetchProduct = async (productId: string) => {
    try {
      const res = await axios.get(`/products/${productId}`);
      if (res.data) {
        setProduct(res.data);
      }
    } catch (error) {
      setProductError(error);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  return { product, productError };
};
