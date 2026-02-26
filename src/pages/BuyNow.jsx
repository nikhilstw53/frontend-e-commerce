import { QRCodeCanvas } from "qrcode.react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BuyNow.css"; // CSS import

export function BuyNow() {

  const location = useLocation();
  const navigate = useNavigate();

  // Product data route se aa raha hai
  const product = location.state?.product;

  // Agar product nahi mila to error screen
  if (!product) {
    return (
      <div className="buy-error-wrapper">
        <h2>❌ Invalid Purchase</h2>
        <p>No product selected</p>
        <button className="buy-btn" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  // UPI Details
  const upiID = "9569324843@axl";
  const upiAmount = product.price;
  const upiPayeeName = "Nikhil chauhan";

  // UPI URL Generate
  const upiURL = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(
    upiPayeeName
  )}&am=${upiAmount}&cu=INR`;

  return (
    <div className="buy-wrapper">

      <div className="buy-card">

        <h1 className="buy-heading">🛒 Secure Payment</h1>

        <div className="buy-product-box">
          <h2>{product.title}</h2>
          <p className="buy-price">₹ {product.price}</p>
        </div>

        <div className="buy-qr-box">
          <QRCodeCanvas value={upiURL} size={220} />
          <p style={{ marginTop: "10px" }}>
            Scan & Pay with any UPI App
          </p>
        </div>

        <button
          className="buy-back-btn"
          onClick={() => navigate(-1)}
        >
          ⬅ Back to Products
        </button>

      </div>

    </div>
  );
}