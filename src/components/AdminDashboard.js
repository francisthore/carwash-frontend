import React from 'react';
import UserManagement from "./UserManagement";


const AdminDashboard = () => {
	

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Row 1: User Management and Company Management */}
        <UserManagement />

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Company Management</h2>
          <p className="text-gray-600 mb-4">Add, edit, or delete companies within the system.</p>
          <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Manage Companies</button>
        </div>

        {/* Row 2: Car Wash Records and Fuel Records */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Car Wash Records</h2>
          <p className="text-gray-600 mb-4">View, add, edit, or delete car wash records.</p>
          <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Manage Wash Records</button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Fuel Records</h2>
          <p className="text-gray-600 mb-4">View, add, edit, or delete fuel records.</p>
          <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Manage Fuel Records</button>
        </div>

        {/* Row 3: Reporting/Export and Audit Log */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Reporting & Export</h2>
          <p className="text-gray-600 mb-4">Export data, view analytics, and generate reports.</p>
          <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Generate Report</button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Audit Log</h2>
          <p className="text-gray-600 mb-4">View the audit log to track user actions and system changes.</p>
          <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">View Audit Log</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
