import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  users: JSON.parse(localStorage.getItem("users")) || [],

  login: (email, password) =>
    set((state) => {
      if (email === "admin@gmail.com" && password === "admin123") {
        const adminUser = { email, role: "admin" };
        localStorage.setItem("user", JSON.stringify(adminUser));
        return { user: adminUser };
      }

      const foundUser = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        return { user: foundUser };
      }

      alert("Invalid credentials");
      return {};
    }),

  register: (name, email, password) =>
    set((state) => {
      const newUser = { name, email, password, role: "user" };
      const updatedUsers = [...state.users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("user", JSON.stringify(newUser));
      return { users: updatedUsers, user: newUser };
    }),

  logout: () =>
    set(() => {
      localStorage.removeItem("user");
      return { user: null };
    }),
}));

export default useAuthStore;
