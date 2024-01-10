import React from "react";
import { useParams } from "react-router-dom";

type ParamsType = {
  productId: string;
};

const ProductEdit: React.FC = () => {
  const { productId } = useParams<ParamsType>();

  return (
    <div>
      <h1>ProductEdit {productId}</h1>
    </div>
  );
};

export default ProductEdit;
