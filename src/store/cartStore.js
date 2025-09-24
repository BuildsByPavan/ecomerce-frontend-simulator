import { create } from "zustand";

const useCartStore = create((set) => ({
  items: JSON.parse(localStorage.getItem("cart")) || [],

  // Add item or increase quantity
  addItem: (product) =>
    set((state) => {
      const index = state.items.findIndex((item) => item.id === product.id);
      let updated;

      if (index >= 0) {
        // Product exists → increase quantity
        updated = state.items.map((item, i) =>
          i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        // New product → add with quantity 1
        updated = [...state.items, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updated));
      return { items: updated };
    }),

  removeItem: (id) =>
    set((state) => {
      const updated = state.items.filter((_, i) => i !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return { items: updated };
    }),

  checkout: (userEmail) =>
    set((state) => {
      if (!userEmail) {
        alert("Please log in to place an order");
        return state;
      }

      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const newOrder = {
        id: Date.now(),
        userEmail,
        items: state.items,
        date: new Date().toLocaleString(),
      };

      const updatedOrders = [...orders, newOrder];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // Clear cart
      localStorage.removeItem("cart");
      alert("Order placed successfully!");

      return { items: [] };
    }),
}));

export default useCartStore;
