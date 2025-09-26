import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import "../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();
  const success = login(email, password);

  if (success) {
    toast.success(`Welcome back, ${email}!`, {
      autoClose: 2000,
      onClose: () => navigate("/"),
    });
  } else {
    toast.error("Invalid email or password", { autoClose: 2000 });
  }
};


  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>

        <span onClick={() => navigate("/register")}>
          Don’t have an account? Register
        </span>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
}

export default Login;
