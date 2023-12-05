import React, { useState } from "react";
import {Navbar, Nav, Button, NavLink, Form, Stack, Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import NaviBar from './Navibar';

const order = {
    
};

export default function CreateTask(){
    const [forms, setForms] = useState([
      <div>
          <h1>Новая заявка</h1>
          <br/>
        
        </div>
    ]);

    const addResource = (event) => {
        event.preventDefault(); // предотвращаем стандартное поведение формы
        setForms([
          ...forms,
          <div key={forms.length}>
            <Row>
              <Col sm={8}>
                <Form flexDirection="column" flexGrowY={1}>
                  <Form.Group className="mb-3" controlId={`resource-${forms.length}`}>
                    <Form.Control type="text" placeholder="Ресурс" />
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={4}>
                <Form flexDirection="column" flexGrowY={1}>
                  <Form.Group className="mb-3" controlId={`quantity-${forms.length}`}>
                    <Form.Control type="text" placeholder="Количество" />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>,
        ]);
      };
    
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
                  <Row>
                  <Col sm={8}>
                    <Form flexDirection="column" flexGrowY={1} Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formComment">
                        <Form.Control type="text" placeholder="Ресурс" />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col sm={4}>
                    <Form flexDirection="column" flexGrowY={1} Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formComment">
                        <Form.Control type="text" placeholder="Количество" />
                      </Form.Group>
                    </Form>
                  </Col>
                  </Row>
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
      </>
    );
    
}