// src/store/productStore.js
import { create } from "zustand";

const useProductStore = create((set) => ({
  products: JSON.parse(localStorage.getItem("products")) || [],

  addProduct: (product) =>
    set((state) => {
      const updatedProducts = [...state.products, product];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    }),

  deleteProduct: (id) =>
    set((state) => {
      const updatedProducts = state.products.filter((p) => p.id !== id);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    }),

  updateProduct: (updatedProduct) =>
    set((state) => {
      const updatedProducts = state.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    }),
}));

export default useProductStore;
