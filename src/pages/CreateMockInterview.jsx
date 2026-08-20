import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiClock, FiChevronDown } from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import {
  createMockInterview,
  getMockInterviewById,
  updateMockInterview,
} from "../services/MockInterviewService";
import loginBg from "../assets/login-bg.png";

const CreateMockInterview = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const interviewId = searchParams.get("id");

  const isEdit = !!interviewId;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
  });

  useEffect(() => {
    if (isEdit) {
      loadInterview();
    }
  }, []);

  const loadInterview = async () => {
    try {
      setLoading(true);

      const response = await getMockInterviewById(interviewId);

      setFormData({
        name: response.data.name,
        category: response.data.category,
        duration: response.data.duration,
      });
    } catch (error) {
      console.error(error);

      toast.error("Unable to load interview");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category ||
      !formData.duration
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await updateMockInterview(interviewId, {
          ...formData,
          duration: Number(formData.duration),
        });

        toast.success("Interview updated successfully");

        navigate("/mock-interview-management");
      } else {
        const response = await createMockInterview({
          ...formData,
          duration: Number(formData.duration),
        });

        toast.success("Interview created successfully");

        navigate(
          `/mock-interview-management/${response.data.id}/questions`
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Operation failed"
      );
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
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 px-12 py-12">

          {/* Header */}

          <div className="pb-7 border-b border-gray-200">

            <h1 className="text-4xl font-bold text-slate-900">
              {isEdit
                ? "Edit Mock Interview"
                : "Create Mock Interview"}
            </h1>

            <p className="text-gray-500 text-lg mt-3">
              Add the details to create a new mock interview.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="pt-9"
          >

            {/* Interview Name */}

            <div className="mb-8">

              <label className="block text-lg font-medium text-gray-900 mb-3">
                Interview Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter interview name"
                className="w-full h-[68px] border border-indigo-200 rounded-xl px-4 text-lg text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition"
              />

            </div>

            {/* Category */}

            <div className="mb-8">

              <label className="block text-lg font-medium text-gray-900 mb-3">
                Category
              </label>

              <div className="relative">

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="appearance-none w-full h-[68px] border border-indigo-200 rounded-xl px-4 pr-12 text-lg text-gray-700 bg-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="React.js">
                    React.js
                  </option>

                  <option value="Node.js">
                    Node.js
                  </option>

                  <option value="JavaScript">
                    JavaScript
                  </option>

                  <option value="Aptitude">
                    Aptitude
                  </option>

                  <option value="HR Interview">
                    HR Interview
                  </option>

                  <option value="Communication Skills">
                    Communication Skills
                  </option>
                </select>

                <FiChevronDown
                  size={20}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                />

              </div>

            </div>

            {/* Duration */}

            <div className="mb-10">

              <label className="block text-lg font-medium text-gray-900 mb-3">
                Duration
              </label>

              <div className="flex w-full h-[68px] border border-indigo-200 rounded-xl overflow-hidden focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-200 transition">

                <div className="w-14 flex items-center justify-center border-r border-indigo-200 bg-white">
                  <FiClock
                    size={22}
                    className="text-slate-600"
                  />
                </div>

                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Enter duration"
                  className="flex-1 min-w-0 px-4 text-lg text-gray-700 placeholder-gray-400 outline-none"
                />

                <div className="w-20 flex items-center justify-center border-l border-indigo-200 text-gray-700 text-lg">
                  mins
                </div>

              </div>

            </div>

            {/* Bottom Divider */}

            <div className="border-t border-gray-200 pt-7">

              <div className="flex justify-end gap-5">

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="h-[60px] px-8 border border-slate-700 rounded-xl bg-white text-gray-900 text-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-[60px] px-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Saving..."
                    : isEdit
                    ? "Update Interview"
                    : "Create Interview"}
                </button>

              </div>

            </div>

          </form>

        </div>
      </div>
    </MainLayout>
  );
};

export default CreateMockInterview;