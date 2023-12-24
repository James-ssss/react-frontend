import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css"

export default function EditMaterials() {

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

  const handleSubmit = () => {

  }

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
        <h1>Редактирование материалов</h1>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue",
          width: "50%",
          margin: "auto",
          padding: "15px",
          flexDirection: "column",
          alignItems: "center" }}>
        <Form flexDirection="column" onSubmit={handleSubmit}>
          <br></br>
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Form.Group className="mb-3" controlId="formComment">
                    <Form.Select
                      aria-label="Default select example" onChange={(e) => {
                        handleInputChangeName(e.target.value)
                      }}>
                        <option>
                            Выберите материал из списка
                        </option>
                      {materials.map((item, ind) => (
                        <option key={ind} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type=""
              placeholder="Введите новое название материла"
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
            <Button variant="warning" type="submit" onSubmit={handleSubmit}>
              Изменить
            </Button>
          </div>
          <br></br>
        </Form>
      </div>
    </>
  );
}

