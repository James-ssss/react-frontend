import React, { useState, useEffect } from "react";
import { Button, Form, Stack, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_SERVER } from "../serverAddresses";

const CreateTask = () => {
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [forms, setForms] = useState([
    {
      resource: "",
      quantity: "",
      measurement: "",
    },
  ]);
  const [comment, setComment] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`${API_SERVER}/material/all`);
        const data = await response.json();

        if (response.ok) {
          setMaterials(data);
          setForms((prevForms) => {
            const updatedForms = [...prevForms];
            updatedForms[0].resource = data[0].name;
            updatedForms[0].measurement = data[0].units;
            return updatedForms;
          });
        } else {
          console.error("Ошибка при получении материалов");
        }
      } catch (error) {
        console.error("Ошибка при получении материалов", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleInputChange = (index, fieldName, value) => {
    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[index][fieldName] = value;
      return updatedForms;
    });
  };

  const handleInputChangeCommentary = (value) => {
    setComment(value);
  };

  const handleInputChangeAddress = (value) => {
    setAddress(value);
  };

  const getResources = () => {
    var resources = [];
    for (var i=0; i < forms.length; i++){
      resources.push(
        {
          material_id: forms[i].id_,
          count: forms[i].quantity
        }
      );
    }
    return resources;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (address === "") {
      alert("Адрес не указан");
      return;
    }

    const isFormsValid = forms.every(
      (form) => form.quantity.trim() !== "" && form.resource.trim() !== ""
    );

    if (!isFormsValid) {
      alert("Одна из форм не заполнена полностью");
      return;
    }

    var resources = getResources();
      const bodyData = {
        resources: resources,
        comment: comment,
        address: address,
        date_selected: date, 
      };

      console.log(bodyData)
      console.log(forms)
      try {
      const response = await fetch(`${API_SERVER}/order/create`, {
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
    } catch (error) {
      console.error("Произошла ошибка", error);
    }
  };

  const handleDelete = (index) => {
    if (forms.length === 1) return;
    setForms((prevForms) => prevForms.filter((_, i) => i !== index));
  };

  if (!localStorage.getItem("jwt")) {
    return (
      <>
        <div
          style={{
            backgroundColor: "red",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          Доступ запрещен
        </div>
      </>
    );
  }

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
                <Col md={7} lg={7}>
                  <Form.Group className="mb-3" controlId="formComment">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => {
                        handleInputChange(
                          index,
                          "resource",
                          e.target.value
                        );
                        const measurement = materials.find(
                          (item) => item.name === e.target.value
                        )?.units;
                        setForms((prevForms) => {
                          const updatedForms = [...prevForms];
                          updatedForms[index].measurement = measurement;
                          return updatedForms;
                        });
                      }}
                    >
                      {materials.map((item, ind) => (
                        <option key={ind} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3} lg={3}>
                  <Form.Group className="mb-3" controlId="formComment">
                    <Form.Control
                      type="text"
                      placeholder="Количество"
                      value={form.quantity}
                      onChange={(e) =>
                        {handleInputChange(index, "quantity", e.target.value)
                        var id_ = ""
                        for (var i= 0; i < materials.length; i++)
                        {
                          if (materials[i].name === form.resource){
                            id_ = materials[i].id_
                          }
                        }
                        handleInputChange(index, "id_", id_)
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} lg={2}>
                  <div>{form.measurement}</div>
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
            </div>
            <br />
          </div>
        ))}
        <Button
          variant="primary"
          type="submit"
          onClick={() =>
            setForms((prevForms) => [
              ...prevForms,
              {
                resource: materials[0]?.name,
                quantity: "",
                measurement: materials[0]?.units,
              },
            ])
          }
        >
          + Добавить ресурс
        </Button>
        <br />
        <Form.Group className="mb-3" controlId="formComment">
          <Form.Label>Комментарий к заявке</Form.Label>
          <Form.Control
            type="text"
            placeholder="Комментарий"
            onChange={(e) => handleInputChangeCommentary(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formComment">
          <Form.Label>Адрес доставки</Form.Label>
          <Form.Control
            type="text"
            placeholder="Адрес"
            onChange={(e) => handleInputChangeAddress(e.target.value)}
          />
        </Form.Group>
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
