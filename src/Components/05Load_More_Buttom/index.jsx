import React, { useEffect, useState } from "react";
import "./style.css";

const LoadButton = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [errorMsg, setError] = useState(null);
//   const [isDisabled, setDisabled] = useState(false);

  async function fetchProduct() {
    if(product.length >= 100) return 
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      const data = await response.json();

      if (data && data.products && data.products.length) {
        setProduct((prevData) =>
          count === 0 ? data.products : [...prevData, ...data.products]
        );
      }
      // setProduct(data.products)
      console.log("data", data);
      //   console.log("pro", data.products);
      // setProduct(data.products)
      console.log("product", product);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [count]);

  const isDisabled = product.length >=100

//   useEffect(() => {
//     if (product && product.length === 100) setDisabled(true);
//   }, [product]);

  if (loading) return <div>Please wait ! Data is loading.</div>;

  if (errorMsg) return <div>Error : {errorMsg}</div>;

  return (
    <div className="load-container">
      <div className="product-container">
        {product && product.length ? (
          product.map((item) => (
            <div key={item.id} className="product">
              <h2>{item.id}</h2>
              <img src={item.thumbnail} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))
        ) : (
          <h2>Nothing to show</h2>
        )}
      </div>
      <div className="button-container">
        <button disabled={isDisabled || loading} onClick={() => setCount(count + 1)}>
          {
            loading ? "Loading..." : "Load More Product"
          }
        </button>
        {isDisabled && <p>You have reached to 100 products!</p>}
      </div>
    </div>
  );
};

export default LoadButton;
