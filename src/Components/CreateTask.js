import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { Redirect, useNavigate } from "react-router-dom";



const CreateTask = () => {

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/material/all");
        response
          .json()
          .then(data => setMaterials(data))
          .catch(error => console.error("Ошибка при получении материалов", error));
      } catch (error) {
        console.error("Ошибка при получении материалов", error);
      }
    };    

    fetchMaterials();
  }, []);

  const navigate = useNavigate();

  const [forms, setForms] = useState([
    {
      resource: "",
      quantity: "",
    },
  ]);

  const [materials, setMaterials] = useState([]);

  const [comment, setComment] = useState("");

  const [address, setAddress] = useState("");

  const handleInputChange = (index, fieldName, value) => {
    const updatedForms = [...forms];
    updatedForms[index][fieldName] = value;
    setForms(updatedForms);
  };

  const handleInputChangeCommentary = (value) => {
    setComment(value);
  };

  const handleInputChangeAddress = (value) => {
    setAddress(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var flag = true;
    if (address === ""){
        alert("Адрес не указан");
        return;
    }
    forms.forEach((form, index) => {
        if (forms[index].quantity && forms[index].resource !== ""){
        }
        else{
            flag=false;
            console.log(index, forms[index].resource, forms[index].quantity);
        }
      });
    if (flag){
      const bodyData = {
        forms: forms,
        user_id: 1,
        address_id: 1,
        comment: comment,
        address: address,
      };
      console.log(bodyData);
      try {
        const response = await fetch("http://127.0.0.1:5000/order/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
        },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          console.log("Заявка успешно создана!");
        } else {
          console.error("Ошибка при создании заявки");
        }
      } 
      catch (error) {
        console.error("Произошла ошибка", error);
      }
    }
    else alert("Одна из форм не заполнена полностью");
  };

  const handleDelete = (index) => {
    if (forms.length == 1) return;
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
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
                <Row>
                <Col md={7} lg={7}>
                  <Form flexDirection="column" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formComment">
                    <Form.Select aria-label="Default select example">
                      {materials.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                  </Form.Select>
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
                </Row>
                <Row>
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
        <Form flexDirection="column" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formComment">
            <Form.Label>Адрес доставки</Form.Label>
            <Form.Control
              type="text"
              placeholder="Адрес"
              // Пример обработчика изменения введенного текста
              onChange={(e) => handleInputChangeAddress(e.target.value)}
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
