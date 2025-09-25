import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGuestCartStore from "../store/useGuestCartStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Cart.css";

function GuestCart() {
  const { items: storeItems, removeItem, checkout, syncCart } = useGuestCartStore();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  // Load items from localStorage on mount
  useEffect(() => {
    syncCart();
  }, []);

  useEffect(() => {
    setItems(storeItems || []);
  }, [storeItems]);

  const handleCheckout = () => {
    // Instead of alert inside store, show toast here
    toast.error("Please log in to proceed to checkout", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
    checkout();
    navigate("/login");
  };

  const handleRemove = (id, name) => {
    removeItem(id);
    toast.info(`${name} removed from cart`, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  const totalValue = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>

      {items.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <span className="cart-details">
                  {item.name} - ₹{item.price} × {item.quantity || 1}
                </span>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id, item.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong> ₹{totalValue} |{" "}
            <strong>Total Quantity:</strong> {totalQuantity}
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default GuestCart;
