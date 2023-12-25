import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css"

export default function EditMaterials() {

    const jwtToken = localStorage.getItem("jwt");
    const [materials, setMaterials] = useState([]);
    const [categories, setCategories] = useState([]);
    const [unitsList, setUnitsList] = useState([]);
    const [id_, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categoryString, setCategoryString] = useState("");
    const [units, setUnits] = useState("");
    const [oldname, setOldName] = useState("Материал не выбран");
    const [oldcategory, setOldCategory] = useState("Материал не выбран");
    const [oldunits, setOldUnits] = useState("Материал не выбран");

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
    var mat = "";
    console.log(materials)
    console.log(id_)
    for (var i = 0; i < materials.length; i++){
        if (materials[i].id_ === id_) mat = materials[i]
    }
    if (mat === ""){
        alert("Что-то пошло не так, попробуйте позже")
        return
    }
    if (mat.name === name && mat.units === units && mat.category === categoryString){
        alert("Нельзя редактировать материал, ничего в нём не поменяв")
        return
    }

    sendRequest()
  }

  const sendRequest = async () => {
    try {
        const response = await fetch(`${API_SERVER}/material/update/${id_}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`, 
          },
          body: JSON.stringify({
            category_id: category,
            name: name,
            units: units,
          }),
        });

        if (response.ok) {
          alert("Материал был обновлен")
        } else {
            alert("Материал не был обновлен, обратитесь к администратору")
        }
      } catch (error) {
        console.error("Error during material editing", error);
        alert("Произошла ошибка во время отправки запроса");
      }
  };

  const handleInputChangeName = (value) => {
    setName(value);
  };

  const handleInputChangeId = (value) => {
    var e = "";
    for (var i = 0; i < materials.length; i++) {
        if (materials[i].name === value) e = materials[i];
      }
    if (e === ""){
        setOldName("Материал не выбран");
        setOldCategory("Материал не выбран");
        setOldUnits("Материал не выбран");
    }
    else{
        setId(e.id_);
        setOldName(e.name);
        setOldCategory(e.category_id);
        setOldUnits(e.units);
        setName(e.name);
        setCategory(e.category_id);
        setUnits(e.units);
    } 
  };

  const handleInputChangeCategory = (value) => {
    var e = "";
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].name === value){
        e = categories[i];
      }
    }
    console.log(e);
    setCategoryString(e.name)
    setCategory(e.id_);
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
                        handleInputChangeId(e.target.value)
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
            <div style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <h4 style={{textAlign: "center"}}>
                    Название
                </h4>
                <p style={{textAlign: "center"}}>{oldname}</p>
                <h4 style={{textAlign: "center"}}>
                    Категория
                </h4>
                <p style={{textAlign: "center"}}>{oldcategory}</p>
                <h4 style={{textAlign: "center"}}>
                    Единицы измерения
                </h4>
                <p style={{textAlign: "center"}}>{oldunits}</p>
                <h4>Заполните новые данные ниже</h4>
              </div>
            <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type=""
              placeholder="Введите новое название материала"
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

