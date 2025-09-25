import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGuestCartStore from "../store/useGuestCartStore";
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
    checkout(); // Shows alert to login
    navigate("/login");
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
                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong> ₹{totalValue} | <strong>Total Quantity:</strong> {totalQuantity}
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default GuestCart;
