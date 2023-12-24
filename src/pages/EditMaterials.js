import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css"

export default function EditMaterials() {

  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [units, setUnits] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`${API_SERVER}/material/all`);
        const data = await response.json();

        if (response.ok) {
          setMaterials(data);
        } else {
          console.error("Ошибка при получении материалов");
        }
      } catch (error) {
        console.error("Ошибка при получении материалов", error);
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
          <h4>Выберите материал из списка</h4>
                    <Form.Select
                      aria-label="Default select example" onChange={(e) => {
                        handleInputChangeName(e.target.value)
                      }}>
                      {materials.map((item, ind) => (
                        <option key={ind} value={item.name}>
                          {item.name}
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
