import React, { useState, useEffect } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/orders", {
          method: "GET",
        });

        if (!response.ok) {
          console.error("Ошибка при получении данных");
          return;
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    };

    fetchTasks();
  }, []);

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
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "lightblue",
          width: "50%",
          margin: "auto",
          padding: "15px",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Все заявки</h1>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Нажмите, чтобы {open ? "скрыть" : "показать"}
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
            {/* Ваш контент, который будет развернут или свернут */}
            {tasks.map((task, index) => (
              <div key={index}>
                <p>Name: {task.name}</p>
                <p>Date: {task.date}</p>
                <ul>
                  {task.resources.map((resource, resourceIndex) => (
                    <li key={resourceIndex}>Resource: {resource}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    </>
  );
}
