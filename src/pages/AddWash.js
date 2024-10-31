import React, { useState } from 'react';
import { addWash } from '../api/api';

const AddWash = () => {
  const [washData, setWashData] = useState({
    registration_number: '',
    fleet_number: '',
    driver_name: '',
    wash_type: '',
    wash_cost: '',
    date: '',
    company_name: '',
  });

  const handleChange = (e) => {
    setWashData({ ...washData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addWash(washData);
      alert("Wash added successfully!");
      setWashData({
        registration_number: '',
        fleet_number: '',
        driver_name: '',
        wash_type: '',
        wash_cost: '',
        date: '',
        company_name: '',
      });
    } catch (error) {
      console.error("Error adding wash:", error);
      alert("Failed to add wash.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Wash Record</h2>

        <input
          name="registration_number"
          value={washData.registration_number}
          onChange={handleChange}
          placeholder="Registration Number"
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="fleet_number"
          value={washData.fleet_number}
          onChange={handleChange}
          placeholder="Fleet Number"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="driver_name"
          value={washData.driver_name}
          onChange={handleChange}
          placeholder="Driver Name"
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="wash_type"
          value={washData.wash_type}
          onChange={handleChange}
          placeholder="Wash Type"
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="wash_cost"
          type="number"
          value={washData.wash_cost}
          onChange={handleChange}
          placeholder="Wash Cost"
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="company_name"
          value={washData.company_name}
          onChange={handleChange}
          placeholder="Company Name"
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600">
          Add Wash
        </button>
      </form>
    </div>
  );
};

export default AddWash;
