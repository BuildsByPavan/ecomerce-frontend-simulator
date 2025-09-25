import { create } from "zustand";

const useGuestCartStore = create((set) => ({
  items: JSON.parse(localStorage.getItem("guestCart")) || [],

  // Add item or increase quantity
  addItem: (product) =>
    set((state) => {
      const index = state.items.findIndex((item) => item.id === product.id);
      let updated;

      if (index >= 0) {
        updated = state.items.map((item, i) =>
          i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        updated = [...state.items, { ...product, quantity: 1 }];
      }

      localStorage.setItem("guestCart", JSON.stringify(updated));
      return { items: updated };
    }),

  // Remove item by id
  removeItem: (id) =>
    set((state) => {
      const updated = state.items.filter((item) => item.id !== id);
      localStorage.setItem("guestCart", JSON.stringify(updated));
      return { items: updated };
    }),

  // Clear cart
  clearCart: () =>
    set(() => {
      localStorage.removeItem("guestCart");
      return { items: [] };
    }),

  // Checkout: requires login
  checkout: () =>
    set((state) => {
      alert("Please log in to proceed to checkout");
      return state;
    }),

  // Sync cart from localStorage
  syncCart: () =>
    set(() => {
      const stored = JSON.parse(localStorage.getItem("guestCart")) || [];
      return { items: stored };
    }),
}));

export default useGuestCartStore;
