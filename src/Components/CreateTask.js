import React, { useState } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";



const CreateTask = () => {
  const [forms, setForms] = useState([
    {
      resource: "",
      quantity: "",
    },
  ]);

  const [comment, setComment] = useState("");

  const handleInputChange = (index, fieldName, value) => {
    const updatedForms = [...forms];
    updatedForms[index][fieldName] = value;
    setForms(updatedForms);
  };

  const handleInputChangeCommentary = (value) => {
    setComment(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var flag = true;
    forms.forEach((form, index) => {
        if (forms[index].quantity && forms[index].resource !== ""){
        }
        else{
            flag=false;
            console.log(index, forms[index].resource, forms[index].quantity);
        }
      });
    if (flag){
        console.log(forms);
        console.log(comment);
    }
    else alert("Одна из форм не заполнена полностью");
  };

  const handleDelete = (index) => {
    if (forms.length == 1) return;
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Новая заявка</h1>
        <br />
      </div>
      <Stack gap={2} className="col-md-5 mx-auto">
        {forms.map((form, index) => (
          <div key={index}>
            <div
              style={{
                backgroundColor: "lightblue",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Row>
                <Col md={9} lg={9}>
                  <Form flexDirection="column" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formComment">
                      <Form.Control
                        type="text"
                        placeholder="Ресурс"
                        value={form.resource}
                        onChange={(e) =>
                          handleInputChange(index, "resource", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={3} lg={3}>
                  <Form flexDirection="column" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formComment">
                      <Form.Control
                        type="text"
                        placeholder="Количество"
                        value={form.quantity}
                        onChange={(e) =>
                          handleInputChange(index, "quantity", e.target.value)
                        }
                      />
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
                    type="button"
                    style={{ width: "33%" }}
                    onClick={() => handleDelete(index)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            </div>
            <br />
          </div>
        ))}
        <Button
          variant="primary"
          type="submit"
          onClick={() =>
            setForms([
              ...forms,
              {
                resource: "",
                quantity: "",
              },
            ])
          }
        >
          + Добавить ресурс
        </Button>
        <br />
        <Form flexDirection="column" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formComment">
            <Form.Label>Комментарий к заявке</Form.Label>
            <Form.Control
              type="text"
              placeholder="Комментарий"
              // Пример обработчика изменения введенного текста
              onChange={(e) => handleInputChangeCommentary(e.target.value)}
            />
          </Form.Group>
        </Form>
        <br />
        <Button variant="success" type="submit" onClick={handleSubmit}>
          Подтвердить заявку
        </Button>
      </Stack>
      <br />
      <br />
    </>
  );
};

export default CreateTask;
