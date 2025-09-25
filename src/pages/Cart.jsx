import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Cart.css";

function Cart() {
  const { items, removeItem, checkout } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please log in to proceed to checkout", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      navigate("/login");
      return;
    }
    checkout(user.email);
    toast.success("Checkout successful!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
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
      <h2 className="cart-title">My Cart</h2>

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
            <strong>Total:</strong> ₹{totalValue}{" | "}
            <strong>Total Quantity:</strong> {totalQuantity}
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default Cart;
