import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import loginBg from "../assets/login-bg.png";
import { FaClipboardList, FaPlayCircle } from "react-icons/fa";
import { filterAssessments } from "../services/AssessmentService";

export default function AssessmentList() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const category = state?.category;
  const difficulty = state?.difficulty;

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const data = await filterAssessments(category, difficulty);
      setAssessments(data);
    } catch (error) {
      console.error(error);
      setAssessments([]);
    } finally {
      setLoading(false);
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

          <div className="bg-white rounded-[30px] shadow-md border border-gray-100 p-8">

            <div className="flex items-center gap-5 mb-8">

              <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center">
                <FaClipboardList className="text-[#4F6EF7] text-3xl" />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-slate-900">
                  Available Assessments
                </h1>

                <p className="text-gray-500 mt-2 text-lg">
                  {category} • {difficulty}
                </p>
              </div>

            </div>

            {loading ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold">
                  Loading Assessments...
                </h3>
              </div>
            ) : assessments.length === 0 ? (
              <div className="text-center py-12">

                <h3 className="text-2xl font-semibold text-gray-700">
                  No Assessments Found
                </h3>

                <p className="text-gray-500 mt-2">
                  No assessments are available for the selected category and difficulty.
                </p>

                <button
                  onClick={() => navigate("/assessment")}
                  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
                >
                  Back
                </button>

              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">

                {assessments.map((assessment) => (

                  <div
                    key={assessment.id}
                    className="border rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
                  >

                    <h2 className="text-2xl font-bold text-blue-600 mb-4">
                      {assessment.name}
                    </h2>

                    <p className="mb-2">
                      <strong>Category:</strong> {assessment.category}
                    </p>

                    <p className="mb-2">
                      <strong>Difficulty:</strong> {assessment.difficulty}
                    </p>

                    <p className="mb-2">
                      <strong>Duration:</strong> {assessment.duration} Minutes
                    </p>

                    <p className="mb-6">
                      <strong>Total Questions:</strong> 25
                    </p>

                    <button
                      onClick={() =>
  navigate(`/assessment-exam/${assessment.id}`, {
    state: {
      assessment,
    },
  })
}
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <FaPlayCircle />
                      Start Assessment
                    </button>

                  </div>

                ))}

              </div>
            )}

          </div>

        </div>
      </div>
    </MainLayout>
  );
}