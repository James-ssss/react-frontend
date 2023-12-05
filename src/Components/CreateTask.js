import React, { useState } from "react";
import {Navbar, Nav, Button, NavLink, Form, Stack} from 'react-bootstrap';
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
                  <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                  <Form flexDirection="column" flexGrowY={1}>
                    <Form.Group className="mb-3" controlId="formComment">
                      <Form.Control type="text" placeholder="Ресурс" />
                    </Form.Group>
                  </Form>
                </div>,
              ])
            }
          >
            + Добавить ресурс
          </Button>
          <br />
          <Form flexDirection="column" flexGrowY={1}>
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