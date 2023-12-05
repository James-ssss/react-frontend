import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  NavLink,
  Form,
  Stack,
  Col,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import NaviBar from "./Navibar";

const order = {};

export default function CreateTask() {
  const [forms, setForms] = useState([
    <div style={{display: "flex", justifyContent: "center"}}>
      <h1>Новая заявка</h1>
      <br />
    </div>,
  ]);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Ваша логика обработки отправки формы
  };

  return (
    <>
      <Stack gap={2} className="col-md-5 mx-auto">
        {forms}
        <Button
          variant="primary"
          type="submit"
          onClick={() =>
            setForms([
              ...forms,
              <div>
                <div style={{ backgroundColor: "lightblue", padding: "10px", borderRadius: "10px" }}>
                  <Row>
                    <Col md={9} lg={9}>
                      <Form
                        flexDirection="column"
                        flexGrowY={1}
                        Form
                        onSubmit={handleSubmit}
                      >
                        <Form.Group className="mb-3" controlId="formComment">
                          <Form.Control type="text" placeholder="Ресурс" />
                        </Form.Group>
                      </Form>
                    </Col>
                    <Col md={3} lg={3}>
                      <Form
                        flexDirection="column"
                        flexGrowY={1}
                        Form
                        onSubmit={handleSubmit}
                      >
                        <Form.Group className="mb-3" controlId="formComment">
                          <Form.Control type="text" placeholder="Количество" />
                        </Form.Group>
                      </Form>
                    </Col>
                    <Col
                      md={12}
                      lg={12}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Button
                        variant="danger"
                        type="submit"
                        style={{ width: "33%" }}
                      >
                        Удалить
                      </Button>
                    </Col>
                  </Row>
                </div>
                <br />
              </div>,
            ])
          }
        >
          + Добавить ресурс
        </Button>
        <br />
        <Form flexDirection="column" flexGrowY={1} Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formComment">
            <Form.Label>Комментарий к заявке</Form.Label>
            <Form.Control type="text" placeholder="Комментарий" />
          </Form.Group>
        </Form>
        <br />
        <Button variant="success" type="submit">
          Подтвердить заявку
        </Button>
      </Stack>
      <br />
      <br />
    </>
  );
}
