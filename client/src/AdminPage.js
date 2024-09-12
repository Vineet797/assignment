import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('/api/maintenance-requests')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error(err));
  }, []);

  const closeRequest = async (id) => {
    try {
      await fetch(`/api/maintenance-requests/${id}/close`, { method: 'PUT' });
      setRequests(requests.filter(request => request.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Open Maintenance Requests</h1>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            {request.summary} - {request.serviceType}
            <button onClick={() => closeRequest(request.id)}>Close</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
