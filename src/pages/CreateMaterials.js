import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css"

export default function CreateMaterials() {

  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [units, setUnits] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        var response = await fetch(`${API_SERVER}/material/all`);
        var data = await response.json();

        if (response.ok) {
          setMaterials(data);
        } else {
          console.error("Ошибка при получении материалов");
        }

        response = await fetch(`${API_SERVER}/category/all`);
        data = await response.json();

        if (response.ok) {
            setCategories(data);
          } else {
            console.error("Ошибка при получении категорий");
          }
      } catch (error) {
        console.error("Ошибка при получении материалов или категорий", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleSubmit = () => {

  }

  const handleInputChangeName = (value) => {
    setName(value)
  }

  const handleInputChangeCategory = (value) => {
    setCategory(value)
  }

  const handleInputChangeUnits = (value) => {
    setUnits(value)
  }


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
        <h1>Создание материала</h1>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue",
          width: "50%",
          margin: "auto",
          padding: "15px",
          flexDirection: "column" }}>
        <Form flexDirection="column" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type=""
              placeholder="Введите название материла"
              onChange={(e) => {
                handleInputChangeName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Категория</Form.Label>
            <Form.Control
              type=""
              placeholder="Введите категорию материла (сыпучие материалы, СИЗ...)"
              onChange={(e) => {
                handleInputChangeCategory(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUnits">
            <Form.Label>Единицы измерения</Form.Label>
            <Form.Control
              type=""
              placeholder="Введите единицы измерения материала"
              onChange={(e) => {
                handleInputChangeUnits(e.target.value);
              }}
            />
          </Form.Group>
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
