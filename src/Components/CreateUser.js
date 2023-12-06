import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function CreateUser() {
    const [email, setEmail] = useState("");

    const [pass, setPass] = useState("");

    const [is_staff, setRole] = useState("");
  
    const handleInputChangeEmail = (value) => {
      setEmail(value);
    };
  
    const handleInputChangePass = (value) => {
      setPass(value);
    };

    const handleInputChangeRole = (value) => {
        setRole(value);
      };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (email && pass && is_staff !== ""){
        console.log(email, pass, is_staff)
        const bodyData = {
            email: email,
            pass: pass,
            is_staff: is_staff
          };
    
          try {
            const response = await fetch("http://127.0.0.1:5000/User/Create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyData),
            });
    
            if (response.ok) {
              console.log("Пользователь успешно создан!");
            } else {
              console.error("Ошибка при создании пользователя");
            }
          } catch (error) {
            console.error("Произошла ошибка", error);
          }
      }
      else alert("Почта, роль или пароль пусты");;
    };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Создание пользователя</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue",
          width: "50%",
          margin: "auto",
          padding: "15px",
          flexDirection: "column" }}>
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
          <div>
            <p>Роль:</p>
            <Form.Check type="radio" aria-label="radio 1" label="Менеджер" name="role"  onChange={(e) => {
                handleInputChangeRole(true);
              }}/>
            <Form.Check type="radio" aria-label="radio 2" label="Пользователь" name="role"  onChange={(e) => {
                handleInputChangeRole(false);
              }}/>
          </div>
          <br></br>
          <br></br>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="success" type="submit" onSubmit={handleSubmit}>
              Создать
            </Button>
          </div>
          <br></br>
        </Form>
      </div>
    </>
  );
}
