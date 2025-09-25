// src/store/productStore.js
import { create } from "zustand";

// Default products (manually added dataset)
const defaultProducts = [
  {
    id: 1758695217105,
    category: "Electronics",
    name: "OnePlus 13R | Smarter with OnePlus AI | Lifetime Display Warranty (12GB RAM, 256GB Storage Nebula Noir)",
    price: 37999,
    image: "https://m.media-amazon.com/images/I/61muVCIy-uL._SL1500_.jpg",
    description:
      "Brand OnePlus Operating System Android 15, OxygenOS RAM Memory Installed Size 12 GB CPU Model Snapdragon 8 Gen3 CPU Speed 3.3 GHz",
  },
  {
    id: 1758695320552,
    category: "Electronics",
    name: "OnePlus 13R | Smarter with OnePlus AI | Lifetime Display Warranty (12GB RAM, 256GB Storage Nebula Noir)",
    price: 37999,
    image: "https://m.media-amazon.com/images/I/61++T836jiL._SL1500_.jpg",
    description:
      "Brand OnePlus Operating System Android 15, OxygenOS RAM Memory Installed Size 12 GB CPU Model Snapdragon 8 Gen3 CPU Speed 2.3, 3.0, 3.2, 3.3 GHz",
  },
  {
    id: 1758695653157,
    category: "Electronics",
    name: "OnePlus 13 | Smarter with OnePlus AI | Lifetime Display Warranty |12GB RAM 256GB Storage Midnight Ocean | Official Smartphone for BGMS 2025",
    price: 61999,
    image: "https://m.media-amazon.com/images/I/71N4hshhfNL._SL1500_.jpg",
    description:
      "Brand OnePlus Operating System Android 15, OxygenOS RAM Memory Installed Size 12 GB CPU Model Others CPU Speed 3.2 GHz",
  },
  {
    id: 1758695764796,
    category: "Electronics",
    name: "VIVO X200 FE 5G (Amber Yellow, 12GB RAM, 256GB Storage) with No Cost EMI/Additional Exchange Offers",
    price: 54998,
    image: "https://m.media-amazon.com/images/I/71QkSIVns8L._SL1500_.jpg",
    description:
      "Brand vivo Operating System Funtouch OS 15 RAM Memory Installed Size 12 GB CPU Model Mediatek Dimensity 9300 Plus CPU Speed 2.0, 2.85, 3.4 GHz",
  },
  {
    id: 1758696078852,
    category: "Electronics",
    name: "iPhone 16 Pro Max 256 GB: 5G Mobile Phone with Camera Control, 4K 120 fps Dolby Vision and Huge Leap in Battery Life",
    price: 21817,
    image: "https://m.media-amazon.com/images/I/61giwQtR1qL._SL1500_.jpg",
    description:
      "Brand Apple Operating System iOS 17 RAM Memory Installed Size 256 GB Memory Storage Capacity 256 GB Screen Size 6.9 Inches",
  },
  {
    id: 1758715601363,
    category: "Mens fashion",
    name: "KISAH Men Sea Green Solid Straight Kurta Full Sleaves, Knee Length, Regular Fit, Mandarin Collar Ethnic wear",
    price: 1796,
    image: "https://m.media-amazon.com/images/I/71A+X30VnbL._SX679_.jpg",
    description:
      "Material type Cotton Fit type Regular Style Ethnic Closure type Button Care instructions Dry Clean Only",
  },
  {
    id: 1758775019176,
    category: "Mens fashion",
    name: "Symbol Premium Men's Stylish Solid All Day Fresh Buttondown Casual Shirt",
    price: 1099,
    image: "https://m.media-amazon.com/images/I/71NCBXev2YL._SX569_.jpg",
    description:
      "Material composition 100% Cotton Pattern Solid Fit type Regular Fit Sleeve type Long Sleeve",
  },
  {
    id: 1758777450263,
    category: "Mens fashion",
    name: "SUBTRACT Men's Slim Fit Solid Spread Collar Cotton Satin Evening Shirt",
    price: 1790,
    image: "https://m.media-amazon.com/images/I/41YMv2loNwL._SY741_.jpg",
    description:
      "Collar style Spread Collar Length Standard Neck style Collared Neck Occasion type Formal",
  },
  {
    id: 1758777604562,
    category: "Mens fashion",
    name: "Mens Long Cardigan Hoodies Full Zip Fleece lined Sweaters",
    price: 18767,
    image: "https://m.media-amazon.com/images/I/61AAe07RVCL._SX679_.jpg",
    description:
      "Neck style Hooded Neck Fit type Regular Material type Polyester Length Standard Pattern Solid",
  },
  {
    id: 1758778695831,
    category: "Mens fashion",
    name: "Zaitun Mens Hooded Sweatshirt Long Sleeve Solid Knitted Hoodie Pullover Sweater",
    price: 1699,
    image: "https://m.media-amazon.com/images/I/91TYGmqYRvL._SX569_.jpg",
    description:
      "Package Dimensions ‎35.51 x 27.51 x 7.49 cm; 541.7 g Item Weight ‎542 g",
  },
  {
    id: 1758779419006,
    category: "Books",
    name: "The Secret of Secrets: Robert Langdon thriller from the author of THE DA VINCI CODE",
    price: 499,
    image: "https://m.media-amazon.com/images/I/81dHhoARp9L._SL1500_.jpg",
    description:
      "Robert Langdon is back in the long-awaited new race-against-time thriller from Dan Brown.",
  },
];

const initialProducts =
  JSON.parse(localStorage.getItem("products")) || defaultProducts;

const useProductStore = create((set) => ({
  products: initialProducts,

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
