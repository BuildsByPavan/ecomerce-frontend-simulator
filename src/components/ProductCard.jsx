import React, { useState } from "react";
import "../styles/ProductCard.css";

function ProductCard({ product, onAddToCart, onEdit, onDelete, showActions }) {
  const [count, setCount] = useState(0);

  // Add to cart click
  const handleAddToCart = () => {
    setCount((prev) => prev + 1);
    if (onAddToCart) onAddToCart(product);
  };

  return (
    <div className="product-card">
      {product.image && <img src={product.image} alt={product.name} />}
      <h3>{product.name}</h3>
      <p className="price">₹{product.price}</p>
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>

      {showActions && (
        <div className="actions">
          {/* Add to Cart button */}
          {onAddToCart && (
            <button onClick={handleAddToCart}>
              Add to Cart {count > 0 && `(${count})`}
            </button>
          )}

          {/* Edit button */}
          {onEdit && (
            <button onClick={() => onEdit(product)}>Edit</button>
          )}

          {/* Delete button */}
          {onDelete && (
            <button onClick={() => onDelete(product.id)}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductCard;
