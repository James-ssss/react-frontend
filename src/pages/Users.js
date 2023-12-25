import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css"

export default function Users() {



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
            <Button variant="success" type="submit" href="/Users/Create" style={{width: "33%", alignSelf: "center"}}>
              Создать пользователя
            </Button>
            <Button variant="success" type="submit" href="/Users/Edit" style={{width: "33%", alignSelf: "center"}}>
              Изменить права пользователя
            </Button>
          </div>
          <br></br>
        </Form>
      </div>
    </>
  );
}
