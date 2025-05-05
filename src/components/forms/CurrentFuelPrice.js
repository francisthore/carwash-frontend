import React, { useEffect, useState } from 'react';
import { getLatestFuelPrice, setFuelPrice } from '../../api/api';
import { toast } from 'react-hot-toast';

const CurrentFuelPrice = () => {
  const [price, setPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to load from localStorage first
    const stored = localStorage.getItem('fuel_price');
    if (stored) {
      setPrice(parseFloat(stored));
    }


    const fetchPrice = async () => {
      try {
        const data = await getLatestFuelPrice();
        if (data) {
          setPrice(data);
          localStorage.setItem('fuel_price', data);
        }
      } catch (error) {
        toast.error('Failed to fetch current fuel price.');
      }
    };

    fetchPrice();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPrice || isNaN(newPrice)) {
      toast.error('Please enter a valid price.');
      return;
    }

    setLoading(true);
    try {
      const parsedPrice = parseFloat(newPrice);
      await setFuelPrice({ price: parseFloat(newPrice) });
      setPrice(parsedPrice);
      setNewPrice('');
      localStorage.setItem('fuel_price', parsedPrice); 
      toast.success('Fuel price updated!');
    } catch (error) {
      toast.error('Failed to update price.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white md:h-40 p-4 rounded shadow flex flex-col justify-center items-center text-center space-y-2">
      <h2 className="text-md font-bold">Diesel Price</h2>
      <p className="text-xl font-semibold text-blue-600">R {price !== '' ? price : '—'}</p>

      <form onSubmit={handleSubmit} className="w-full space-y-2 px-2">
        <input
          type="number"
          step="0.01"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="Set new price"
          className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-1 rounded-md font-semibold text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Price'}
        </button>
      </form>
    </div>
  );
};

export default CurrentFuelPrice;
