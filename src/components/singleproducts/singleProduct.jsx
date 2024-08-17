import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const gradientBackground = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-size: 400% 400%;
  animation: ${fadeIn} 1.5s ease-in, ${gradientBackground} 15s ease infinite;
  max-width: 1278px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #black;
  margin: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  color: #fff;
  background: #0BA42D;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  &:hover {
    background: #0056b3;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const BackButton = styled(Button)`
  margin-bottom: 20px;
`;

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  text-align: center;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const ProductItem = styled.li`
  display: grid;
  grid-template-columns: 50px 1fr auto auto;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: #f9f9f9;
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CountButton = styled(Button)`
  margin: 0 5px;
  background: #28a745;

  &:hover {
    background: #218838;
  }
`;

const SingleProduct = ({ cart }) => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState(cart.map(() => 0));
  const [totalPrice, setTotalPrice] = useState(0);

  const handleBackClick = () => {
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

  const incrementCount = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
    updateTotalPrice(index, 1);
  };

  const decrementCount = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index] -= 1;
      setCounts(newCounts);
      updateTotalPrice(index, -1);
    }
  };

  const updateTotalPrice = (index, delta) => {
    const price = cart[index].price;
    setTotalPrice((prevTotal) => Math.max(0, prevTotal + price * delta));
  };

  return (
    <Container>
      <Title>Welcome to Shopping page</Title>
      <BackButton onClick={handleBackClick}>Shopping</BackButton>
      <HomeContainer>
        <h3>{counts.length === 0 ? "" : `Your Products: ${counts.length}`}</h3>
        <ProductList>
          {cart.map((item, index) => (
            <ProductItem key={index}>
              <ProductImage src={item.image_url} alt={item.name} />
              <div>{item.name}</div>
              <div>Brand: {item.brand_name}</div>
              <CounterContainer>
                <CountButton onClick={() => incrementCount(index)}>
                  +
                </CountButton>
                <p>{counts[index]}</p>
                <CountButton onClick={() => decrementCount(index)}>
                  -
                </CountButton>
              </CounterContainer>
              <div>Price: ${item.price}</div>
            </ProductItem>
          ))}
        </ProductList>
        <div style={{ color: "green" }}>
          {totalPrice === 0.0 ? "" : `Total Price: ${totalPrice.toFixed(2)}`}
        </div>
      </HomeContainer>
    </Container>
  );
};

export default SingleProduct;
