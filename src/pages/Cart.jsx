import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();
  const { cartItems, dispatch } = useCart();

  if (cartItems.length === 0) {
    return <h2 className="empty-cart">🛒 Your Cart is Empty</h2>;
  }

  return (
    <>
      {/* COLORFUL CORE CSS – SAME FILE */}
      <style>{`
        body {
          background: #f5f7fb;
        }

        .cart-title {
          text-align: center;
          margin: 25px 0;
          font-size: 28px;
          color: #333;
        }

        .cart-item {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #ffffff, #f0f4ff);
          border-radius: 14px;
          padding: 16px;
          margin: 15px auto;
          width: 90%;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          gap: 20px;
          transition: transform 0.2s ease;
        }

        .cart-item:hover {
          transform: translateY(-3px);
        }

        .cart-img {
          width: 80px;
          background: #fff;
          border-radius: 10px;
          padding: 8px;
        }

        .cart-name {
          flex: 1;
          font-size: 18px;
          color: #222;
        }

        .cart-price {
          font-size: 20px;
          font-weight: bold;
          color: #4a47ff;
          margin-right: 20px;
        }

        .qty-box {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #eef1ff;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .qty-btn {
          border: none;
          background: #4a47ff;
          color: #fff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
        }

        .qty-btn:hover {
          background: #3634d1;
        }

        .remove-btn {
          background: linear-gradient(135deg, #ff4d4d, #ff7676);
          color: #fff;
          border: none;
          border-radius: 20px;
          padding: 6px 14px;
          cursor: pointer;
          font-size: 14px;
        }

        .remove-btn:hover {
          opacity: 0.9;
        }

        .empty-cart {
          text-align: center;
          margin-top: 80px;
          font-size: 26px;
          color: #666;
        }
      `}</style>

      <h2 className="cart-title">Your Cart</h2>

      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.title} className="cart-img" />

          <h2 className="cart-name">{item.title}</h2>

          <h2 className="cart-price">
            ₹ {item.price * item.qty}
          </h2>

          <div className="qty-box">
            <button
              className="qty-btn"
              onClick={() =>
                dispatch({ type: "DECREMENT", payload: item.id })
              }
            >
              −
            </button>

            <span>{item.qty}</span>

            <button
              className="qty-btn"
              onClick={() =>
                dispatch({ type: "INCREMENT", payload: item.id })
              }
            >
              +
            </button>
          </div>

          <button
            className="remove-btn"
            onClick={() =>
              dispatch({ type: "REMOVE", payload: item.id })
            }
          >
            🗑 Remove
          </button>
        </div>
      ))}
    </>
  );
}
