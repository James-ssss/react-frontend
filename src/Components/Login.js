import React from "react";
import {Link} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';

export default function Login(){
    return (
      <>
        <Form flexDirection="column">
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Телефон</Form.Label>
            <Form.Control type="phone" placeholder="Введите номер телефона" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите пароль" />
          </Form.Group>
          <Form.Text className="text-muted">
            Не делитесь паролем ни с кем.
          </Form.Text>
          <br></br>
          <br></br>
          <div className="d-flex align-items-center">
            <Button variant="primary" type="submit">
              Войти
            </Button>
          </div>
        </Form>
      </>
    );
    
}