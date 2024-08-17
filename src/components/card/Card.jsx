import { FaCartShopping } from "react-icons/fa6";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Card.module.scss";
import Swal from "sweetalert2";

const Card = ({ product, setCart, setAdd }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "one more product added",
      showConfirmButton: false,
      timer: 1000,
    });
    setCartCount(cartCount + 1);
    setCart((prevCart) => [...prevCart, product]);
    setAdd((prevAdd) => prevAdd + 1);
    console.log("Added product:", product);
  };

  return (
    <div style={{border:"none"}} className={styles.card}>
      <img
        src={product.image_url}
        alt={product.product_name}
        className={styles.image}
      />
      <h4 style={{ marginBottom: "5px" }}>
        <Link
          style={{ color: "black", textDecoration: "none" }}
          to={`/products/${product.id}`}
        >
          {product.name}
        </Link>
      </h4>
      <p style={{ marginBottom: "5px" }} className={styles.description}>
        {product.description}
      </p>

      <div style={{ marginBottom: "5px" }} className={styles.colors}>
        {product.color_options.map((color, index) => (
          <div
            key={index}
            style={{ background: color }}
            className={styles.color}
          />
        ))}
      </div>
      <div  className={styles.price} style={{ color: "green",marginBottom:"5px" }}>
        ${product.price}
      </div>
      <div  className={styles.basic}>
        <Button onClick={addToCart}>
          <FaCartShopping />
          {cartCount > 0 && <span className={styles.just}>{cartCount}</span>}
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Card;
