import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";
import { toast } from "react-toastify";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../services/UserService";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers();

      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (user, newRole) => {
    const oldRole = user.role?.toLowerCase();

    if (oldRole === newRole) {
      return;
    }

    const confirmed = window.confirm(
      `Change ${user.name}'s role from ${oldRole} to ${newRole}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(`role-${user.id}`);

      const updatedUser = await updateUserRole(
        user.id,
        newRole
      );

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser.id === user.id
            ? updatedUser
            : currentUser
        )
      );

      toast.success(
        `${user.name}'s role changed to ${newRole}.`
      );
    } catch (error) {
      console.error(
        "Failed to update user role:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to update user role."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(`delete-${user.id}`);

      await deleteUser(user.id);

      setUsers((currentUsers) =>
        currentUsers.filter(
          (currentUser) =>
            currentUser.id !== user.id
        )
      );

      toast.success(
        `${user.name} deleted successfully.`
      );
    } catch (error) {
      console.error(
        "Failed to delete user:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to delete user."
      );
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <MainLayout>
      <div
        className="min-h-screen -m-8 p-8 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginBg})`,
        }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              User Management
            </h1>

            <p className="text-gray-500 text-lg">
              Manage registered users and roles.
            </p>
          </div>

          {/* Table Card */}

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            {loading ? (

              <div className="text-center py-12 text-gray-500">
                Loading users...
              </div>

            ) : users.length === 0 ? (

              <div className="text-center py-12 text-gray-500">
                No users found.
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>
                    <tr className="border-b text-gray-500">

                      <th className="text-left p-4">
                        User
                      </th>

                      <th className="text-left p-4">
                        Role
                      </th>

                      <th className="text-left p-4">
                        Actions
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {users.map((user) => {

                      const role =
                        user.role?.toLowerCase();

                      const roleColors = {
                        student:
                          "bg-blue-50 text-blue-600",
                        trainer:
                          "bg-green-50 text-green-600",
                        admin:
                          "bg-purple-50 text-purple-600",
                      };

                      return (
                        <tr
                          key={user.id}
                          className="border-b border-gray-100 last:border-0"
                        >

                          {/* User */}

                          <td className="p-4">

                            <div className="flex items-center gap-4">

                              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
                                {user.name
                                  ?.charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>

                                <p className="font-bold text-lg text-slate-900">
                                  {user.name}
                                </p>

                                <p className="text-gray-500">
                                  {user.email}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* Role */}

                          <td className="p-4">

                            <select
                              value={role}
                              disabled={
                                actionLoading ===
                                `role-${user.id}`
                              }
                              onChange={(e) =>
                                handleChangeRole(
                                  user,
                                  e.target.value
                                )
                              }
                              className={`border border-gray-300 rounded-xl px-4 py-3 bg-white font-medium ${roleColors[role] || ""}`}
                            >

                              <option value="student">
                                Student
                              </option>

                              <option value="trainer">
                                Trainer
                              </option>

                              <option value="admin">
                                Admin
                              </option>

                            </select>

                          </td>

                          

                          {/* Delete */}

                          <td className="p-4">

                            <button
                              type="button"
                              disabled={
                                actionLoading ===
                                `delete-${user.id}`
                              }
                              onClick={() =>
                                handleDeleteUser(user)
                              }
                              className="border border-red-400 text-red-500 px-5 py-3 rounded-xl font-medium hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading ===
                              `delete-${user.id}`
                                ? "Deleting..."
                                : "Delete"}
                            </button>

                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>
            )}

          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default UserManagement;