import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";


export function FetchedAsync(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const {dispatch} = useCart();

  const handleAddtoCart = (product) =>{
    dispatch({type: "ADD_TO_CART", payload: product})
    navigate('/cart');
  }

  const handleBuyNow = (product) =>{
    navigate('/BuyNow', {state: {product}})
  }

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                setLoading(true);
                const response = await fetch("https://fakestoreapi.com/products")
                if(!response.ok) {
                    throw new Error("failed to fetch the products")
                }
                const data = await response.json()

                setProducts(data);
            }
            catch (err) {
                setError("An Error Happened", err)
            }

            finally {
        setLoading(false);
      }
        }
        fetchProducts();
    }, [])
    
    if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
     <h2 style={{textAlign: "center", marginBottom: "20px"}}>Products</h2> 

    <div 
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "20px",
      padding: "20px",
    }}
    >

    {products.map((product) => (
      <div
        key={product.id}
        style={{
          border: "2px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
         
        }}
      >

        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "150px",
            height: "150px",
            objectFit: "contain",
            marginBottom: "10px",
            margin: "0 auto"
          }}
        />

         <h3 style={{ fontSize: "16px", height: "50px" }}>{product.title}</h3>

        <p style={{ fontSize: "20px", fontWeight: "bold", color: "#2c3e50" }}>
          ${product.price}
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px", }}>
          <button
            style={{
              flex: 1,
              padding: "10px",
              background: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={ () => handleAddtoCart(product) }
          >
            Add to Cart
          </button>

           <button
            style={{
              flex: 1,
              padding: "10px",
              background: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => handleBuyNow(product)}
          >
            Buy Now
          </button>
        </div>
      </div>
    ))}


    </div>

    </>
    )
}