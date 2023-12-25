import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css"

export default function EditUser() {

    const jwtToken = localStorage.getItem("jwt");

    const [users, setUsers] = useState([]);

    const [user, setUser] = useState({
        email: "Пользователь не выбран",
        first_name: "Пользователь не выбран",
        last_name: "Пользователь не выбран",
        second_name: "Пользователь не выбран",
        phone: "Пользователь не выбран",
        date_joined: "Пользователь не выбран",
        is_staff: "Пользователь не выбран",
        is_superuser: "Пользователь не выбран",
        last_login: "Пользователь не выбран",
    });

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            var response = await fetch(`${API_SERVER}/user/all`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwtToken}`, 
              }});
            var data = await response.json();
    
            if (response.ok) {
              setUsers(data);
            } else {
              console.error("Ошибка при получении пользователей");
            }
          } catch (error) {
            console.error("Ошибка при отправке запроса на сервер", error);
          }
        };
    
        fetchUsers();
      }, []);

      const handleSubmit = async (event) => {
        event.preventDefault();
      };

      const handleUserChange = (value) => {
        var e = {};
        var flag = false;
        for (var i = 0; i < users.length; i++) {
        if (users[i].email === value){
            e = users[i];
            flag = true;
            }
        }
        if (!flag){
            e.email = "Пользователь не выбран"
            e.first_name = "Пользователь не выбран"
            e.last_name = "Пользователь не выбран"
            e.second_name = "Пользователь не выбран"
            e.phone_number = "Пользователь не выбран"
            e.date_joined = "Пользователь не выбран"
            e.is_staff = "Пользователь не выбран"
            e.is_superuser = "Пользователь не выбран"
            e.last_login = "Пользователь не выбран"
            setUser(e);
        }
        else{
            if (e.second_name === "") e.second_name = "Нет отчества";
            setUser(e);
        }
      }

    const tryBanUser = async () => {
        try {
            const response = await fetch(`${API_SERVER}/user/ban/${user.id_}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`, 
            },
              body: JSON.stringify(bodyData),
            });
    
            if (response.ok) {
              alert("Пользтователь успешно забанен!")
            } else {
              alert("Ошибка при бане пользователя")
            }
          } catch (error) {
            alert("Ошибка при бане пользователя")
            console.error("Произошла ошибка", error);
          }
    }

    const banUser = (event) => {
        event.preventDefault();
        if (user.id_ === undefined){
            alert("Пользователь не выбран")
            return
        }
        else{
            if (user.is_superuser === true){
                alert("Этого пользователя нельзя забанить");
                return;
            }
            tryBanUser();
        }
    }

    const unbanUser = () => {
        
    }

    const deleteUser = () => {
        
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
        <h1>Пользователи</h1>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue",
          width: "50%",
          margin: "auto",
          padding: "15px",
          flexDirection: "column" }}>
        <Form flexDirection="column">
          <br></br>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexDirection: "column" }}>
          <Form.Group className="mb-3" controlId="formUser">
                      <Form.Select
                        aria-label="Default select example" onChange={(e) => handleUserChange(e.target.value)}>
                          <option>
                              Выберите пользователя из списка
                          </option>
                        {users.map((item, ind) => (
                          <option key={ind} value={item.name}>
                            {item.email}
                          </option>
                        ))}
                      </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formInfo">
                      <div>
                        <h4 style={{textAlign: "center"}}>Информация о пользователе</h4>
                        <br></br>
                        <h4 style={{textAlign: "center"}}>Фамилия</h4>
                        <p style={{textAlign: "center"}}>{user.last_name}</p>
                        <h4 style={{textAlign: "center"}}>Имя</h4>
                        <p style={{textAlign: "center"}}>{user.first_name}</p>
                        <h4 style={{textAlign: "center"}}>Отчество</h4>
                        <p style={{textAlign: "center"}}>{user.second_name}</p>
                        <h4 style={{textAlign: "center"}}>Суперпользователь?</h4>
                        <p style={{textAlign: "center"}}>{user.is_superuser}</p>
                        <h4 style={{textAlign: "center"}}>Менеджер?</h4>
                        <p style={{textAlign: "center"}}>{user.is_staff}</p>
                        <h4 style={{textAlign: "center"}}>Телефон</h4>
                        <p style={{textAlign: "center"}}>{user.phone_number}</p>
                        <h4 style={{textAlign: "center"}}>Email</h4>
                        <p style={{textAlign: "center"}}>{user.email}</p>
                        <h4 style={{textAlign: "center"}}>Cоздан</h4>
                        <p style={{textAlign: "center"}}>{user.date_joined}</p>
                        <h4 style={{textAlign: "center"}}>Последний вход в систему</h4>
                        <p style={{textAlign: "center"}}>{user.last_login}</p>
                      </div>
            </Form.Group>
            <Button variant="danger" type="submit" onClick={(event) => banUser(event)} style={{width: "33%", alignSelf: "center"}}>
              Забанить пользователя
            </Button>
            <Button variant="danger" type="submit" onClick={unbanUser} style={{width: "33%", alignSelf: "center"}}>
              Разбанить пользователя
            </Button>   
            <Button variant="danger" type="submit" onClick={deleteUser} style={{width: "33%", alignSelf: "center"}}>
              Удалить пользователя
            </Button>
          </div>
          <br></br>
        </Form>
      </div>
    </>
  );
}