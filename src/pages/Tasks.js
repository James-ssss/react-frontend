import React, { useState, useEffect } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TaskList from "../Components/TaskList";
import "../style.css"
import ApplicationList from "../Components/TaskList2";

export default function Tasks() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();


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
