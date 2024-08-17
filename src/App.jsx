import "./App.css";
import React, { useEffect, useState } from "react";
import ImageOfHeader from "./assets/GG.svg";
import ArrowButtom from "./assets/arrow-button.svg";
import ImageOfUnited from "./assets/United.svg";
import vector from "./assets/Vector.svg";
import GameGeek from "./assets/GameGeek.svg";
import styled from "styled-components";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Products from "./components/products/Products";
import Product from "./components/product/Product";
import { FaCartShopping } from "react-icons/fa6";
import NotFound from "./components/notfound/NotFound";
import SingleProduct from "./components/singleproducts/singleProduct";

function App() {
  const [cart, setCart] = useState([]);
  const [add, setAdd] = useState(0);
  const baseURL = "https://headphones-server.onrender.com/products";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(baseURL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [add, baseURL]);

const FooterContainer = styled.footer`
  background: #0d2612;
  color: #fff;
  padding: 20px 0;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
  margin: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  flex: 1;
  margin: 20px;
  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin: 5px 0;
    color: #ccc;
  }
`;

  return (
    <div>
      <Router>
        <header>
          <div className="container-1">
            <div>
              <div className="content-1">
                <img className="logo" src={ImageOfHeader} alt="logo" />
                <p>+998(93) 725-64-25</p>
              </div>
            </div>
            <div>
              <div className="content-2">
                <p>
                  Get 50% Off on the Selected items <span>|</span>
                </p>
                <p>Shop now</p>
              </div>
            </div>
            <div>
              <div className="content-3">
                <div className="ArrowButtom">
                  <img
                    style={{ cursor: "pointer" }}
                    src={ArrowButtom}
                    alt="buttomOfImage"
                  />
                  <p>English</p>
                  <img className="flag" src={ImageOfUnited} alt="flag" />
                </div>
                <div className="worldIcon">
                  <img
                    style={{ width: "17px", height: "17px" }}
                    src={vector}
                    alt="vector"
                  />
                  <p>Location</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-2">
            <div>
              <img className="GameGeek" src={GameGeek} alt="logo" />
            </div>
            <div className="navbar-container">
              <nav className="navbar">
                <ul className="header-link">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "activeLink" : ""
                      }
                      to="/SingleProduct"
                    ></NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "activeLink" : ""
                      }
                      to="/products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "activeLink" : ""
                      }
                      to="/Help"
                    >
                      Help
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
                <NavLink to="/SingleProduct">
                  <div className="cart-icon">
                    <FaCartShopping />
                    {add > 0 && <span className="cart-count">{add}</span>}
                  </div>
                </NavLink>
          </div>
        </header>
        <Routes>
          <Route
            path="/SingleProduct"
            element={<SingleProduct cart={cart} />}
          />
          <Route
            path="/Products"
            element={<Products cart={cart} setCart={setCart} setAdd={setAdd} />}
          />
          
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
      <FooterContainer>
        <FooterContent>
          <Section>
            <h3>Home</h3>
            <p>Gift card</p>
            <p>Mobile app</p>
            <p>Shipping & Delivery</p>
            <p>Order Pickup</p>
            <p>Account Signup</p>
          </Section>
          <Section>
            <h3>Help</h3>
            <p>ShopCart Help</p>
            <p>Returns</p>
            <p>Track Orders</p>
            <p>Feedback</p>
            <p>Security & Fraud</p>
          </Section>
          <Section>
            <h3>About us</h3>
            <p>News & Blog</p>
            <p>Help</p>
            <p>Press Center</p>
          </Section>
          <Section>
            <h3>About me</h3>
            <p>Created by Nodirbek Uktamjonov</p>
            <p>17.07.2024</p>
            <p>Link t.me Nodirbek</p>
          </Section>
        </FooterContent>
      </FooterContainer>
    </div>
  );
}

export default App;
