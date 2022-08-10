import { toast } from "react-toastify";

import { cartStore } from "../../context/zustandContext";
import { HiMinus, HiPlus } from "react-icons/hi";
import "./productcard.css";

export default function ProductCard({ product, cart }) {
  const notify = () =>
    toast.success("Added to Cart", {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
    });
  const { addToCart, removeFromCart } = cartStore((state) => state);
  return (
    <div class="wrapper">
      <div class="product-img">
        <img src={product?.image} />
      </div>
      <div class="product-info">
        <div class="product-text">
          <h1>{product?.title}</h1>
          <h2>{product?.category}</h2>
          <p>{product?.description}</p>
        </div>
        <div class="product-price-btn">
          <span>{product?.price} $</span>
          {cart && (
            <div className="item--counts">
              <button onClick={() => removeFromCart(product.id)}>
                <HiMinus />
              </button>
              <span>{product?.quantity}</span>
              <button onClick={() => addToCart(product)}>
                <HiPlus />
              </button>
            </div>
          )}
          {!cart && (
            <button
              onClick={() => {
                addToCart(product);
                notify();
              }}
            >
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
