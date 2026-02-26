import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // CSS import

// Direct export function syntax
export function Auth() {

  // page redirect karne ke liye use hota hai
  const navigate = useNavigate();

  // login ya signup mode track karta hai
  const [isLogin, setIsLogin] = useState(true);

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form submit function
  const handleSubmit = async (e) => {

    e.preventDefault(); // page reload stop

    try {

      // LOGIN
      if (isLogin) {

        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: email,
            password: password,
          }
        );

        // token save browser me
        localStorage.setItem("token", res.data.token);

        alert(res.data.msg);

        // home page redirect
        navigate("/");

      }

      // SIGNUP
      else {

        const res = await axios.post(
          "http://localhost:5000/api/auth/signup",
          {
            name: name,
            email: email,
            password: password,
          }
        );

        alert(res.data.msg);

        // signup ke baad login mode me switch
        setIsLogin(true);

        // form reset
        setName("");
        setEmail("");
        setPassword("");

      }

    } catch (err) {

      alert(err.response?.data?.msg || "Server not responding");

    }

  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2 className="auth-heading">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">

          {!isLogin && (
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
            />
          )}

          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Signup"}
          </button>

        </form>

        <p className="auth-switch-text">

          {isLogin ? "New here?" : "Already registered?"}

          <span
            onClick={() => setIsLogin(!isLogin)}
            className="auth-switch-link"
          >
            {isLogin ? " Create account" : " Login"}
          </span>

        </p>

      </div>

    </div>
  );
}