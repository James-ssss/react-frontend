// OrderDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://31.129.110.13:8000/order/${orderId}`);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p>ID: {orderDetails.id_}</p>
      <p>User: {`${orderDetails.user_first_name} ${orderDetails.user_last_name}`}</p>
      <p>Address: {orderDetails.address}</p>
      <p>Comment: {orderDetails.comment}</p>
      <p>Status: {orderDetails.status_id}</p>
      <p>Date Creation: {orderDetails.date_creation}</p>
      <p>Date Selected: {orderDetails.date_selected}</p>
      <p>Date Actual: {orderDetails.date_actual}</p>

      <h3>Materials:</h3>
      <ul>
        {orderDetails.materials.map((material) => (
          <li key={material.material_id}>
            {`${material.material} - ${material.count} ${material.units}, Category: ${material.category}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
