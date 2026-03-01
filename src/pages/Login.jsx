import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://backend-e-commerce-2-cxfs.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Login failed");
      }

      localStorage.setItem("token", data.token);
      alert(data.msg);
      navigate("/");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome Back 👋</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.text}>
          New here?
          <Link to="/signup" style={styles.link}> Create Account</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    width: "340px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  heading: {
    marginBottom: "20px",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  text: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555"
  },
  link: {
    color: "#667eea",
    fontWeight: "bold",
    textDecoration: "none"
  }
};