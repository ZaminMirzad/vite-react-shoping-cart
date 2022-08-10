import { useEffect, useState } from "react";
import { categoriesStore } from "../../context/zustandContext";
import { productsStore } from "../../context/zustandContext";

import "./cats.css";
export default function Categories() {
  const [active, setActive] = useState("all");
  const { categories, fetchCategories } = categoriesStore((state) => state);
  const { fetchByCategory } = productsStore((state) => state);
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-list">
      {categories.map((category) => {
        return (
          <button
            key={category}
            onClick={() => {
              fetchByCategory(category), setActive(category);
            }}
            className={`category ${active === category ? "active" : ""}`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
