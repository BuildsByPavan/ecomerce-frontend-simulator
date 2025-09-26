import React, { useState } from "react";
import useProductStore from "../store/productStore";
import useCartStore from "../store/cartStore";
import useGuestCartStore from "../store/useGuestCartStore";
import useAuthStore from "../store/authStore";
import ProductCard from "../components/ProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // import styles
import "../styles/Home.css";

function Home() {
  const { products } = useProductStore();
  const { user } = useAuthStore();
  // Use appropriate cart store based on login status
  const addUserItem = useCartStore((state) => state.addItem);
  const addGuestItem = useGuestCartStore((state) => state.addItem);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Add item to cart (works for both users and guests)
  const handleAddToCart = (product) => {
    if (user) {
      addUserItem(product);
    } else {
      addGuestItem(product);
    }
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });
  };

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-container">
      <div className="home-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3 className="categories-sidebar">Categories</h3>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat}
                className={cat === selectedCategory ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <main className="products-section">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />

          {filteredProducts.length === 0 ? (
            <p className="empty-msg">No products found.</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  showActions
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default Home;
