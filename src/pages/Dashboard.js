import React, { useEffect, useState } from 'react';
import { getWashes, getCompanies, exportWashes } from '../api/api';

const Dashboard = () => {
  const [washes, setWashes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companiesCount, setCompaniesCount] = useState(0);
  const [totalWashes, setTotalWashes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const washesData = await getWashes();
        const sortedWashes = washesData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setWashes(sortedWashes);
        setTotalWashes(sortedWashes.length);

        const companiesData = await getCompanies();
        setCompanies(companiesData);
        setCompaniesCount(companiesData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleExport = async (e) => {
    e.preventDefault();
    if (!selectedCompanyId || !startDate || !endDate) {
      alert("Please select a company, start date, and end date");
      return;
    }
    try {
      await exportWashes(selectedCompanyId, startDate, endDate);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Failed to export data.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedWashes = washes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="sm:p-1 lg:p-6">
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Data Export Form */}
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Export Excel Data</h2>
          <form onSubmit={handleExport} className="space-y-4">
            <select
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              value={selectedCompanyId}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start Date"
                required
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="End Date"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600">
              Export
            </button>
          </form>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-500 h-20 text-white p-4 rounded shadow text-center">
            <p className="text-2xl font-bold">{totalWashes}</p>
            <p>Total Washes</p>
          </div>
          <div className="bg-green-500 h-20 text-white p-4 rounded shadow text-center">
            <p className="text-2xl font-bold">{companiesCount}</p>
            <p>Total Companies</p>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="bg-white rounded shadow p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Washes</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Company</th>
              <th className="p-3">Fleet Number</th>
              <th className="p-3">Driver Name</th>
              <th className="p-3">Wash Type</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedWashes.map((wash, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{wash.company ? wash.company.name : 'N/A'}</td>
                <td className="p-3">{wash.fleet_number}</td>
                <td className="p-3">{wash.driver_name}</td>
                <td className="p-3">{wash.wash_type}</td>
                <td className="p-3">{new Date(wash.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.ceil(totalWashes / itemsPerPage) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
