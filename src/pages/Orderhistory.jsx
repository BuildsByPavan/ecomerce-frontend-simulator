import React from "react";
import useAuthStore from "../store/authStore";
import "../styles/OrderHistory.css"; 

function OrderHistory() {
  const { user } = useAuthStore(); // logged-in user

  if (!user) return <p className="empty-msg">Please log in to view your orders.</p>;

  // Get all orders from localStorage
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

  // Filter only orders of the logged-in user
  const userOrders = allOrders.filter(
    (order) => order.userEmail === user.email
  );

  return (
    <div className="order-container">
      <h2 className="order-title">My Orders</h2>

      {userOrders.length === 0 ? (
        <p className="empty-msg">No past orders found.</p>
      ) : (
        <div className="orders-list">
          {userOrders.map((order) => (
            <div className="order-card" key={order.id}>
              <h4 className="order-id">Order #{order.id}</h4>
              <p className="order-date">Date: {order.date}</p>
              <ul className="order-items">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
