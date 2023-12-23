import React, { useState, useEffect } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TaskList from "../Components/TaskList";
import "../style.css"

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
      <h1>Заявки</h1>
      <TaskList/>
    </>
  );
}
