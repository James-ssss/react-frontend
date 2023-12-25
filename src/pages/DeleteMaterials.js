import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css"

export default function DeleteMaterials() {

    const jwtToken = localStorage.getItem("jwt");

    const [materials, setMaterials] = useState([]);

    const [material_id, setMaterialId] = useState([]);
    const [name, setName] = useState("Материал не выбран");
    const [category, setCategory] = useState("Материал не выбран");
    const [units, setUnits] = useState("Материал не выбран");
  
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
        } catch (error) {
          console.error("Ошибка при получении материалов или категорий", error);
        }
      };
  
      fetchMaterials();
    }, []);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      sendRequest()
    }
  
    const sendRequest = async () => {
      try {
          const response = await fetch(`${API_SERVER}/material/${material_id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`, 
            },
            body: JSON.stringify({
              material_id: material_id,
            }),
          });
  
          if (response.ok) {
            alert("Материал был удален")
          } else {
              alert("Материал не был удален, обратитесь к администратору")
          }
        } catch (error) {
          console.error("Error during material deleting", error);
          alert("Произошла ошибка во время отправки запроса");
        }
    };

  
    const handleInputChange = (value) => {
        var e = {};
        var flag = false;
        for (var i = 0; i < materials.length; i++) {
            if (materials[i].name === value){
                e = materials[i];
                flag = true;
            }
        }   
        if (!flag){
            e.name = "Материал не выбран"
            e.category_id = "Материал не выбран"
            e.units = "Материал не выбран"
        }
        setMaterialId(e.id_);
        setName(e.name);
        setCategory(e.category_id); //category_id возвращает строку с названием, а не id категории, лол
        setUnits(e.units);
    };
  

  
  
    if (localStorage.getItem('jwt') === null || localStorage.getItem('role') === "USER") return (
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
          <h1>Удаление материалов</h1>
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
                          handleInputChange(e.target.value)
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
                <p style={{textAlign: "center"}}>{name}</p>
                <h4 style={{textAlign: "center"}}>
                    Категория
                </h4>
                <p style={{textAlign: "center"}}>{category}</p>
                <h4 style={{textAlign: "center"}}>
                    Единицы измерения
                </h4>
                <p style={{textAlign: "center"}}>{units}</p>
              </div>
              
              <Button variant="danger" type="submit" onSubmit={handleSubmit}>
                Удалить
              </Button>
            </div>
            <br></br>
          </Form>
        </div>
      </>
    );
}
