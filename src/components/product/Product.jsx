import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import Swal from "sweetalert2";
import { FaCartShopping } from "react-icons/fa6";

const baseURL = import.meta.env.VITE_BASE_URL;

const Product = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProductById() {
      const response = await fetch(`${baseURL}/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    }

    fetchProductById();
  }, [productId]);
  const handleBack = () => {
    navigate("/products");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "We are in products page",
    });
  };

  return (
    <>
      <button
        style={{ background: "white", border: "none", paddingLeft: "1rem" }}
        onClick={() => handleBack()}
      >
        Products / Gaming Headsets & Audio / Astro A50 X Wireless Headset{" "}
      </button>
      <div className={styles.basic}>
        <div className={styles.product}>
          {product && (
            <>
              <h2>{product.name}</h2>
              <img src={product.image_url} alt={product.name} />
              <p>{product.description}</p>
              <p style={{ color: "rgb(32, 185, 32)" }} className={styles.price}>
                Price: ${product.price}
              </p>
              <p className={styles.category}> Brand{product.brand_name}</p>
              <div className={styles.productDetails}>
                <strong>{product.description}</strong>
              </div>
            </>
          )}
        </div>
        <div>
          <h1>Astro A50 X</h1>
          <p>LIGHTSPEED Wireless Gaming Headset + Base Station</p>
          <div className={styles.border}>
            <h2>$399 or 99.99/month</h2>
            <p>Suggested payments with 6 month special financing</p>
          </div>
          <div>
            <p>Choose color</p>
            <div className={styles.color}>
              <div style={{ background: "black" }}></div>
              <div></div>
            </div>
          </div>
          <div className={styles.favorite}>
            <button className={styles.backButton}>
              <FaCartShopping /> Add to Cart
            </button>
            <div className={styles.symbols}>
              <span
                style={{ color: "black" }}
                class="material-symbols-outlined"
              >
                favorite
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
