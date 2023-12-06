import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");

  const handleInputChangeEmail = (value) => {
    setEmail(value);
  };

  const handleInputChangePass = (value) => {
    setPass(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && pass !== ""){
      return;
    }
    else alert("Почта или пароль пусты");;
  };
  
  return (
    <>
      <br></br>
      <br></br>
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
              placeholder="Введите почту"
              onChange={(e) => {
                handleInputChangeEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              onChange={(e) => {
                handleInputChangePass(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Text className="text-muted">
            Не делитесь паролем ни с кем.
          </Form.Text>
          <br></br>
          <br></br>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="primary" type="submit" onSubmit={handleSubmit}>
              Войти
            </Button>
          </div>
          <br></br>
        </Form>
      </div>
    </>
  );
}
