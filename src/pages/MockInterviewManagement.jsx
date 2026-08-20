import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiClock,
  FiMessageSquare,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import {
  getAllMockInterviews,
  deleteMockInterview,
} from "../services/MockInterviewService";
import loginBg from "../assets/login-bg.png";

const MockInterviewManagement = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInterviews = async () => {
    try {
      setLoading(true);

      const response = await getAllMockInterviews();

      setInterviews(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load mock interviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mock interview?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMockInterview(id);

      toast.success("Mock Interview deleted successfully");

      loadInterviews();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete interview"
      );
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
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">

            <div>
              <h1 className="text-3xl font-bold text-gray-950">
                Mock Interview Management
              </h1>

              <p className="text-gray-500 mt-2">
                Create and manage mock interviews.
              </p>
            </div>

            <button
              onClick={() => navigate("/create-mock-interview")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
            >
              + Create Interview
            </button>

          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-xl">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="p-4 text-left font-semibold text-gray-900">
                    Interview Name
                  </th>

                  <th className="p-4 text-left font-semibold text-gray-900">
                    Category
                  </th>

                  <th className="p-4 text-center font-semibold text-gray-900">
                    Duration
                  </th>

                  <th className="p-4 text-center font-semibold text-gray-900">
                    Questions
                  </th>

                  <th className="p-4 text-center font-semibold text-gray-900">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10"
                    >
                      Loading...
                    </td>
                  </tr>

                ) : interviews.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500"
                    >
                      No mock interviews created yet.
                    </td>

                  </tr>

                ) : (

                  interviews.map((interview) => (

                    <tr
                      key={interview.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >

                      <td className="p-4 text-gray-900">
                        {interview.name}
                      </td>

                      <td className="p-4 text-gray-900">
                        {interview.category}
                      </td>

                      <td className="p-4">

                        <div className="flex items-center justify-center gap-2 text-gray-900">

                          <FiClock
                            size={18}
                            className="text-gray-700"
                          />

                          <span>
                            {interview.duration} mins
                          </span>

                        </div>

                      </td>

                      <td className="p-4 text-center text-gray-900">
                        {interview.totalQuestions}
                      </td>

                      <td className="p-4">

                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() =>
                              navigate(
                                `/mock-interview-management/${interview.id}/questions`
                              )
                            }
                            className="flex items-center gap-2 border border-blue-300 text-blue-600 bg-white hover:bg-blue-50 px-4 py-2 rounded-lg transition"
                          >
                            <FiMessageSquare size={17} />
                            Questions
                          </button>

                          <button
                            onClick={() =>
                              navigate(
                                `/create-mock-interview?id=${interview.id}`
                              )
                            }
                            className="flex items-center gap-2 border border-yellow-300 text-yellow-600 bg-white hover:bg-yellow-50 px-4 py-2 rounded-lg transition"
                          >
                            <FiEdit2 size={17} />
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(interview.id)
                            }
                            className="flex items-center gap-2 border border-red-300 text-red-600 bg-white hover:bg-red-50 px-4 py-2 rounded-lg transition"
                          >
                            <FiTrash2 size={17} />
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default MockInterviewManagement;