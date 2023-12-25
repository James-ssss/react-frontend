import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { API_SERVER } from "../serverAddresses";
import "../style.css"

export default function Materials() {



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
        <h1>Материалы</h1>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightblue",
          width: "50%",
          margin: "auto",
          padding: "15px",
          flexDirection: "column" }}>
        <Form flexDirection="column">
          <br></br>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexDirection: "column" }}>
            <Button variant="warning" type="submit" href="/Materials/Edit" style={{width: "33%", alignSelf: "center"}}>
              Редактировать
            </Button>
            <Button variant="success" type="submit" href="/Materials/Create" style={{width: "33%", alignSelf: "center"}}>
              Создать
            </Button>
            <Button variant="danger" type="submit" href="/Materials/Delete" style={{width: "33%", alignSelf: "center"}}>
              Удалить
            </Button>
          </div>
          <br></br>
        </Form>
      </div>
    </>
  );
}
