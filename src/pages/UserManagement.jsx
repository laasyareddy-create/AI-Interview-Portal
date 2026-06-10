import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    setUsers(storedUsers);
  }, []);

  const deleteUser = (id) => {
    const updatedUsers =
      users.filter(
        (user) => user.id !== id
      );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setUsers(updatedUsers);
  };

  const changeRole = (
    id,
    newRole
  ) => {
    const updatedUsers =
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              role: newRole,
            }
          : user
      );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setUsers(updatedUsers);
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

        <div className="flex justify-between items-start mb-8">

          <div>

            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              User Management
            </h1>

            <p className="text-gray-500 text-lg">
              Manage registered users and roles.
            </p>

          </div>

        
        </div>

        {/* Table Card */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

          {/* Table Header */}

          <div className="grid grid-cols-3 pb-5 border-b text-gray-500 font-semibold">
  <div>Name</div>
  <div>Role</div>
  <div>Actions</div>
</div>

          {/* Users */}

          {users.map((user) => (

            <div
              key={user.id}
              className="grid grid-cols-3 items-center py-7 border-b border-gray-100 last:border-0"
            >

              {/* User */}

              <div className="flex items-center gap-4">

                <div
  className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl ${
    [
      "bg-blue-50 text-blue-600",
      "bg-green-50 text-green-600",
      "bg-purple-50 text-purple-600",
      "bg-orange-50 text-orange-600",
      "bg-pink-50 text-pink-600",
      "bg-indigo-50 text-indigo-600",
    ][
      user.name?.charCodeAt(0) % 6
    ]
  }`}
>
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div>

                  <h3 className="font-bold text-2xl">
                    {user.name}
                  </h3>

                  <p className="text-gray-500">
                    {user.email}
                  </p>

                </div>

              </div>

              {/* Email Column */}

             

              {/* Role */}

              <div>

                <select
                  value={user.role}
                  onChange={(e) =>
                    changeRole(
                      user.id,
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-xl px-4 py-3 min-w-[180px] bg-white"
                >
                  <option value="trainer">
                    Trainer
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                  <option value="student">
                    Student
                  </option>

                </select>

              </div>

              {/* Actions */}

              <div>


                <button
                  onClick={() =>
                    deleteUser(user.id)
                  }
                  className="border border-red-400 text-red-500 px-5 py-3 rounded-xl font-medium hover:bg-red-50"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  </MainLayout>
);
}

export default UserManagement;