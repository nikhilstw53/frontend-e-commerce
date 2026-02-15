import { QRCodeCanvas } from "qrcode.react";
import { useNavigate, useLocation } from "react-router-dom";

export function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  if (!product) {
    return (
      <div style={styles.errorWrapper}>
        <h2>❌ Invalid Purchase</h2>
        <p>No product selected</p>
        <button style={styles.btn} onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  const upiID = "9569324843@axl";
  const upiAmount = product.price;
  const upiPayeeName = "Nikhil chauhan";

  const upiURL = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(
    upiPayeeName
  )}&am=${upiAmount}&cu=INR`;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>🛒 Secure Payment</h1>

        <div style={styles.productBox}>
          <h2>{product.title}</h2>
          <p style={styles.price}>₹ {product.price}</p>
        </div>

        <div style={styles.qrBox}>
          <QRCodeCanvas value={upiURL} size={220} />
          <p style={{ marginTop: "10px" }}>
            Scan & Pay with any UPI App
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ⬅ Back to Products
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "20px",
  },

  card: {
    width: "360px",
    background: "#fff",
    borderRadius: "18px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  },

  heading: {
    color: "#764ba2",
    marginBottom: "15px",
  },

  productBox: {
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px",
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#2f855a",
  },

  qrBox: {
    background: "#f7fafc",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "20px",
  },

  backBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "30px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
  },

  btn: {
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
  },

  errorWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ff512f, #dd2476)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
};
