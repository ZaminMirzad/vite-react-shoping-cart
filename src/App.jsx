import { useEffect } from "react";
import { Router, Link } from "@reach/router";
import { ToastContainer } from "react-toastify";
import { BsMinecartLoaded } from "react-icons/bs";

//local imports
import "./App.css";
import { productsStore, cartStore } from "./context/zustandContext.js";

// Component imports
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";

function App() {
  const { fetchProducts } = productsStore((state) => state);
  const { cartTotalItems, updateTotalPrice } = cartStore((state) => state);
  useEffect(() => {
    fetchProducts();
    updateTotalPrice();
  }, []);
  return (
    <div className="App">
      <div className="head">
        <h1>Welcome The Store</h1>
        <span className="cart--count">
          <span className="count">{cartTotalItems}</span>
          <Link to="/cart">
            <BsMinecartLoaded />
          </Link>
        </span>
      </div>
      <Router>
        <Products path="/" />
        <Product path="/products/:id" />
        <Cart path="/cart" />
      </Router>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
