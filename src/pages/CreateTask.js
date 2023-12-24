import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { Redirect, useNavigate } from "react-router-dom";



const CreateTask = () => {

  const [materials, setMaterials] = useState([]);

  const [date, setDate] = useState("");

  const [forms, setForms] = useState([
    {
      resource: "",
      quantity: "",
      measurement: "",
      category: "",
    }
  ]);

  const [comment, setComment] = useState("");

  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/material/all");
        response
          .json()
          .then(data => {
            forms[0].id_ = data[0].id_;
            forms[0].resource = data[0].name;
            forms[0].measurement = data[0].units;
            forms[0].category = data[0].category_id;
            setMaterials(data);
          })
          .catch(error => console.error("Ошибка при получении материалов", error));

      } catch (error) {
        console.error("Ошибка при получении материалов", error);
      }
    };    

    fetchMaterials();
  }, []);

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

  const getResources = () => {
    var resources = [];
    for (var i=0; i < forms.length; i++){
      resources.push(
        {
          id_: forms[i].id_,
          quantity: forms[i].quantity
        }
      );
    }
    return resources;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var flag = true;
    if (address === ""){
        alert("Адрес не указан");
        return;
    }
    if (date === ""){
      alert("Дата не указана");
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
      var resources = getResources();
      const bodyData = {
        resources: resources,
        comment: comment,
        address: address,
        date_selected: date, 
      };
      console.log(bodyData);
      try {
        const response = await fetch("http://127.0.0.1:8000/order/create", {
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
                      <Form.Select aria-label="Default select example"
                      onChange={(e) =>{
                        handleInputChange(index, "resource", e.target.value);
                        var meas = "";
                        var cat ="";
                        var id_ = "";
                        for (var i = 0; i < materials.length; i++){
                          if (materials[i].name == e.target.value){
                            meas = materials[i].units;
                            cat = materials[i].category_id;
                            id_ = materials[i].id_;
                          }
                        }
                        forms[index].measurement = meas;
                        forms[index].category = cat;
                        forms[index].id_ = id_;
                      }}>
                        {
                          materials.map((item, ind) => (
                          <option key={ind} value={item.value}>
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
                          {
                            console.log(forms);
                            handleInputChange(index, "quantity", e.target.value);
                          }
                        }
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={3} lg={3}>
                  <div>
                    {forms[index].measurement}
                  </div>
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
          onClick={(e) =>
            {
              console.log(forms);
              setForms([
                ...forms,
                {
                  resource: materials[0].name,
                  quantity: "",
                  measurement: materials[0].units,
                  category: materials[0].category,
                  date: "",
                },
              ]);
              console.log(forms);
            }
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
            <Form.Label>Дата доставки</Form.Label>
            <br></br>
            <input type="date" onChange={(e) => setDate(e.target.value)}>
            </input>
          </Form.Group>
        </Form>
        <br/>
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
