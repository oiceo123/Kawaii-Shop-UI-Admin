import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{productId: string}>();

  return (
    <div>
      <h1>ProductDetail {productId}</h1>
    </div>
  );
};

export default ProductDetail;
