import React from "react";
import { Table } from "react-bootstrap";

const TaskList = () => {
  // Пример данных заявок
  const applications = [
    {
      id: 1,
      date: "01.09.2021",
      deliveryAddress: "ул. Пушкина, д.10",
      sender: "Иванов Иван",
      elapsedTime: "2 часа",
      status: "В пути",
    },
    {
      id: 2,
      date: "02.09.2021",
      deliveryAddress: "ул. Лермонтова, д.5",
      sender: "Петров Петр",
      elapsedTime: "1 день",
      status: "Доставлено",
    },
    // ...другие заявки
  ];

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Номер</th>
          <th>Дата отправки</th>
          <th>Адрес доставки</th>
          <th>Отправитель</th>
          <th>Время прошло</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr key={application.id}>
            <td>{application.id}</td>
            <td>{application.date}</td>
            <td>{application.deliveryAddress}</td>
            <td>{application.sender}</td>
            <td>{application.elapsedTime}</td>
            <td>{application.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default TaskList;
