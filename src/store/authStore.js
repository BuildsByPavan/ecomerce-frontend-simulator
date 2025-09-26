import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  users: JSON.parse(localStorage.getItem("users")) || [],

  login: (email, password) => {
    if (email === "admin@gmail.com" && password === "admin123") {
      const adminUser = { email, role: "admin", name: "Admin" };
      localStorage.setItem("user", JSON.stringify(adminUser));
      set({ user: adminUser });
      return true; // ✅ success
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      set({ user: foundUser });
      return true; // ✅ success
    }

    return false; // ❌ failed
  },

  register: (name, email, password) =>
    set((state) => {
      const newUser = { name, email, password, role: "user" };
      const updatedUsers = [...state.users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("user", JSON.stringify(newUser));
      return { users: updatedUsers, user: newUser };
    }),

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  updateUser: (updatedData) =>
    set((state) => {
      if (!state.user) return state;

      const updatedUser = { ...state.user, ...updatedData };

      let updatedUsers = state.users;
      if (state.user.role !== "admin") {
        updatedUsers = state.users.map((u) =>
          u.email === state.user.email ? { ...u, ...updatedData } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { user: updatedUser, users: updatedUsers };
    }),
}));

export default useAuthStore;
