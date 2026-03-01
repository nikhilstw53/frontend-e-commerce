import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export function FetchedAsync() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const { addToCart } = useCart();


  useEffect(() => {

    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));

  }, []);


  const handleAdd = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  const handleBuy = (product) => {
    navigate("/BuyNow", { state: { product } });
  };


  return (
    <>
      <h2 style={{ textAlign: "center" }}>Products</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        gap: "20px",
        padding: "20px"
      }}>

        {products.map(product => (

          <div key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              textAlign: "center"
            }}>

            <img src={product.image}
              width="120" height="120"
            />

            <h4>{product.title}</h4>

            <h3>${product.price}</h3>

            <button onClick={() => handleAdd(product)}>
              Add to Cart
            </button>

            <button onClick={() => handleBuy(product)}>
              Buy Now
            </button>

          </div>

        ))}

      </div>
    </>
  );
}