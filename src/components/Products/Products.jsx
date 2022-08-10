import "./products.css";
import { productsStore } from "../../context/zustandContext.js";

import Card from "../Card/Card";
import Categories from "../Categories/Categories";

export default function Products() {
  const products = productsStore((state) => state.products);
  return (
    <>
      <Categories />
      <div className="products__wrapper">
        {products?.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}
