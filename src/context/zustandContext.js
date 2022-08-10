import axios from "axios";
import create from "zustand";

// All products Store=======================================================
export const productsStore = create((set) => ({
  products: [],
  status: "",
  fetchProducts: async () => {
    set({ status: "loading" });
    const res = await axios.get(`https://fakestoreapi.com/products?limit=10`);
    set({
      products: res.data,
      status: "loaded",
    });
  },
  fetchByCategory: async (cat) => {
    set({ status: "loading" });
    if (cat === "all") {
      const res = await axios.get(`https://fakestoreapi.com/products?limit=10`);
      set({
        products: res.data,
        status: "loaded",
      });
    } else {
      const res = await axios.get(
        `https://fakestoreapi.com/products/category/` + cat
      );
      set({
        products: res.data,
        status: "loaded",
      });
    }
  },
}));
// one product store =====================================
export const productStore = create((set) => ({
  product: {},
  status: "",
  fetchProduct: async (id) => {
    set({ status: "loading" });
    const res = await axios.get(`https://fakestoreapi.com/products/` + id);
    set({
      product: res.data,
      status: "loaded",
    });
  },
}));

//get all categories store =====================================
export const categoriesStore = create((set) => ({
  categories: [],
  status: "",
  fetchCategories: async () => {
    set({ status: "loading" });
    const res = await axios.get(`https://fakestoreapi.com/products/categories`);
    set({
      categories: ["all"].concat(res.data),
      status: "loaded",
    });
  },
}));

//cart items store =====================================
export const cartStore = create((set, get) => ({
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalItems: 0,
  cartTotalPrice: 0,
  addToCart: (data) => {
    const newData = { ...data, quantity: 1 };
    const foundIndex = get().cartItems.findIndex((item) => item.id === data.id);
    if (foundIndex >= 0) {
      get().cartItems[foundIndex] = {
        ...get().cartItems[foundIndex],
        quantity: get().cartItems[foundIndex].quantity + 1,
      };
    } else {
      set(() => ({
        cartItems: [...get().cartItems, newData],
      }));
    }
    get().updateTotalPrice();
    localStorage.setItem("cartItems", JSON.stringify(get().cartItems));
  },

  //removeFromCart
  removeFromCart: (id) => {
    const foundIndex = get().cartItems.findIndex((item) => item.id === id);
    if (get().cartItems[foundIndex].quantity > 1) {
      get().cartItems[foundIndex] = {
        ...get().cartItems[foundIndex],
        quantity: get().cartItems[foundIndex].quantity - 1,
      };
    } else {
      get().cartItems.splice(foundIndex, 1);
    }
    get().updateTotalPrice();
    localStorage.setItem("cartItems", JSON.stringify(get().cartItems));
  },

  //update total cart items and price
  updateTotalPrice: () => {
    //
    let { total, qty } = get().cartItems.reduce(
      (cartTotal, cartItem) => {
        const { quantity, price } = cartItem;
        // total price for each item
        const totalPriceOfItem = price * quantity;

        // add to total price of all item in cart and qunatity
        cartTotal.total += totalPriceOfItem;
        cartTotal.qty += quantity;

        return cartTotal;
      },
      { total: 0, qty: 0 }
    );
    // update on state total, tax and items
    set({
      cartTotalItems: qty,
      cartTotalPrice: total,
    });
  },
}));
