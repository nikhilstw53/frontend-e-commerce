import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: form.email,
            password: form.password,
          }
        );

        localStorage.setItem("token", res.data.token);
        alert(res.data.msg);
        navigate("/");
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/auth/signup",
          form
        );

        alert(res.data.msg);
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Server not responding");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              style={styles.input}
            />
          )}

          <input
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />

          <button style={styles.button}>
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p style={styles.switchText}>
          {isLogin ? "New here?" : "Already registered?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={styles.switchLink}
          >
            {isLogin ? " Create account" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

/* 🎨 STYLES */
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #667eea, #764ba2)",
  },
  card: {
    width: "340px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  switchText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  switchLink: {
    marginLeft: "6px",
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Auth;
