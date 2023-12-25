import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css"

export default function CreateAddress() {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [flat, setFlat] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

      };

  if (localStorage.getItem('jwt') === null) return (
    <>
      <div style={{
                backgroundColor: "red",
                padding: "10px",
                borderRadius: "10px",
              }}>Доступ запрещен</div>
    </>
  )

  return (
    <>
        <h1>Адреса</h1>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue",
          width: "50%",
          margin: "auto",
          padding: "15px",
          flexDirection: "column" }}>
        <Form flexDirection="column">
          <br></br>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexDirection: "column" }}>
          <Form.Group className="mb-3" controlId="formSecondName">
            <Form.Group className="mb-3" controlId="formSecondName">
            <Form.Label>Город</Form.Label>
            <Form.Control
              type=""
              placeholder="Введите город"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Form.Group>
            <Form.Group className="mb-3" controlId="formSecondName">
            <Form.Label>Улица</Form.Label>
            <Form.Control
              type=""
              placeholder="Введите улицу"
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSecondName">
            <Form.Label>Номер дома</Form.Label>
            <Form.Control
              type=""
              placeholder="Введите номер дома"
              onChange={(e) => {
                setBuilding(e.target.value);
              }}
            />
          </Form.Group>
            <Form.Label>Квартира</Form.Label>
            <Form.Control
              type=""
              placeholder="Введите номер квартиры"
              onChange={(e) => {
               setFlat(e.target.value);
              }}
            />
          </Form.Group>
          </div>
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
