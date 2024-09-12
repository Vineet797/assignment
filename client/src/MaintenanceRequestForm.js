import React, { useState } from 'react';

const MaintenanceRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    unitNumber: '',
    serviceType: '',
    summary: '',
    details: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/maintenance-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Request submitted successfully');
      } else {
        alert('Failed to submit request');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="unitNumber" placeholder="Unit Number" onChange={handleChange} />
      <input name="serviceType" placeholder="Service Type" onChange={handleChange} />
      <input name="summary" placeholder="Summary" onChange={handleChange} />
      <textarea name="details" placeholder="Details (Optional)" onChange={handleChange}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MaintenanceRequestForm;
