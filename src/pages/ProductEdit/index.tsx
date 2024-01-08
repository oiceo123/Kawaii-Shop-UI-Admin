import React from "react";
import { useParams } from "react-router-dom";

const ProductEdit: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <h1>ProductEdit {productId}</h1>
    </div>
  );
};

export default ProductEdit;
