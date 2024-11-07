import React, { useEffect, useState } from "react";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { registerUser, fetchUsers, updateUserRole } from "../api/api";


const UserManagement = () => {
    const [showAddUserModal, setShowAddUserModal] = useState(false);
	const [showManageUsersModal, setShowManageUsersModal] = useState(false);
	const [username, setUsername ] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const usersData = await fetchUsers();
            setUsers(usersData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      const handleRoleChange = async (userId, newRole) => {
        try {
          await updateUserRole(userId, newRole);
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId ? { ...user, role: newRole } : user
            )
          );
        } catch (error) {
          console.error('Error updating role:', error);
        }
      };

	const handleAddUserSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setSuccess("");

			await registerUser(username, password);
			setSuccess("User added successfully!");
      setUsername("");
      setPassword("");
		} catch (err) {
			setError(err.message || "Failed to add user.")
		}
	};

	const handleAddUser = () => setShowAddUserModal(true);
	const handleManageUsers = () => setShowManageUsersModal(true);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
      <h2 className="text-xl font-semibold mb-4 text-center">User Management</h2>    
      {/* Icon boxes */}
      <div className="flex space-x-4">
        <div
          onClick={handleAddUser}
          className="flex flex-col items-center flex-1 cursor-pointer p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-200"
        >
          <FaUserPlus size={32} className="text-blue-500" />
          <p className="mt-2 text-sm font-semibold text-blue-600 text-center">Add User</p>
        </div>

        <div
          onClick={handleManageUsers}
          className="flex flex-col items-center flex-1 cursor-pointer p-4 bg-green-100 rounded-lg hover:bg-green-200 transition duration-200"
        >
          <FaUsers size={32} className="text-green-500" />
          <p className="mt-2 text-sm font-semibold text-green-600 text-center">Manage Users</p>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-2 ">
            <h3 className="text-lg font-semibold mb-4 text-center">Add New User</h3>
						{error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}
            <form onSubmit={handleAddUserSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-300 rounded"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Users Modal */}
      {showManageUsersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-screen mx-1 overflow-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">Current Users</h3>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Role</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-gray-100 border rounded p-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="py-2 px-4 bg-gray-300 rounded"
                onClick={() => setShowManageUsersModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
};

export default UserManagement;
