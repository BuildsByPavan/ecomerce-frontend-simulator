import React, { useState } from "react";
import useProductStore from "../store/productStore";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";
import ImageSlider from "../components/ImageSlider";

function Home() {
  const { products } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);
  const { user } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // const images = [
  //   "https://i.pinimg.com/736x/b6/89/96/b68996b0aeb13339740f961ada455a77.jpg",
  // ];
  // Add to cart
  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please log in to add items to cart");
      return;
    }
    addItem(product);
    alert(`${product.name} added to cart!`);
  };

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-container">
      <div className="home-layout">
        {/* Sidebar for category filter */}
        <aside className="sidebar">
          <h3>Categories</h3>
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

        {/* Main content */}
        <main className="products-section">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
         

          {/* Products grid */}
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
    </div>
  );
}

export default Home;
