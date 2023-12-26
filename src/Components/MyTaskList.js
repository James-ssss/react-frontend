import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";  // Import useNavigate instead of useHistory
import { API_SERVER } from "../serverAddresses";

const MyTasksList = () => {
  const [applications, setApplications] = useState([]);
  const jwtToken = localStorage.getItem("jwt");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_SERVER}/order`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, [jwtToken]);

  if (!Array.isArray(applications)) {
    console.error("Полученные данные не являются массивом:", applications);
    return null;
  }

  const handleRowClick = (orderId) => {
    // Navigate to the detailed view for the selected order
    navigate(`/My_Orders/${orderId}`);  // Use navigate instead of history.push
  };

  if (localStorage.getItem("jwt") === null || role === "USER")return (
    <>
    <div style={{
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "10px",
            }}>Доступ запрещен</div>
  </>
  );

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Номер</th>
          <th>Дата отправки</th>
          <th>Адрес доставки</th>
          <th>Комментарий</th>
          <th>Времени прошло</th>
          <th>Статус</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr key={application.id_}>
            <td>{application.id_}</td>
            <td>{application.date_creation}</td>
            <td>{application.address}</td>
            <td>{application.comment}</td>
            <td>{calculateElapsedTime(application.date_creation)}</td>
            <td>{getStatusText(application.status_id)}</td>
            <td>
              <Button
                variant="primary"
                onClick={() => handleRowClick(application.id_)}
              >
                Подробнее
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const calculateElapsedTime = (creationDate) => {
  const currentDate = new Date();
  const diffInMilliseconds = currentDate - new Date(creationDate);
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);

  return `${hours} часов ${minutes} минут`;
};

const getStatusText = (statusId) => {
  switch (statusId) {
    case 1:
      return "ПРИНЯТО";
    case 2:
      return "ВЫПОЛНЕНО";
    case 3:
      return "ПРОСРОЧЕНО";
    default:
      return "Неизвестный статус";
  }
};

export default MyTasksList;
