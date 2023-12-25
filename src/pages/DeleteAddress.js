import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css"

export default function DeleteAddress() {

  const jwtToken = localStorage.getItem("jwt");
  const [addressess, setAddressess] = useState([]);
  const [address, setAddress] = useState("Выберите адрес");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`${API_SERVER}/address`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`, 
        },
        });
        const data = await response.json();
        if (response.ok) {
          setAddressess(data);
        } else {
          console.error("Ошибка при получении адресов");
        }
      } catch (error) {
        console.error("Ошибка", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleInputChangeAddress = (value) => {
    setAddress(value);
  };

  const deleteAddress = async (event) => {
    event.preventDefault();
    try {
      var id_="";
      console.log(address)
      for (var i = 0; i < addressess.length; i++){
        var addr = addressess[i].city + " " + addressess[i].street + " " + addressess[i].building + " " + addressess[i].flat
        console.log(addr)
        if (address.trim() === addr.trim()) id_ = addressess[i].id_;
      }
      if (id_=== ""){
        alert("Адрес не найден")
        return
      }
      const response = await fetch(`${API_SERVER}/address/delete?id_=${id_}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, 
      },
      });

      if (response.ok) {
        alert("Адрес удален!");
      } else {
        alert("Ошибка при удалении адреса");
      }
    } 
    catch (error) {
      console.error("Произошла ошибка", error);
    }
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
        <h1>Адрес</h1>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue",
          width: "50%",
          margin: "auto",
          padding: "15px",
          flexDirection: "column" }}>
        <Form flexDirection="column">
          <br></br>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexDirection: "column" }}>
            <h4>Выберите адрес из списка</h4>
            <Form.Select
                        aria-label="Default select example" onChange={(e) => handleInputChangeAddress(e.target.value)}>
                          <option>
                              Выберите адрес из списка
                          </option>
                        {addressess.map((item, ind) => (
                          <option key={ind} value={item.name}>
                            {item.city + " " + item.street + " " + item.building + " " + item.flat}
                          </option>
                        ))}
          </Form.Select>
            <Button variant="danger" type="submit" onClick={deleteAddress} style={{width: "33%", alignSelf: "center"}}>
              Удалить
            </Button>
          </div>
          <br></br>
        </Form>
      </div>
    </>
  );
}
