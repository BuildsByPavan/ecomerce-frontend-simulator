import React from "react";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import "../styles/Cart.css";

function Cart() {
  const { items, removeItem, checkout } = useCartStore();
  const { user } = useAuthStore();

  const handleCheckout = () => {
    checkout(user?.email);
  };

  const totalValue = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>

      {items.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item, i) => (
              <li key={i} className="cart-item">
                {/* Show product image */}
                <img
                  src={item.image}   // image URL
                  alt={item.name}
                  className="cart-image"
                />
                
                <span className="cart-details">
                  {item.name} - ₹{item.price} × {item.quantity || 1}
                </span>
                
                <button className="remove-btn" onClick={() => removeItem(i)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Total Value Section */}
          <div className="cart-total">
            <strong>Total:</strong> ₹{totalValue}{" | "}
            <strong>Total Quantity:</strong> {totalQuantity}
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
