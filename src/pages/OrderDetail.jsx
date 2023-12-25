import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_SERVER } from "../serverAddresses";
import { Card, ListGroup, Button } from "react-bootstrap";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const jwtToken = localStorage.getItem("jwt");

  const handleCompleteOrder = async () => {
    try {
      const response = await fetch(`${API_SERVER}/order/update/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          status_id: 2,
        }),
      });

      if (response.ok) {
        console.log("Статус заказа обновлен успешно!");
        // Fetch updated order details after status change
        fetchOrderDetails();
      } else {
        console.error("Ошибка при обновлении статуса заказа");
      }
    } catch (error) {
      console.error("Произошла ошибка при обновлении статуса заказа:", error);
    }
  };
  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${API_SERVER}/order/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      setOrderDetails(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  useEffect(() => {
    
    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ width: "30rem" }}>
      <Card.Body>
        <Card.Title>Детали заказа</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Заявка номер: {orderDetails.id_}</ListGroup.Item>
          <ListGroup.Item>
            Заказчик: {`${orderDetails.user_first_name} ${orderDetails.user_last_name}`}
          </ListGroup.Item>
          <ListGroup.Item>Адрес: {orderDetails.address}</ListGroup.Item>
          <ListGroup.Item>Комментарий: {orderDetails.comment}</ListGroup.Item>
          <ListGroup.Item>
            Статус: {getStatusText(orderDetails.status_id)}
          </ListGroup.Item>
          <ListGroup.Item>
            Дата создания: {orderDetails.date_creation}
          </ListGroup.Item>
          <ListGroup.Item>
            Дата, когда нужно привезти: {orderDetails.date_selected}
          </ListGroup.Item>
          <ListGroup.Item>
            Дата выполнения: {orderDetails.date_actual}
          </ListGroup.Item>
        </ListGroup>
        <Card.Text>
          <h3>Состав заказа:</h3>
          <ul>
            {orderDetails.materials.map((material) => (
              <li key={material.material_id}>
                {`${material.material} - ${material.count} ${material.units}, Category: ${material.category}`}
              </li>
            ))}
          </ul>
        </Card.Text>
        <Button variant="success" onClick={handleCompleteOrder}>
                Пометить как выполненный
              </Button>
      </Card.Body>
    </Card>
  );
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

export default OrderDetail;
