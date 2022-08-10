import { useNavigate } from "@reach/router";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./card.css";
import { cartStore } from "../../context/zustandContext";

export default function Card({ product }) {
  const navigate = useNavigate();
  const { addToCart } = cartStore((state) => state);

  const notify = () =>
    toast.success("Added to Cart", {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
    });

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
    notify();
  };
  return (
    <div
      className=" card-container"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="square">
        <img src={product.image} className="mask" />
        <div className="h1">{product.title}</div>
        <p>{product.description}</p>

        <div className="card-bottom">
          <span>{product.price} $</span>
          <button className="button" onClick={handleAddToCart}>
            <MdAddShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}
