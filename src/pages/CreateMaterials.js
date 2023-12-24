import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css";

export default function CreateMaterials() {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [unitsList, setUnitsList] = useState([]);
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
          for (var i = 0; i < data.length; i++) {
            if (!unitsList.includes(data[i].units))
              setUnitsList(unitsList, unitsList.push(data[i].units));
          }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name === "" || category === "" || units === ""){
        alert("Форма заполнена не полностью");
        console.log(name, category, units)
        return;
      }
    
    var flag = false;
    for (var i = 0; i < materials.length; i++){
        if (name === materials[i].name) flag = true;
    }
    if (flag){
        alert("Материал с таким названием уже существует");
        return;
    }
    else sendRequest();
    
  };

  const sendRequest = async () => {
    try {
        const response = await fetch(`${API_SERVER}/material/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_id: category,
            name: name,
            units: units,
          }),
        });

        if (response.ok) {
          alert("Материал был создан")
        } else {
            alert("Материал не был создан, обратитесь к администратору")
        }
      } catch (error) {
        console.error("Error during material creation", error);
        alert("Произошла ошибка во время отправки запроса");
      }
  };

  const handleInputChangeName = (value) => {
    setName(value);
  };

  const handleInputChangeCategory = (value) => {
    var e = "";
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].name === value) e = categories[i].id_;
    }
    console.log(e);
    setCategory(e);
  };

  const handleInputChangeUnits = (value) => {
    var e = "";
    console.log(value)
    console.log(unitsList)
    for (var i = 0; i < unitsList.length; i++) {
      if (unitsList[i] === value) e = unitsList[i];
    }
    console.log(e);
    setUnits(e);
  };

  if (localStorage.getItem("jwt") === null)
    return (
      <>
        <div
          style={{
            backgroundColor: "red",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          Доступ запрещен
        </div>
      </>
    );

  return (
    <>
      <h1>Создание материала</h1>
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
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                handleInputChangeCategory(e.target.value);
              }}
            >
              <option>Выберите категорию из списка</option>
              {categories.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUnits">
            <Form.Label>Единицы измерения</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                handleInputChangeUnits(e.target.value);
              }}
            >
              <option>Выберите единицы измерения из списка</option>
              {unitsList.map((item, index) => (
                <option key={index} value={item.value}>
                  {item}
                </option>
              ))}
            </Form.Select>
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
