import { BsMinecartLoaded } from "react-icons/bs";
import { useNavigate } from "@reach/router";

import "./products.css";
import { productsStore, cartStore } from "../../context/zustandContext.js";

import Card from "../Card/Card";
import Categories from "../Categories/Categories";

export default function Products() {
  const navigate = useNavigate();
  const products = productsStore((state) => state.products);
  const { cartTotalItems } = cartStore((state) => state);
  return (
    <>
      <div className="  head">
        <h1>Welcome The Store</h1>
        <span className="cart--count">
          <span className="count">{cartTotalItems}</span>
          <button onClick={() => navigate("/cart")}>
            <BsMinecartLoaded />
          </button>
        </span>
      </div>
      <Categories />
      <div className="products__wrapper">
        {products?.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}
