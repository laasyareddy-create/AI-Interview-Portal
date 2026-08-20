import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  createAssessment,
  getAssessmentById,
  updateAssessment,
} from "../services/AssessmentService";
import { toast } from "react-toastify";
import loginBg from "../assets/login-bg.png";

const CreateAssessment = () => {
  const navigate = useNavigate();
  const { assessmentId } = useParams();

  const isEditMode = Boolean(assessmentId);

  const [loading, setLoading] = useState(false);
  const [loadingAssessment, setLoadingAssessment] = useState(
    isEditMode
  );

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    difficulty: "",
    duration: "",
  });

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const loadAssessment = async () => {
      try {
        const data = await getAssessmentById(assessmentId);

        setFormData({
          name: data.name || "",
          category: data.category || "",
          difficulty: data.difficulty || "",
          duration: data.duration || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load assessment");
        navigate("/assessment-management");
      } finally {
        setLoadingAssessment(false);
      }
    };

    loadAssessment();
  }, [assessmentId, isEditMode, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.difficulty ||
      !formData.duration
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const assessmentData = {
        name: formData.name,
        category: formData.category,
        difficulty: formData.difficulty,
        duration: Number(formData.duration),
      };

      if (isEditMode) {
        await updateAssessment(
          assessmentId,
          assessmentData
        );

        toast.success(
          "Assessment updated successfully"
        );

        navigate("/assessment-management");
      } else {
        const assessment =
          await createAssessment(assessmentData);

        toast.success(
          "Assessment created successfully"
        );

        navigate(
          `/assessment-management/${assessment.id}/questions`
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        (
          isEditMode
            ? "Failed to update assessment"
            : "Failed to create assessment"
        )
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingAssessment) {
    return (
      <MainLayout>
        <div
          className="min-h-screen -m-8 p-8 bg-cover bg-center"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        >
          <div className="max-w-3xl mx-auto bg-white rounded-[28px] shadow-lg border border-gray-100 p-10 text-center">
            <p className="text-gray-500">
              Loading assessment...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div
        className="min-h-screen -m-8 p-8 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginBg})`,
        }}
      >

        <div className="max-w-5xl mx-auto">

          {/* Main Card */}

          <div className="bg-white rounded-[28px] shadow-lg border border-gray-100 p-10">

            {/* Header */}

            <div className="mb-9">

              <h1 className="text-4xl font-bold text-slate-900">
                {isEditMode
                  ? "Edit Assessment"
                  : "Create Assessment"}
              </h1>

              <p className="text-gray-500 text-lg mt-3">
                {isEditMode
                  ? "Update the assessment details."
                  : "Create a new assessment before adding questions."}
              </p>

            </div>

            {/* Divider */}

            <div className="border-t border-gray-200 mb-8" />

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

              {/* Assessment Name */}

              <div>

                <label className="block text-base font-semibold text-gray-900 mb-3">
                  Assessment Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Java Interview"
                  className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

              </div>

              {/* Category */}

              <div>

                <label className="block text-base font-semibold text-gray-900 mb-3">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="Java">
                    Java
                  </option>

                  <option value="React">
                    React
                  </option>

                  <option value="JavaScript">
                    JavaScript
                  </option>

                  <option value="SQL">
                    SQL
                  </option>

                  <option value="Aptitude">
                    Aptitude
                  </option>

                </select>

              </div>

              {/* Difficulty */}

              <div>

                <label className="block text-base font-semibold text-gray-900 mb-3">
                  Difficulty
                </label>

                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 bg-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >

                  <option value="">
                    Select Difficulty
                  </option>

                  <option value="Easy">
                    Easy
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Hard">
                    Hard
                  </option>

                </select>

              </div>

              {/* Duration */}

              <div>

                <label className="block text-base font-semibold text-gray-900 mb-3">
                  Duration (Minutes)
                </label>

                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="30"
                  className="w-full h-14 border border-gray-300 rounded-xl px-4 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

              </div>

              {/* Bottom Divider */}

              <div className="border-t border-gray-200 pt-6 mt-2" />

              {/* Buttons */}

              <div className="flex justify-end gap-4">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/assessment-management")
                  }
                  className="px-7 py-3.5 rounded-xl border border-gray-500 bg-white text-gray-900 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Creating..."
                    : isEditMode
                    ? "Update Assessment"
                    : "Create Assessment"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default CreateAssessment;