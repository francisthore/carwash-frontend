import React, { useEffect, useState } from 'react';
import { getWashes, getCompanies } from '../api/api';
import ExportForm from '../components/forms/ExportForm';
import CurrentFuelPrice from '../components/forms/CurrentFuelPrice';
import { MdLocalCarWash } from 'react-icons/md';
import { FaHouseFlag } from 'react-icons/fa6';

const Dashboard = () => {
  const [washes, setWashes] = useState([]);
  const [companies, setCompanies] = useState([]);
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
      <div className="grid grid-cols-1 md:grid-cols-2 p-5  gap-6 mb-6">
        <ExportForm companies={companies} />

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-500 md:h-40 text-white p-4 rounded shadow flex flex-col space-y-4 items-center text-center">
            <MdLocalCarWash size={30} />
            <p className="text-2xl font-bold">{totalWashes}</p>
            <p>Total Washes</p>
          </div>
          <div className="bg-green-500 md:h-40 text-white p-4 rounded shadow flex flex-col space-y-4 items-center text-center">
            <FaHouseFlag size={30} />
            <p className="text-2xl font-bold">{companiesCount}</p>
            <p>Total Companies</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <CurrentFuelPrice />
          </div>
        </div>
      </div>





      {/* Second Row */}
      <div className="bg-white rounded shadow p-6 overflow-x-auto mt-6">
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
              className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
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
