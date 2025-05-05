import React, { useState, useEffect } from 'react';
import { addFuelRecord } from '../../api/api';
import toast, { Toaster } from 'react-hot-toast';

const AddFuelRecordForm = () => {
  const [fuelData, setFuelData] = useState({
    driver_name: '',
    kilometers_dashboard: '',
    liters_filled: '',
    fleet_number: '',
    registration: '',
    company_name: '',
  });

  const [fuelPrice, setFuelPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const priceFromStorage = parseFloat(localStorage.getItem('fuel_price') || '0');
    setFuelPrice(priceFromStorage);
  }, []);

  const handleChange = (e) => {
    setFuelData({ ...fuelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const liters = parseFloat(fuelData.liters_filled);
    const calculated_cost = parseFloat((liters * fuelPrice).toFixed(2));

    const payload = {
      ...fuelData,
      cost: calculated_cost,
      company_name: fuelData.company_name.trim().toUpperCase(),
      fleet_number: fuelData.fleet_number.trim().toUpperCase(),
    };

    try {
      await addFuelRecord(payload);
      toast.success("Fuel record added successfully!");
      setFuelData({
        driver_name: '',
        kilometers_dashboard: '',
        liters_filled: '',
        fleet_number: '',
        registration: '',
        company_name: '',
      });
    } catch (error) {
      console.error("Error adding fuel record:", error);
      toast.error("Failed to add fuel record.");
    } finally {
      setLoading(false);
    }
  };

  const liters = parseFloat(fuelData.liters_filled || '0');
  const estimatedCost = isNaN(liters) ? 0 : parseFloat((liters * fuelPrice).toFixed(2));

  return (
    <>
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-700 text-center">Add Fuel Record</h2>

        <input name="driver_name" value={fuelData.driver_name} onChange={handleChange} placeholder="Driver Name" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="kilometers_dashboard" type="number" value={fuelData.kilometers_dashboard} onChange={handleChange} placeholder="Odometer Reading (km)" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="liters_filled" type="number" value={fuelData.liters_filled} onChange={handleChange} placeholder="Liters Filled" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        
        <p className="text-sm text-gray-700 font-medium px-1">
          Estimated Cost: <span className="text-blue-600 font-semibold">R {estimatedCost.toFixed(2)}</span>
        </p>

        <input name="fleet_number" value={fuelData.fleet_number} onChange={handleChange} placeholder="Fleet Number" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="registration" value={fuelData.registration} onChange={handleChange} placeholder="Registration" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="company_name" value={fuelData.company_name} onChange={handleChange} placeholder="Company Name" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-md font-semibold transition duration-150 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          )}
          {loading ? 'Submitting...' : 'Add Fuel Record'}
        </button>
      </form>
    </>
  );
};

export default AddFuelRecordForm;
