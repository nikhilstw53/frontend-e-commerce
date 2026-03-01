import { useCart } from "./CartContext";

export function Cart() {

  const { cartItems, increment, decrement, removeItem } = useCart();

  if (cartItems.length === 0)
    return <h2>Cart Empty</h2>;


  return (
    <>
      <h2 style={{ textAlign: "center" }}>Cart</h2>

      {cartItems.map(item => (

        <div key={item.id}
          style={{
            display: "flex",
            gap: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            margin: "10px"
          }}>

          <img src={item.image} width="60" />

          <h4>{item.title}</h4>

          <h3>₹ {item.price * item.qty}</h3>

          <button onClick={() => decrement(item.id)}>
            −
          </button>

          <span>{item.qty}</span>

          <button onClick={() => increment(item.id)}>
            +
          </button>

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>

        </div>

      ))}
    </>
  );

}