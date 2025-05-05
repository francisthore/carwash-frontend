import React, { useState } from 'react';
import { exportWashes, exportFuelRecords } from '../../api/api';
import { toast } from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';

const ExportForm = ({ companies }) => {
  const [selectedCompany, setSelectedCompany] = useState({ id: '', name: '' });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exportType, setExportType] = useState('wash');
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async (e) => {
    e.preventDefault();

    if (!selectedCompany.id || !startDate || !endDate) {
      toast.error('Please select a company, start date, and end date');
      return;
    }

    setIsLoading(true);
    try {
      if (exportType === 'wash') {
        await exportWashes(selectedCompany.id, startDate, endDate, selectedCompany.name);
      } else {
        await exportFuelRecords(selectedCompany.id, startDate, endDate, selectedCompany.name);
      }
      toast.success('Export started!');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Export Excel Data</h2>
      <form onSubmit={handleExport} className="space-y-4">
        <select
          value={exportType}
          onChange={(e) => setExportType(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="wash">Washes</option>
          <option value="fuel">Fuel Records</option>
        </select>

        <select
          onChange={(e) => {
            const selected = companies.find(c => c.id === parseInt(e.target.value));
            setSelectedCompany({ id: selected?.id || '', name: selected?.name || '' });
          }}
          value={selectedCompany.id}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap lg:space-x-4 lg:flex-nowrap space-y-4 lg:space-y-0">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isLoading && <ImSpinner2 className="animate-spin text-white" />}
          {isLoading ? 'Exporting...' : 'Export'}
        </button>
      </form>
    </div>
  );
};

export default ExportForm;
