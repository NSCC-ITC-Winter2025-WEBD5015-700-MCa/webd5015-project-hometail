"use client";

import { useEffect, useState } from "react";
import { Loader } from "@/utils/loader";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    isSubscribed: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(
          users.map((user) => (user.id === userId ? updatedUser : user))
        );
        setEditingUserId(null);
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user.id);
    setEditData({
      name: user.name,
      email: user.email,
      isSubscribed: user.isSubscribed,
    });
  };

  return (
    <div className="overflow-x-auto min-h-screen px-5">
      <h1 className="text-4xl pb-5">Users</h1>
      {loading ? (
        <Loader />
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                User ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Subscribed
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Customer ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Price ID
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>

                {/* Name Field */}
                <td className="border border-gray-300 px-4 py-2">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      className="border p-1 rounded"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>

                {/* Email Field */}
                <td className="border border-gray-300 px-4 py-2">
                  {editingUserId === user.id ? (
                    <input
                      type="email"
                      className="border p-1 rounded"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </td>

                {/* Subscription Toggle */}
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {editingUserId === user.id ? (
                    <select
                      className="border p-1 rounded"
                      value={editData.isSubscribed ? "yes" : "no"}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          isSubscribed: e.target.value === "yes",
                        })
                      }
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  ) : user.isSubscribed ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>

                {/* Customer ID */}
                <td className="border border-gray-300 px-4 py-2">
                  {user.customerId}
                </td>

                {/* Price ID */}
                <td className="border border-gray-300 px-4 py-2">
                  {user.priceId}
                </td>

                {/* Actions */}
                <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                  {editingUserId === user.id ? (
                    <button
                      className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
                      onClick={() => editUser(user.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
                      onClick={() => startEditing(user)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
