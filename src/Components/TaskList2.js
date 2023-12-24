import React, { useState, useEffect } from "react";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    // Получение списка заявок из backend (предположим, что получаем в формате JSON)
    fetch("backend-url")
      .then((response) => response.json())
      .then((data) => {
        setApplications(data.applications); // Массив заявок из бэкенда
        setStatusOptions(data.statusOptions); // Массив доступных статусов из бэкенда
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
      });
  }, []);

  const handleStatusChange = (event, applicationId) => {
    const updatedApplications = applications.map((application) => {
      if (application.id === applicationId) {
        return { ...application, status: event.target.value };
      }
      return application;
    });
    setApplications(updatedApplications);
  };

  return (
    <div>
      {applications.map((application) => (
        <div key={application.id}>
          <h2>{application.name}</h2>
          <p>Status:</p>
          <select
            value={application.status}
            onChange={(event) => handleStatusChange(event, application.id)}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default ApplicationList;
