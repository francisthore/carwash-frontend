import React, { useState } from 'react';
import { addWash } from '../../api/api';
import toast, { Toaster } from 'react-hot-toast';

const AddWashForm = () => {
  const [washData, setWashData] = useState({
    registration_number: '',
    fleet_number: '',
    driver_name: '',
    wash_type: '',
    wash_cost: '',
    date: '',
    company_name: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setWashData({ ...washData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...washData,
      company_name: washData.company_name.trim().toUpperCase(),
      fleet_number: washData.fleet_number.trim().toUpperCase(),
    };

    try {
      await addWash(payload);
      toast.success('✅ Wash record added successfully!');
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
      console.error('Error adding wash:', error);
      toast.error('❌ Failed to add wash record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-700 text-center">Add Wash Record</h2>

        <input
          name="registration_number"
          value={washData.registration_number}
          onChange={handleChange}
          placeholder="Registration Number"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="fleet_number"
          value={washData.fleet_number}
          onChange={handleChange}
          placeholder="Fleet Number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="driver_name"
          value={washData.driver_name}
          onChange={handleChange}
          placeholder="Driver Name"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="wash_type"
          value={washData.wash_type}
          onChange={handleChange}
          placeholder="Wash Type"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="wash_cost"
          type="number"
          value={washData.wash_cost}
          onChange={handleChange}
          placeholder="Wash Cost"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="company_name"
          value={washData.company_name}
          onChange={handleChange}
          placeholder="Company Name"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-md font-semibold transition duration-150 ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          )}
          {loading ? 'Submitting...' : 'Add Wash'}
        </button>
      </form>
    </>
  );
};

export default AddWashForm;
