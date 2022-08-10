import { useEffect } from "react";
import { Link, useParams } from "@reach/router";

import "./product.css";
import { productStore } from "../../context/zustandContext";

import ProductCard from "../ProductCard/ProductCard";

export default function Product() {
  const params = useParams();
  const { product, fetchProduct } = productStore((state) => state);
  useEffect(() => {
    fetchProduct(params.id);
  }, [params.id]);
  return (
    <div className="container product-continer">
      <Link to="/">Back</Link>
      <ProductCard product={product} />
      <div className="buy--wrapper"></div>
    </div>
  );
}
