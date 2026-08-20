import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";
import {
  FaClipboardList,
  FaEdit,
  FaTrash,
  FaList,
  FaPlus,
} from "react-icons/fa";
import {
  getAllAssessments,
  deleteAssessment,
} from "../services/AssessmentService";
import { toast } from "react-toastify";

function AssessmentManagement() {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAssessments = async () => {
    try {
      setLoading(true);

      const data = await getAllAssessments();
      setAssessments(data);
    } catch (error) {
      console.error("Failed to load assessments:", error);
      toast.error("Failed to load assessments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssessments();
  }, []);

  const handleDelete = async (assessment) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${assessment.name}"?\n\nIts questions will also be deleted.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAssessment(assessment.id);

      setAssessments((current) =>
        current.filter(
          (item) => item.id !== assessment.id
        )
      );

      toast.success("Assessment deleted successfully");
    } catch (error) {
      console.error("Failed to delete assessment:", error);
      toast.error(
        error.response?.data?.message ||
        "Failed to delete assessment"
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
        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Assessment Management
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Create, manage, edit and delete assessments.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/create-assessment")
              }
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              <FaPlus />
              Create Assessment
            </button>

          </div>

          {/* Loading */}

          {loading ? (

            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">
                Loading assessments...
              </p>
            </div>

          ) : assessments.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-50 flex items-center justify-center mb-5">
                <FaClipboardList className="text-indigo-600 text-3xl" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                No Assessments Found
              </h2>

              <p className="text-gray-500 mt-2 mb-6">
                Create your first assessment to get started.
              </p>

              <button
                onClick={() =>
                  navigate("/create-assessment")
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold"
              >
                <FaPlus />
                Create Assessment
              </button>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {assessments.map((assessment) => (

                <div
                  key={assessment.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-lg p-7"
                >

                  <div className="flex items-start justify-between gap-4 mb-6">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <FaClipboardList className="text-indigo-600 text-xl" />
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                          {assessment.name}
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                          Assessment ID: {assessment.id}
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">

                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-gray-500 text-sm">
                        Category
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        {assessment.category}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-gray-500 text-sm">
                        Difficulty
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        {assessment.difficulty}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-gray-500 text-sm">
                        Duration
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        {assessment.duration} minutes
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-gray-500 text-sm">
                        Questions
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        {assessment.questionCount ?? 0}
                      </p>
                    </div>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={() =>
                        navigate(
                          `/assessment-management/${assessment.id}/questions`
                        )
                      }
                      className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    >
                      <FaList />
                      Manage Questions
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/assessment-management/edit/${assessment.id}`
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-50"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(assessment)
                      }
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-300 text-red-500 font-semibold hover:bg-red-50"
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </div>
    </MainLayout>
  );
}

export default AssessmentManagement;