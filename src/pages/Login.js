import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_SERVER } from "../serverAddresses";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // Добавлен новый стейт

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      console.log("Already logged in");
      setLoggedIn(true); // Устанавливаем флаг в true при наличии токена
      navigate("/CreateTask");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await fetch(`${API_SERVER}/user/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
          const res = await response.json();
          const access_token = res.access_token;
          const role = res.user_role;

          localStorage.setItem("jwt", access_token);
          localStorage.setItem("role", role);
          setLoggedIn(true); // Устанавливаем флаг в true после успешной авторизации
          navigate("/CreateTask");
        } else {
          console.error("Authentication failed");
          alert("Неправильные email или пароль");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        alert("Произошла ошибка во время аутентификации");
      }
    } else {
      alert("Почта или пароль пусты");
    }
  };

  return (
    <>
      <br />
      <br />
      {loggedIn ? null : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "lightblue",
            width: "50%",
            margin: "auto",
            padding: "15px",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>Авторизация</h1>
          </div>
          <Form flexDirection="column" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Почта</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Введите почту"
                onChange={handleInputChange}
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Введите пароль"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Text className="text-muted">
              Не делитесь паролем ни с кем.
            </Form.Text>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="primary" type="submit">
                Войти
              </Button>
            </div>
            <br />
          </Form>
        </div>
      )}
    </>
  );
};

export default Login;
