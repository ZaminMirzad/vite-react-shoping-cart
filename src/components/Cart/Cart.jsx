import { Link } from "@reach/router";

import { cartStore } from "../../context/zustandContext";
import "./cart.css";

import ProductCard from "../ProductCard/ProductCard";

export default function Cart() {
  const { cartItems, cartTotalItems, cartTotalPrice } = cartStore(
    (state) => state
  );
  return (
    <div className="container">
      <div className="cart--details">
        <Link to="/">Back</Link>
        <div className="spans">
          <span>
            Total Items: <strong>{cartTotalItems}</strong>
          </span>
          <span>
            Total Price: <strong>{cartTotalPrice?.toFixed(2)} $</strong>
          </span>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <h1>No Items</h1>
      ) : (
        cartItems.map((item) => {
          return <ProductCard product={item} key={item.id} cart />;
        })
      )}
    </div>
  );
}
