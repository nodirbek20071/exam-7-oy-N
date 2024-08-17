import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, sortProductsByPrice } from "../../store/productsSlice";

const baseURL = import.meta.env.VITE_BASE_URL;

const Products = ({ cart, setCart, setAdd }) => {
  const products = useSelector((store) => store.productsReducer.products);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      const response = await fetch(`${baseURL}/brands`);
      const data = await response.json();
      setBrands(data);
    }

    async function fetchColors() {
      const response = await fetch(`${baseURL}/colors`);
      const data = await response.json();
      setColors(data);
    }

    fetchBrands();
    fetchColors();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = `${baseURL}/products`;

      const params = [];
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(`${query}`);
        const data = await response.json();
        dispatch(addProducts(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColor, dispatch]);

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortClick = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    dispatch(sortProductsByPrice(newSortOrder));
  };

  return (
    <>
      <div className="basic-1">
        <div
          className={`${styles.flex} ${styles["justify-between"]} ${styles["px-16"]} ${styles["bg-filteredBack"]} ${styles["text-filtered"]} ${styles["py-5"]} ${styles["max-sm:px-5"]} ${styles["max-sm:py-2"]} ${styles["text-2xl"]} ${styles["mt-10"]} ${styles["max-sm:text-lg"]} ${styles["items-center"]}`}
        >
          <p style={{ color: "#0BA42D" }}>Filter by:</p>
          <div className={`${styles.flex} ${styles["items-center"]}`}>
            <button
              style={{
                backgroundColor: "#D5F8CF",
                color: "#0BA42D",
                border: "none",
              }}
              className={`${styles.flex} ${styles["items-center"]} ${styles["gap-1"]}`}
              onClick={handleSortClick}
            >
              <span
                style={{ color: "#0BA42D" }}
                className="material-symbols-outlined"
              >
                {sortOrder === "asc"
                  ? "keyboard_arrow_down"
                  : "keyboard_arrow_up"}
              </span>
              Sort By Price
            </button>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <aside>
          <div>
            <h3>BRAND</h3>
            <ul>
              {brands.map((brand, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    value={brand}
                    name="brand"
                    id={brand}
                    checked={brand === selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <label htmlFor={brand}>{brand}</label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>COLORS</h3>
            <ul className={styles.colorsContainer}>
              {colors.map((color, index) => (
                <li key={index}>
                  <div
                    style={{
                      background: color,
                      outline: selectedColor === color ? "3px solid red" : "",
                    }}
                    className={styles.color}
                    onClick={() => setSelectedColor(color)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            style={{
              border: "2px solid green",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "green";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "";
              e.target.style.color = "";
            }}
            onClick={() => {
              setSelectedBrand("");
              setSelectedColor("");
            }}
          >
            Clear Filter
          </button>
        </aside>
        <main>
          {loading ? (
            <p className={styles.spinner}></p>
          ) : products.length ? (
            <div className={styles.grid}>
              {products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  cart={cart}
                  setCart={setCart}
                  setAdd={setAdd}
                />
              ))}
            </div>
          ) : (
            <p>No products</p>
          )}
        </main>
      </div>
    </>
  );
};

export default Products;
